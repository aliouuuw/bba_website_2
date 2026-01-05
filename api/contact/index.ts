import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { Resend } from "resend";

export async function contact(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log("HTTP trigger function processed a request.");

  try {
    const body = await request.json() as any;
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const company = typeof body?.company === "string" ? body.company.trim() : "";
    const message = typeof body?.message === "string" ? body.message.trim() : "";
    const partnership = Boolean(body?.partnership);

    if (!name || !email || !message) {
      return {
        status: 400,
        jsonBody: { error: "Missing required fields: name, email, message" },
      };
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL || "contact@bbafintech.com";

    if (!resendApiKey) {
      return {
        status: 500,
        jsonBody: { error: "Missing RESEND_API_KEY" },
      };
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
      context.error("Resend error:", error);
      return {
        status: 400,
        jsonBody: { error: error.message || "Failed to send email" },
      };
    }

    context.log("Email sent successfully:", data);
    return {
      status: 200,
      jsonBody: { success: true, data },
    };
  } catch (err) {
    context.error("Server error:", err);
    return {
      status: 500,
      jsonBody: { error: "Internal Server Error" },
    };
  }
}

app.http('contact', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: contact
});
