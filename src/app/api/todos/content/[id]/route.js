// app/api/content/[id]/delete.js
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { TodoData } from "@/lib/models/todoSchema";

export async function DELETE(request, { params }) {
  try {
    // connection To MongoDB
    await connectDB();
    const { id } = await params;
    console.log(id)
    // Validate id (optional but recommended)
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }
    const deletedContent = await TodoData.findByIdAndDelete(id);
    if (!deletedContent) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Content deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting content:", error);
    return NextResponse.json(
      { error: "Failed to delete content" },
      { status: 500 }
    );
  }
}
