import FormData from "form-data"; 
import Mailgun from "mailgun.js";

export async function sendEmailMessage({ to, subject, text }: {to: string[], subject: string, text: string}): Promise<void> {
    if(!process.env.EMAIL_API_KEY || !process.env.EMAIL_DOMAIN) {
        console.log(`Error while sending email to ${to}: `, "No email envs declared");
        return
    }

    const mailgun = new Mailgun(FormData);
    const client = mailgun.client({
      username: "api",
      key: process.env.EMAIL_API_KEY,
      // When you have an EU-domain, you must specify the endpoint:
      // url: "https://api.eu.mailgun.net"
    });

    try {
      const data = await client.messages.create(process.env.EMAIL_DOMAIN, {
        to,
        subject,
        text,
      });
  
      console.log("Send email success: ", data); // logs response data
    } catch (error) {
      console.log(`Error while sending email to ${to}: `, error); //logs any error
    }
  }