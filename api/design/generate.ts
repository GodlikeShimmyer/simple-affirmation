import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { projectName, designType, prompt, userId, options } = req.body;
    if (!projectName || !designType || !prompt || !userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const { colorScheme, style, format, dimensions } = options || {};
    
    // Build enhanced prompt with design specifications
    const enhancedPrompt = `Create a ${designType} design for "${projectName}". ${prompt}. Style: ${style || 'modern'}. Color scheme: ${colorScheme || 'vibrant'}. Professional quality, high resolution.`;

    // Determine image size based on dimensions
    let size: '1024x1024' | '1792x1024' | '1024x1792' = '1024x1024';
    if (dimensions === '1920x1080' || dimensions === '2480x3508') {
      size = '1792x1024';
    } else if (dimensions === '1080x1350') {
      size = '1024x1792';
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
    
    console.log('Design generated:', {
      jobId,
      userId,
      projectName,
      designType,
    });

    return res.status(200).json({ 
      success: true, 
      jobId, 
      status: 'completed',
      imageUrl: imageUrl || `data:image/${format === 'png' ? 'png' : 'jpeg'};base64,${imageB64}`,
      message: 'Design generated successfully'
    });
  } catch (err: any) {
    console.error('Design generation error:', err);
    return res.status(500).json({ 
      error: 'Design generation failed', 
      details: err.message 
    });
  }
}
