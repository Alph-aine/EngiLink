import nodemailer from 'nodemailer';

const sendEmail = async options => {
  // 1. Create a transporter object using the default SMTP transport.
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  });

  // 2. Define the email options.
  const mailOptions = {
    from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_MAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message

  };

  // 3. Send the email.
  await transport.sendMail(mailOptions);
};

// Export sendEmail.
export default sendEmail;
