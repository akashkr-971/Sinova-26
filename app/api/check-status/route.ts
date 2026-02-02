import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const isSuccess = true; // Simulated database success

    if (isSuccess) {
      return NextResponse.json(
        { message: "Data received by SINOVA server" }, 
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: "Submission failed" }, 
      { status: 400 }
    );

  } catch (error) {
    console.error("Route Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}