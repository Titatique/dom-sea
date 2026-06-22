import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.company && body.company.length > 0) {
      // Honeypot déclenché : on répond succès sans rien persister
      return NextResponse.json({ success: true });
    }

    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Données invalides", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = result.data;

    await prisma.contactMessage.create({
      data: { name, email, subject, message },
    });

    // TODO : notifier l'équipe support par email (Resend)

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[POST /api/contact]", error);
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}
