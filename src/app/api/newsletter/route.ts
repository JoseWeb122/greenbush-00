import { db } from "@/db";
import { newsletterSubscribers } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { email?: string; firstName?: string };
    const email = body.email?.trim().toLowerCase() ?? "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ ok: false, message: "Please enter a valid email address." }, { status: 400 });
    }
    await db
      .insert(newsletterSubscribers)
      .values({ email, firstName: body.firstName?.trim().slice(0, 80) || null })
      .onConflictDoNothing();
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, message: "We couldn't save your subscription. Please try again." }, { status: 500 });
  }
}
