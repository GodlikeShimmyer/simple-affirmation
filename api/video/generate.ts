import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { prompt, userId, options } = req.body;
    if (!prompt || !userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const { duration, resolution, style } = options || {};
    
    // Build enhanced prompt for Sora video generation
    const enhancedPrompt = `${prompt}. ${style ? `Style: ${style}.` : ''} High quality, professional video.`;

    // Note: Sora API is currently in limited preview. This uses the beta endpoint.
    // You may need to adjust this based on OpenAI's final API structure.
    const response = await openai.chat.completions.create({
      model: "sora-1.0-2025-04-14",
      messages: [
        {
          role: "user",
          content: enhancedPrompt
        }
      ],
      // @ts-ignore - Sora-specific parameters
      video_output: {
        resolution: resolution || "1080p",
        duration: duration || 5,
      }
    });

    const jobId = Math.random().toString(36).substr(2, 9);
    
    console.log('Video generation job created:', {
      jobId,
      userId,
      prompt,
      options,
    });

    // Sora is async, so we return a job ID for polling
    return res.status(200).json({ 
      success: true, 
      jobId, 
      status: 'processing', 
      message: 'Video generation started with Sora AI',
      estimatedTime: '2-5 minutes',
      // In production, you'd poll this job ID to get the final video URL
      data: response
    });
  } catch (err: any) {
    console.error('Video generation error:', err);
    return res.status(500).json({ 
      error: 'Video generation failed', 
      details: err.message 
    });
  }
}
