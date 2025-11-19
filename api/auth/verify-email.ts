import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verificationCodes } from './send-verification';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ error: 'Email and code are required' });
    }

    const stored = verificationCodes.get(email);

    if (!stored) {
      return res.status(400).json({ error: 'No verification code found for this email' });
    }

    if (stored.expires < Date.now()) {
      return res.status(400).json({ error: 'Verification code has expired' });
    }

    if (stored.code !== code) {
      return res.status(400).json({ error: 'Invalid verification code' });
    }

    // Successfully verified
    verificationCodes.delete(email);

    return res.status(200).json({ success: true, message: 'Email verified successfully' });
  } catch (err: any) {
    console.error('Error verifying email:', err);
    return res.status(500).json({ error: 'Failed to verify email', details: err.message });
  }
}
