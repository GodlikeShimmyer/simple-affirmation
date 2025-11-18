import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { title, prompt, template, userId, options } = req.body;
    if (!title || !prompt || !userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const { dimensions, format, fontSize } = options || {};
    
    // Build enhanced prompt for thumbnail with title
    const enhancedPrompt = `Create a ${template || 'modern'} YouTube thumbnail. Title text: "${title}". ${prompt}. Bold, eye-catching design with large ${fontSize || 'large'} text. Professional, high-quality thumbnail optimized for clicks.`;

    // Determine size based on dimensions
    let size: '1024x1024' | '1792x1024' | '1024x1792' = '1792x1024'; // Default to 16:9
    if (dimensions === '1080x1080') {
      size = '1024x1024';
    } else if (dimensions === '1200x628') {
      size = '1792x1024';
    }

    const response = await openai.images.generate({
      model: "gpt-image-1",
      prompt: enhancedPrompt,
      n: 1,
      size: size,
      quality: 'high',
      output_format: format === 'png' ? 'png' : 'jpeg',
    });

    const imageUrl = response.data[0]?.url;
    const imageB64 = response.data[0]?.b64_json;

    const jobId = Math.random().toString(36).substr(2, 9);
    
    console.log('Thumbnail generated:', {
      jobId,
      userId,
      title,
      template,
    });

    return res.status(200).json({ 
      success: true, 
      jobId, 
      status: 'completed',
      imageUrl: imageUrl || `data:image/${format === 'png' ? 'png' : 'jpeg'};base64,${imageB64}`,
      message: 'Thumbnail generated successfully'
    });
  } catch (err: any) {
    console.error('Thumbnail generation error:', err);
    return res.status(500).json({ 
      error: 'Thumbnail generation failed', 
      details: err.message 
    });
  }
}
