/** @module lib **/

const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

// const EMAIL = "saai.register@gmail.com";
// const PASS = "iytuwoptbrmhqyle";

const HOST = process.env.HOST || "";
const COMPANY_NAME = process.env.COMPANY_NAME || "";
const SERVICE = process.env.NODE_MAILER_SERVICE || "";
const EMAIL = process.env.NODE_MAILER_EMAIL;
const PASS = process.env.NODE_MAILER_PASS;
const NODE_MAILER_HOST = process.env.NODE_MAILER_HOST || "";
const NODE_MAILER_PORT = parseInt(process.env.NODE_MAILER_PORT || "0");

const config = {
  name: "www.saaiota.com",
  service: SERVICE,
  host: NODE_MAILER_HOST,
  port: NODE_MAILER_PORT,
  auth: {
    user: EMAIL,
    pass: PASS,
  },
};

/**
 * @param {{to:String,template:Mailgen.Content,subject:String}} props
 * **/

const sendMail = async (props) => {
  const { to, template, subject } = props;
  let transporter = nodemailer.createTransport(config);
  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: COMPANY_NAME,
      link: HOST,
      // logo: ``,
      logoHeight: "40px",
      // copyright: "test",
    },
  });
  let html = MailGenerator.generate(template);

  const message = {
    // from: `“www.saaiota.com” <${EMAIL}>`,
    from: `saaiota <${EMAIL}>`,
    to,
    subject,
    html,
  };

  return transporter.sendMail(message);
};

module.exports = sendMail;
