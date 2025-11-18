import type { VercelRequest, VercelResponse } from '@vercel/node';

// In-memory storage for verification codes (in production, use Redis or database)
const verificationCodes = new Map<string, { code: string; expires: number }>();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    // Generate 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = Date.now() + 15 * 60 * 1000; // 15 minutes

    // Store verification code
    verificationCodes.set(email, { code, expires });

    // In production, send email via service like SendGrid, AWS SES, or Resend
    console.log(`Verification code for ${email}: ${code}`);

    return res.status(200).json({ 
      success: true, 
      message: 'Verification code sent',
      // For development - remove in production
      devCode: code 
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
