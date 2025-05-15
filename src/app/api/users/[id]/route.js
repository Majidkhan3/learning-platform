import User from '../../../../model/User'
import { hash } from 'bcrypt'
import { NextResponse } from 'next/server'
import connectToDatabase from '../../../../lib/db'
// PUT - Update user
export async function PUT(req, { params }) {
  try {
    await connectToDatabase()
    const { id } = params
    const body = await req.json()
    const { email, password,languages } = body

    const updateData = { email, languages  }

    // Only hash and update password if provided
    if (password) {
      updateData.password = await hash(password, 12)
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    }).select('-password')

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(updatedUser, { status: 200 })
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 },
    )
  }
}

// DELETE - Remove user
export async function DELETE(req, { params }) {
  try {
    await connectToDatabase()
    const { id } = params

    const deletedUser = await User.findByIdAndDelete(id)

    if (!deletedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 },
    )
  }
}
