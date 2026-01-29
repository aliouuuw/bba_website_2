import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { Resend } from "resend";

export async function careers(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log("Careers form submission processed.");

  try {
    const body = await request.json() as any;
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
    const position = typeof body?.position === "string" ? body.position.trim() : "";
    const experience = typeof body?.experience === "string" ? body.experience.trim() : "";
    const message = typeof body?.message === "string" ? body.message.trim() : "";

    if (!name || !email || !position || !experience) {
      return {
        status: 400,
        jsonBody: { error: "Missing required fields: name, email, position, experience" },
      };
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const careersEmail = process.env.CONTACT_EMAIL || "careers@bbafintech.com";

    if (!resendApiKey) {
      return {
        status: 500,
        jsonBody: { error: "Missing RESEND_API_KEY" },
      };
    }

    const resend = new Resend(resendApiKey);

    const { data, error } = await resend.emails.send({
      from: "BBA Careers <onboarding@resend.dev>",
      to: [careersEmail],
      subject: `New Job Application: ${position} - ${name}`,
      replyTo: email,
      text: `
New Job Application Received

Position: ${position}
Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Experience Level: ${experience}

Cover Letter / Additional Information:
${message || "Not provided"}

Please review this application and follow up accordingly.
      `,
      html: `
        <h2>New Job Application Received</h2>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #2D2A5E; margin-bottom: 15px;">Application Details</h3>
          <p><strong>Position:</strong> ${position}</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <p><strong>Experience Level:</strong> ${experience}</p>
        </div>
        
        ${message ? `
        <div style="margin: 20px 0;">
          <h3 style="color: #2D2A5E;">Cover Letter / Additional Information</h3>
          <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #2D2A5E;">
            ${message.replace(/\n/g, "<br/>")}
          </div>
        </div>
        ` : ''}
        
        <p style="margin-top: 30px; padding: 15px; background-color: #e8f4fd; border-radius: 5px;">
          <strong>Note:</strong> Resume/CV should be attached separately through the application system.
        </p>
        
        <p style="margin-top: 20px; color: #666;">
          Please review this application and follow up accordingly.
        </p>
      `,
    });

    if (error) {
      context.error("Resend error:", error);
      return {
        status: 400,
        jsonBody: { error: error.message || "Failed to send application email" },
      };
    }

    context.log("Careers application email sent successfully:", data);
    return {
      status: 200,
      jsonBody: { success: true, message: "Application submitted successfully" },
    };
  } catch (err) {
    context.error("Server error:", err);
    return {
      status: 500,
      jsonBody: { error: "Internal Server Error" },
    };
  }
}

app.http('careers', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: careers
});
