import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

// Initialize Resend client with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// In-memory storage for verification codes (use Redis or database in production)
const verificationCodes = new Map<string, { code: string; expires: number }>();

export { verificationCodes };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract email from request body
    const { email } = req.body;

    // If email is missing, return error
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Generate a 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = Date.now() + 15 * 60 * 1000; // Code expires in 15 minutes

    // Store the verification code in memory (use a DB or Redis in production)
    verificationCodes.set(email, { code, expires });

    // Send the verification email via Resend API
    try {
      await resend.sendEmail({
        from: 'onboarding@resend.dev',
        to: [email], // Ensure email is an array
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
            <p style="color: #999; font-size: 12px; margin-top: 10px;">
              Thank you for using our service.
            </p>
          </div>
        `,
      });

      console.log(`Verification code sent to ${email}`);
    } catch (emailError: any) {
      console.error('Resend API error:', emailError);
      console.log(`Verification code for ${email}: ${code}`);
      return res.status(500).json({
        error: 'Failed to send verification email',
        details: emailError.message || emailError,
      });
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Verification code sent to your email',
    });
  } catch (err: any) {
    console.error('Send verification error:', err);
    return res.status(500).json({
      error: 'Failed to send verification code',
      details: err.message,
    });
  }
}
