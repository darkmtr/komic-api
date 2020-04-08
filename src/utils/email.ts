import nodemailer from 'nodemailer';
import { renderFile } from 'ejs';

interface ISendMailArgs {
  token: string;
  email: string;
}

export const sendMail = ({ token, email }: ISendMailArgs) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  renderFile(
    '/home/dave/Desktop/code/komic/src/templates/confirmMail.ejs',
    { link: `http://localhost:4000/${token}` },
    (err, data) => {
      if (err) console.log(err);
      else {
        const mailOptions = {
          from: 'davidkjohn.dev@gmail.com', // sender address
          to: email, // list of receivers
          subject: 'Komic - Confirm Email', // Subject line
          html: data, // plain text body
        };

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) console.log(err);
          else {
            console.log(info);
          }
        });
      }
    }
  );
};
