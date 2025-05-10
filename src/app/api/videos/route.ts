import { NextRequest, NextResponse } from 'next/server';
import ytdl from '@distube/ytdl-core';
import { YoutubeTranscript } from 'youtube-transcript';
import fsSync, { promises as fs } from 'fs';
import path from 'path';
import url from 'url';
import ffmpeg from 'fluent-ffmpeg';

const videoDir = 'videos';

// Make sure the video directory exists
if (!fsSync.existsSync(videoDir)) {
  fsSync.mkdirSync(videoDir);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Parse the request body
    const { videoId, videoUrl, chunks } = body as { videoId: string; videoUrl: string; chunks: { start: number; duration: number }[] };

    if (typeof videoId !== 'string' && typeof videoUrl !== 'string') {
      return NextResponse.json({ error: 'Either video ID or video URL must be provided' }, { status: 400 });
    }

    const { videoFilename, transcriptFilename } = await videoDownload({ videoId, videoUrl });

    const videoSplitFiles = await Promise.all(
      chunks.map(async ({ start, duration }) => videoSplitter(videoFilename, Number(start), Number(duration)))
    );

    return NextResponse.json({
      videoFilename,
      transcriptFilename,
      videoSplitFiles,
      message: 'Files downloaded successfully',
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'An error occurred while downloading the video and transcript.' }, { status: 500 });
  }
}

async function videoDownload(opts: { videoId: string; videoUrl?: string }): Promise<{ videoFilename: string; transcriptFilename: string }> {
    const { videoId, videoUrl } = opts;
    return new Promise((resolve, reject) => {
      let finalVideoId = videoId;
      if (videoUrl) {
        const parsedUrl = url.parse(videoUrl.toString(), true);
        const queryParameters = parsedUrl.query;
        finalVideoId = queryParameters['v'] as string;
      }
  
      if (!finalVideoId) {
        reject('Invalid video ID or URL');
        return;
      }
  
      const fileId = finalVideoId.toString();
      const videoFilename = path.join(videoDir, fileId + '.mp4');
      const transcriptFilename = path.join(videoDir, fileId + '.json');
  
      const videoStream = ytdl(`https://www.youtube.com/watch?v=${videoId}`, {
        requestOptions: {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          },
        },
      });
  
      videoStream.on('error', (err) => {
        console.error('Error downloading video:', err);
        reject(err);
      });
  
      videoStream.pipe(fsSync.createWriteStream(videoFilename)).on('close', async () => {
        const transcripts = await YoutubeTranscript.fetchTranscript(finalVideoId.toString());
        await fs.writeFile(transcriptFilename, JSON.stringify(transcripts));
  
        resolve({
          videoFilename,
          transcriptFilename,
        });
      });
    });
  }

async function videoSplitter(filename: string, start: number, duration: number): Promise<string> {
  const outputFilename = `${filename}-${start}-${duration}.mp4`;
  return new Promise((resolve, reject) => {
    ffmpeg(filename)
      .setStartTime(start)
      .setDuration(duration)
      .outputOptions('-c copy')
      .on('end', () => {
        resolve(outputFilename);
      })
      .on('error', (err) => {
        console.log('Error while splitting', err);
        reject(err);
      })
      .save(outputFilename);
  });
}