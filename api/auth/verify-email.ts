import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verificationCodes } from './send-verification';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, code } = req.body;
    if (!email || !code) return res.status(400).json({ error: 'Email and code are required' });

    const storedData = verificationCodes.get(email);
    
    if (!storedData) {
      return res.status(400).json({ error: 'No verification code found for this email' });
    }

    if (Date.now() > storedData.expires) {
      verificationCodes.delete(email);
      return res.status(400).json({ error: 'Verification code expired' });
    }

    if (storedData.code !== code) {
      return res.status(400).json({ error: 'Invalid verification code' });
    }

    // Code is valid, remove it
    verificationCodes.delete(email);

    return res.status(200).json({ 
      success: true, 
      message: 'Email verified successfully' 
    });
  } catch (err: any) {
    console.error('Verify email error:', err);
    return res.status(500).json({ 
      error: 'Verification failed',
      details: err.message 
    });
  }
}
