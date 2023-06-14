const nodeMailer = require("nodemailer");
const { SMTP_MAIL, SMTP_PASSWORD, SMTP_SERVICE } = require("../config/vars");
const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    service: SMTP_SERVICE,
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: SMTP_MAIL,
      pass: SMTP_PASSWORD,
    },
  });
  const mailOptions = {
    from: SMTP_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
