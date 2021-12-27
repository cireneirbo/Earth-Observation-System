const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const emailTo = "ejobrien315@gmail.com";
const emailFrom = process.env.SENDGRID_EMAIL_SENDER;
const emailSubject = "SendGrid number 2";
const emailText = "This is my second email. Can you read it without the HTML added?";
const emailHTML = `<p>${emailText}</p>`;

// Create the email
const msg = {
  to: emailTo,
  from: emailFrom, // Use the email address or domain you verified above
  subject: emailSubject,
  text: emailText,
  html: emailHTML,
};

// Send the email
(async () => {
  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  }
})();