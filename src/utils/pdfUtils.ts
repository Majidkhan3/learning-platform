import * as pdfjs from 'pdfjs-dist';

// Set the worker source
// The version ${pdfjs.version} (which appears to be 4.8.69 from your logs)
// might not be available on the CDN at '/build/pdf.worker.min.js', causing a 404 error.
// Using a known stable version from the CDN.
// The latest stable version on jsDelivr for pdfjs-dist is currently 4.2.67 (as of May 2024).
const pdfjsStableVersion = '4.2.67'; 
const pdfWorkerSrc = `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsStableVersion}/build/pdf.worker.min.js`;
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;

/**
 * Extract text content from a PDF file
 */
export const extractTextFromPdf = async (file: File): Promise<string> => {
  try {
    // Convert file to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    
    // Load the PDF document
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    
    // Get total number of pages
    const numPages = pdf.numPages;
    
    // Extract text from each page
    let fullText = '';
    
    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      
      fullText += pageText + '\n\n';
    }
    
    return fullText.trim();
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF');
  }
};