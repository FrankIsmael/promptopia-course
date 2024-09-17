import { connectToDB } from '@utils/database';
import { NextApiRequest } from 'next';
import Prompt from '@models/prompt';
import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate('creator');

    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (error) {
    return new Response('Failed to get prompts', {
      status: 500,
    });
  }
};
