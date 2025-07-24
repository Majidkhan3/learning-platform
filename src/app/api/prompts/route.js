// import { NextResponse } from 'next/server'
// import connectToDatabase from '@/lib/db'
// import Prompt from '@/model/Prompt'

// // GET endpoint to fetch prompts
// export async function GET(req) {
//   await connectToDatabase()
//   const { searchParams } = new URL(req.url)
//   const userId = searchParams.get('userId')

//   if (!userId) {
//     return NextResponse.json({ error: 'userId is required' }, { status: 400 })
//   }

//   try {
//     const prompts = await Prompt.find({ userId })
//     return NextResponse.json({ prompts }, { status: 200 })
//   } catch (error) {
//     console.error('Error fetching prompts:', error)
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
//   }
// }

// // POST endpoint to create a new prompt
// export async function POST(req) {
//   await connectToDatabase()

//   try {
//     const { userId, name, promptText, isActive = false } = await req.json()

//     // Validate required fields
//     if (!userId || !name || !promptText) {
//       return NextResponse.json({ error: 'userId, name, and promptText are required' }, { status: 400 })
//     }

//     // If this prompt is set as active, deactivate all other prompts for this user
//     if (isActive) {
//       await Prompt.updateMany({ userId, isActive: true }, { $set: { isActive: false } })
//     }

//     // Create new prompt
//     const newPrompt = new Prompt({
//       userId,
//       name,
//       promptText,
//       isActive,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     })

//     await newPrompt.save()

//     return NextResponse.json({ message: 'Prompt created successfully', prompt: newPrompt }, { status: 201 })
//   } catch (error) {
//     console.error('Error creating prompt:', error)
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
//   }
// }

// // PUT endpoint to update a prompt
// export async function PUT(req) {
//   await connectToDatabase()

//   try {
//     const { promptId, name, promptText, isActive } = await req.json()

//     if (!promptId) {
//       return NextResponse.json({ error: 'promptId is required' }, { status: 400 })
//     }

//     const prompt = await Prompt.findById(promptId)
//     if (!prompt) {
//       return NextResponse.json({ error: 'Prompt not found' }, { status: 404 })
//     }

//     // If setting this prompt as active, deactivate others
//     if (isActive) {
//       await Prompt.updateMany({ userId: prompt.userId, isActive: true }, { $set: { isActive: false } })
//     }

//     // Update prompt
//     prompt.name = name || prompt.name
//     prompt.promptText = promptText || prompt.promptText
//     prompt.isActive = isActive ?? prompt.isActive
//     prompt.updatedAt = new Date()

//     await prompt.save()

//     return NextResponse.json({ message: 'Prompt updated successfully', prompt }, { status: 200 })
//   } catch (error) {
//     console.error('Error updating prompt:', error)
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
//   }
// }

// // DELETE endpoint to remove a prompt
// export async function DELETE(req) {
//   await connectToDatabase()
//   const { searchParams } = new URL(req.url)
//   const promptId = searchParams.get('promptId')

//   if (!promptId) {
//     return NextResponse.json({ error: 'promptId is required' }, { status: 400 })
//   }

//   try {
//     const prompt = await Prompt.findByIdAndDelete(promptId)
//     if (!prompt) {
//       return NextResponse.json({ error: 'Prompt not found' }, { status: 404 })
//     }

//     return NextResponse.json({ message: 'Prompt deleted successfully' }, { status: 200 })
//   } catch (error) {
//     console.error('Error deleting prompt:', error)
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
//   }
// }
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/model/User';
import { verifyToken } from '@/lib/verifyToken';

// ✅ GET: Fetch user's prompt
export async function GET(req) {
  const auth = await verifyToken(req);
  if (!auth.valid) {
    return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectToDatabase();

    const user = await User.findById(auth.userId).select('prompt');
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(
      { success: true, prompt: user.prompt || '' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching prompt:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ✅ POST: Create or Update user's prompt (idempotent)
export async function POST(req) {
  const auth = await verifyToken(req);
  if (!auth.valid) {
    return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectToDatabase();

    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt text is required' }, { status: 400 });
    }

    const updatedUser = await User.findByIdAndUpdate(
      auth.userId,
      { prompt },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(
      { success: true, message: 'Prompt saved successfully', prompt: updatedUser.prompt },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error saving prompt:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
