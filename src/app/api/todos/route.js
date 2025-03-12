import { connectDB } from "@/lib/db";
import { TodoData } from "@/lib/models/todoSchema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
        // connection To MongoDB
        await connectDB();

    const data =await TodoData.find();
    console.log(data);
    
    return NextResponse.json({result:data});
}

export async function DELETE(request) {
    await mongoose.connect(connectionURL+"");
    const id = request.params;
    await TodoData.findByIdAndDelete(id);
    return NextResponse.json(
        {
            success: true,
            message: "record deleted"
        },
        {
            status: 200
        }
    )
}