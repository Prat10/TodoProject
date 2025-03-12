// app/api/content/route.js
import { NextResponse } from 'next/server';
import { TodoData } from '@/lib/models/todoSchema';
import { connectDB } from '@/lib/db';
import mongoose from 'mongoose';


// adding new Todo and Update todo with same Api
export async function POST(request) {
  try {
    const { title, description, operation, id } = await request.json();
    if (!title || !description) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }
    // connection To MongoDB
    await connectDB();

    let savedContent;
    if (operation === 'new') {
      savedContent = await new TodoData({ title, description, time: Date.now() }).save();
    } else if (operation === 'update' && id) {
      savedContent = await TodoData.findByIdAndUpdate(id, { title, description, time: Date.now() }, { new: true });
    } else {
      return NextResponse.json({ error: 'Invalid operation or missing ID' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Content saved successfully', id: savedContent._id }, { status: 201 });
  } catch (error) {
    console.error('Error saving content:', error);
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
}
