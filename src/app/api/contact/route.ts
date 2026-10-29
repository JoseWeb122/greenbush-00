import { db } from "@/db";
import { contactMessages } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<Record<"name" | "email" | "subject" | "message", string>>;
    const name = body.name?.trim() ?? "";
    const email = body.email?.trim().toLowerCase() ?? "";
    const subject = body.subject?.trim() ?? "";
    const message = body.message?.trim() ?? "";
    const errors: Record<string, string> = {};
    if (name.length < 2) errors.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email address.";
    if (subject.length < 3) errors.subject = "Please add a subject.";
    if (message.length < 10) errors.message = "Please write at least a short message.";
    if (Object.keys(errors).length) return Response.json({ ok: false, errors }, { status: 400 });

    await db.insert(contactMessages).values({ name: name.slice(0, 120), email, subject: subject.slice(0, 200), message: message.slice(0, 5000) });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, message: "We couldn't save your message. Please try again." }, { status: 500 });
  }
}
