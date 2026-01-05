import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { Resend } from "resend";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log("HTTP trigger function processed a request.");

  // Only allow POST
  if (req.method !== "POST") {
    context.res = {
      status: 405,
      headers: { "Content-Type": "application/json" },
      body: { error: "Method not allowed" },
    };
    return;
  }

  try {
    const body = req.body;
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const company = typeof body?.company === "string" ? body.company.trim() : "";
    const message = typeof body?.message === "string" ? body.message.trim() : "";
    const partnership = Boolean(body?.partnership);

    if (!name || !email || !message) {
      context.res = {
        status: 400,
        headers: { "Content-Type": "application/json" },
        body: { error: "Missing required fields: name, email, message" },
      };
      return;
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL || "contact@bbafintech.com";

    if (!resendApiKey) {
      context.res = {
        status: 500,
        headers: { "Content-Type": "application/json" },
        body: { error: "Missing RESEND_API_KEY" },
      };
      return;
    }

    const resend = new Resend(resendApiKey);

    const { data, error } = await resend.emails.send({
      from: "BBA Website <onboarding@resend.dev>",
      to: [contactEmail],
      subject: `New Contact Form Submission: ${partnership ? "[Partnership Inquiry]" : ""} ${name}`,
      replyTo: email,
      text: `
Name: ${name}
Email: ${email}
Company: ${company || "N/A"}
Partnership Interest: ${partnership ? "Yes" : "No"}

Message:
${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || "N/A"}</p>
        <p><strong>Partnership Interest:</strong> ${partnership ? "Yes" : "No"}</p>
        <br/>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    if (error) {
      context.log.error("Resend error:", error);
      context.res = {
        status: 400,
        headers: { "Content-Type": "application/json" },
        body: { error: error.message || "Failed to send email" },
      };
      return;
    }

    context.log("Email sent successfully:", data);
    context.res = {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: { success: true, data },
    };
  } catch (err) {
    context.log.error("Server error:", err);
    context.res = {
      status: 500,
      headers: { "Content-Type": "application/json" },
      body: { error: "Internal Server Error" },
    };
  }
};

export default httpTrigger;
