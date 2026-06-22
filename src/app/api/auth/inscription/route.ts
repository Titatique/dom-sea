import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validations";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validation des données
    const result = registerSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Données invalides", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, password, companyName, phone } = result.data;

    // Vérifier si l'email existe déjà
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "Un compte avec cet email existe déjà" },
        { status: 409 }
      );
    }

    // Hachage du mot de passe (facteur de coût 12 — bon compromis sécurité/perf)
    const passwordHash = await bcrypt.hash(password, 12);

    // Génération du token de vérification email
    const verificationToken = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

    // Création du compte
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        companyName,
        phone: phone ?? null,
        role: "CLIENT",
        status: "PENDING", // actif après vérification email
        emailVerificationTokens: {
          create: {
            token: verificationToken,
            expiresAt,
          },
        },
        clientProfile: {
          create: {},
        },
      },
      select: { id: true, email: true },
    });

    // Log d'inscription
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: "USER_REGISTERED",
        entityType: "User",
        entityId: user.id,
      },
    });

    // TODO : envoyer l'email de vérification via Resend
    // await sendVerificationEmail({ email, token: verificationToken, name });

    return NextResponse.json({
      success: true,
      message: "Compte créé. Vérifiez votre email pour l'activer.",
    });
  } catch (error) {
    console.error("[POST /api/auth/inscription]", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
