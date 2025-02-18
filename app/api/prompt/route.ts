import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({}).populate('creator');
    return NextResponse.json(prompts, { status: 200 });
  } catch (error) {
    console.error('Error fetching prompts:', error);
    return new Response('Failed to get prompts', { status: 500 });
  }
};
