const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendVerificationEmail(to, verifyUrl) {
  const mailOptions = {
    from: `Personality Predictor <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Verify your email address',
    html: `<p>Thank you for signing up for Personality Predictor.</p>
           <p>Please verify your email address by clicking the link below:</p>
           <a href="${verifyUrl}">${verifyUrl}</a>
           <p>If you did not sign up, you can ignore this email.</p>`
  };
  return transporter.sendMail(mailOptions);
}

module.exports = { sendVerificationEmail };
