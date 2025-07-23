import User from '../../../../model/User';
import { hash } from 'bcrypt';
import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/db';

// ✅ PUT - Update user (supports customPrompts by language)
export async function PUT(req, { params }) {
  try {
    await connectToDatabase();
    const { id } = params;
    const body = await req.json();
    const { email, password, languages, pseudo, prompt, language } = body;

    const updateData = {};

    if (email) updateData.email = email;
    if (languages) updateData.languages = languages;
    if (pseudo) updateData.pseudo = pseudo;

    // ✅ Update the correct custom prompt key
    if (prompt !== undefined && language) {
      updateData[`customPrompts.${language}`] = prompt;
    }

    if (password) {
      updateData.password = await hash(password, 12);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    }).select('-password');

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}


// ✅ GET - Fetch user, return language-specific prompt if requested
export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    const { id } = params;
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get('lang'); // e.g., ?lang=english

    const user = await User.findById(id).select('-password');
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    if (lang) {
      return NextResponse.json(
        { prompt: user.customPrompts?.[lang] || '' },
        { status: 200 }
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}

// ✅ DELETE - Remove user
export async function DELETE(req, { params }) {
  try {
    await connectToDatabase();
    const { id } = params;

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'User deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
