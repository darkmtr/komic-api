import nodemailer from 'nodemailer';

export const sendMail = () => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'davidkjohn.dev@gmail.com', // sender address
    to: 'davidkjohn01@gmail.com', // list of receivers
    subject: 'Test Mail', // Subject line
    html: '<h1>test</h1>', // plain text body
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log(err);
    else {
      console.log(info);
    }
  });
};
