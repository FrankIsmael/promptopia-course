import { connectToDB } from '@utils/database';
import { NextApiRequest, NextApiResponse } from 'next';
import Prompt from '@models/prompt';

export const GET = async (req: any, { params }: { params: { id: string } }) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({
      creator: params.id,
    }).populate('creator');

    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (error) {
    return new Response('Failed to get prompts', {
      status: 500,
    });
  }
};
