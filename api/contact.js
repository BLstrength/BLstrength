const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { firstName, lastName, email, phone, hearAbout, service, goal } = req.body;

  if (!firstName || !lastName || !email || !phone || !hearAbout || !service || !goal) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  const body = `
New Coaching Inquiry — BL Strength

Name:     ${firstName} ${lastName}
Email:    ${email}
Phone:    ${phone}
Heard:    ${hearAbout}
Service:  ${service}
Goal:     ${goal}
  `.trim();

  try {
    if (process.env.SMTP_HOST) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"BL Strength Website" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_EMAIL || 'Bobby@BLstrength.com',
        replyTo: email,
        subject: `New Inquiry: ${firstName} ${lastName} — ${service}`,
        text: body,
      });
    } else {
      console.log('[Contact Form Submission]\n' + body);
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
};
