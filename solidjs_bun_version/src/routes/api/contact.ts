import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'contact@bbafintech.com';

export async function POST({ request }: { request: Request }) {
  try {
    const body = await request.json();
    const { name, email, company, message, partnership } = body;

    const { data, error } = await resend.emails.send({
      from: 'BBA Website <onboarding@resend.dev>',
      to: [CONTACT_EMAIL],
      subject: `New Contact Form Submission: ${partnership ? '[Partnership Inquiry]' : ''} ${name}`,
      replyTo: email,
      text: `
Name: ${name}
Email: ${email}
Company: ${company || 'N/A'}
Partnership Interest: ${partnership ? 'Yes' : 'No'}

Message:
${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Partnership Interest:</strong> ${partnership ? 'Yes' : 'No'}</p>
        <br/>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return new Response(JSON.stringify({ error }), { status: 400 });
    }

    return new Response(JSON.stringify({ success: true, data }), { status: 200 });
  } catch (err) {
    console.error('Server error:', err);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
