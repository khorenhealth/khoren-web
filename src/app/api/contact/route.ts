import { Resend } from "resend";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  fullName?: unknown;
  email?: unknown;
  inquiry?: unknown;
};

function asTrimmedString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    return Response.json(
      { error: "Contact form is not configured." },
      { status: 500 },
    );
  }

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const fullName = asTrimmedString(body.fullName);
  const email = asTrimmedString(body.email);
  const inquiry = asTrimmedString(body.inquiry);

  if (fullName.length < 2 || fullName.length > 120) {
    return Response.json(
      { error: "Enter your full name." },
      { status: 400 },
    );
  }

  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return Response.json(
      { error: "Enter a valid email address." },
      { status: 400 },
    );
  }

  if (inquiry.length < 5 || inquiry.length > 5000) {
    return Response.json(
      { error: "Enter a message of at least a few words." },
      { status: 400 },
    );
  }

  const resend = new Resend(apiKey);
  const safeName = escapeHtml(fullName);
  const safeEmail = escapeHtml(email);
  const safeInquiry = escapeHtml(inquiry).replaceAll("\n", "<br />");

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `New contact inquiry from ${fullName}`,
    text: `Name: ${fullName}\nEmail: ${email}\n\n${inquiry}`,
    html: `<p><strong>Name:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><p>${safeInquiry}</p>`,
  });

  if (error) {
    console.error("Contact email failed:", error.message);
    return Response.json(
      { error: "We couldn't send your message. Please try again." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
