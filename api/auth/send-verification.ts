import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// In-memory storage for verification codes (in production, use Redis or database)
export const verificationCodes = new Map<string, { code: string; expires: number }>();

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

    // Send verification email via Resend
    try {
      await resend.emails.send({
        from: 'AI Creator Studio <onboarding@resend.dev>',
        to: [email],
        subject: 'Your Verification Code',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333;">Verify Your Email</h1>
            <p style="color: #666; font-size: 16px;">
              Your verification code is:
            </p>
            <div style="background: #f4f4f4; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
              <h2 style="color: #333; font-size: 32px; letter-spacing: 5px; margin: 0;">
                ${code}
              </h2>
            </div>
            <p style="color: #666; font-size: 14px;">
              This code will expire in 15 minutes.
            </p>
            <p style="color: #999; font-size: 12px; margin-top: 30px;">
              If you didn't request this code, please ignore this email.
            </p>
          </div>
        `,
      });

      console.log(`Verification code sent to ${email}`);
    } catch (emailError: any) {
      console.error('Resend error:', emailError);
      // If Resend fails (e.g., API key not set), log the code for development
      console.log(`Verification code for ${email}: ${code}`);
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Verification code sent to your email'
    });
  } catch (err: any) {
    console.error('Send verification error:', err);
    return res.status(500).json({ 
      error: 'Failed to send verification code',
      details: err.message 
    });
  }
}
