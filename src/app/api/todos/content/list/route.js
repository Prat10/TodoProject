import mongoose from "mongoose";
import { NextResponse } from "next/server";// Ensure correct model path
import { TodoData } from "@/lib/models/todoSchema";
import { connectDB } from "@/lib/db";

export async function GET(req) {
  try {
    // connection To MongoDB
    await connectDB();

    // Get query parameters (page, limit)
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "5", 10);
    const skip = (page - 1) * limit;
    console.log(page,limit,skip);
    // Fetch paginated data
    const contents = await TodoData.find().skip(skip).limit(limit);
    
    // Map content to required format
    const contentList = contents.map((item) => ({
      id: item._id,
      title: item.title,
      description: item.description || "No description available",
      time: item.time,
    }));
 
    
    return NextResponse.json(contentList, { status: 200 });
  } catch (error) {
    console.error("Error fetching content:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
