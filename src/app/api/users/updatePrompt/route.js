import { NextResponse } from 'next/server';
import User from '../../../../model/User';
import connectToDatabase from '../../../../lib/db';
import { verifyToken } from '../../../../lib/verifyToken';

export async function PATCH(req) {
  const auth = await verifyToken(req);
  if (!auth.valid) {
    return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const { language, prompt } = await req.json();

    if (!['spanish', 'english', 'portuguese', 'french'].includes(language)) {
      return NextResponse.json({ error: 'Invalid language' }, { status: 400 });
    }

    const updatedUser = await User.findByIdAndUpdate(
      auth.userId,
      { $set: { [`customPrompts.${language}`]: prompt } },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: `Custom ${language} prompt updated successfully!`,
      customPrompts: updatedUser.customPrompts,
    });
  } catch (error) {
    console.error('Error updating custom prompt:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
