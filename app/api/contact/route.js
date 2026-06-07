import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const body = await req.json();
  const { name, email, phone, subject, message } = body;

  await prisma.contactMessage.create({
    data: { name, email, phone, subject, message },
  });

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "citizenhadi7@gmail.com",
    subject: `New contact: ${subject || "No subject"}`,
    html: `
      <h2>New message from ${name}</h2>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone || "—"}</p>
      <p><b>Subject:</b> ${subject || "—"}</p>
      <p><b>Message:</b><br/>${message}</p>
    `,
  });

  return Response.json({ ok: true });
}