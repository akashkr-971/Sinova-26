import { NextResponse } from 'next/server';
import { env } from 'process';
import { Resend } from 'resend';

const resend = new Resend(env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, email, query } = await request.json();

  try {
    const data = await resend.emails.send({
      from: 'SINOVA Support <onboarding@resend.dev>',
      to: ['akashkr971@gmail.com'], 
      replyTo: email,
      subject: `New SINOVA'26 Query from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Query:</strong> ${query}</p>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}