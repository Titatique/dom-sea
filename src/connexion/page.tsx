"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toaster";
import { loginSchema, type LoginInput } from "@/lib/validations";

export default function ConnexionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/dashboard/client";
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        if (result.error === "ACCOUNT_SUSPENDED") {
          toast.error("Votre compte a été suspendu. Contactez notre support.");
        } else {
          toast.error("Email ou mot de passe incorrect.");
        }
        return;
      }

      // Redirection vers la destination initiale ou le dashboard
      router.push(from);
      router.refresh();
    } catch {
      toast.error("Une erreur est survenue. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Panneau gauche — visuel de marque */}
      <div className="hidden lg:flex lg:w-1/2 bg-[var(--color-abyss)] flex-col justify-between p-12 relative overflow-hidden">
        {/* Carte maritime décorative */}
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <svg viewBox="0 0 600 800" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="authGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#5B7A8C" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="600" height="800" fill="url(#authGrid)" />
          </svg>
        </div>

        {/* Logo */}
        <div className="relative">
          <Link href="/" className="flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="2" fill="#C8651B" />
              <path d="M6 22 Q10 14 16 16 Q22 18 26 10" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
              <circle cx="6" cy="22" r="2" fill="white" />
              <circle cx="16" cy="16" r="2" fill="white" />
              <circle cx="26" cy="10" r="2" fill="white" />
            </svg>
            <span className="font-display text-xl uppercase tracking-widest text-white">
              Dom <span className="text-[var(--color-beacon)]">&</span> Sea
            </span>
          </Link>
        </div>

        <div className="relative">
          <blockquote className="text-[var(--color-foam)] font-serif">
            <p className="text-2xl leading-relaxed mb-6">
              "La logistique DOM-TOM, enfin centralisée."
            </p>
            <footer className="text-sm text-[var(--color-channel-light)]">
              — Marie-Claire B., Directrice Supply Chain · GMS Caraïbes
            </footer>
          </blockquote>
        </div>
      </div>

      {/* Panneau droit — formulaire */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Header mobile */}
          <div className="lg:hidden mb-8">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="2" fill="#C8651B" />
                <path d="M6 22 Q10 14 16 16 Q22 18 26 10" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
                <circle cx="6" cy="22" r="2" fill="white" />
                <circle cx="16" cy="16" r="2" fill="white" />
                <circle cx="26" cy="10" r="2" fill="white" />
              </svg>
              <span className="font-display text-lg uppercase tracking-widest text-[var(--color-abyss)]">
                Dom & Sea
              </span>
            </Link>
          </div>

          <h1 className="font-display text-3xl uppercase text-[var(--color-abyss)] mb-2">
            Connexion
          </h1>
          <p className="text-sm text-[var(--color-channel)] mb-8">
            Pas encore de compte ?{" "}
            <Link href="/inscription" className="text-[var(--color-beacon)] hover:underline">
              Créer un compte
            </Link>
          </p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
            <Input
              {...register("email")}
              type="email"
              label="Email professionnel"
              placeholder="vous@entreprise.fr"
              error={errors.email?.message}
              required
              autoComplete="email"
            />
            <div>
              <Input
                {...register("password")}
                type="password"
                label="Mot de passe"
                placeholder="••••••••"
                error={errors.password?.message}
                required
                autoComplete="current-password"
              />
              <div className="mt-1.5 text-right">
                <Link
                  href="/mot-de-passe-oublie"
                  className="text-xs text-[var(--color-channel)] hover:text-[var(--color-beacon)] transition-colors"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
            </div>

            <Button type="submit" size="lg" loading={loading} className="mt-2">
              Se connecter
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-[var(--color-border-subtle)]">
            <p className="text-xs text-center text-[var(--color-channel)]">
              Vous souhaitez rejoindre la plateforme en tant que partenaire ?{" "}
              <Link href="/devenir-partenaire" className="text-[var(--color-beacon)] hover:underline">
                Inscription partenaire
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
