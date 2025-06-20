const nodemailer = require('nodemailer');

// Use Gmail for free (for demo/testing, enable 'less secure apps' or use an app password)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // your gmail address
    pass: process.env.EMAIL_PASS  // your gmail app password
  }
});

async function sendResetEmail(to, resetUrl) {
  const mailOptions = {
    from: `Personality Predictor <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Password Reset Request',
    html: `<p>You requested a password reset for your Personality Predictor account.</p>
           <p>Click the link below to reset your password. This link is valid for 1 hour.</p>
           <a href="${resetUrl}">${resetUrl}</a>
           <p>If you did not request this, you can ignore this email.</p>`
  };
  return transporter.sendMail(mailOptions);
}

module.exports = { sendResetEmail };
