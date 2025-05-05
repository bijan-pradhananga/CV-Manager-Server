const nodemailer = require('nodemailer');

const sendMail = async ({ to, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // or use host + port + auth for custom SMTP
      auth: {
        user: process.env.EMAIL_USER, // gmail
        pass: process.env.EMAIL_PASS, // app password 
      },
    });

    const mailOptions = {
      from: `"Your App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error.message);
    throw new Error('Failed to send email');
  }
};

module.exports = sendMail;
