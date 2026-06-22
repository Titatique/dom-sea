"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toaster";
import { registerSchema, type RegisterInput } from "@/lib/validations";

export default function InscriptionPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: RegisterInput) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/inscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error ?? "Erreur lors de l'inscription");

      toast.success("Compte créé ! Vérifiez votre email.");
      router.push("/connexion");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-[var(--color-foam)]">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center gap-2 mb-8 justify-center">
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

        <div className="bg-white border border-[var(--color-border-subtle)] rounded-sm p-8">
          <h1 className="font-display text-2xl uppercase text-[var(--color-abyss)] mb-2 text-center">
            Créer un compte
          </h1>
          <p className="text-sm text-[var(--color-channel)] text-center mb-8">
            Déjà inscrit ?{" "}
            <Link href="/connexion" className="text-[var(--color-beacon)] hover:underline">
              Se connecter
            </Link>
          </p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
            <Input {...register("name")} label="Nom complet" required error={errors.name?.message} />
            <Input {...register("companyName")} label="Nom de l'entreprise" required error={errors.companyName?.message} />
            <Input {...register("email")} type="email" label="Email professionnel" required error={errors.email?.message} />
            <Input {...register("phone")} type="tel" label="Téléphone (optionnel)" error={errors.phone?.message} />
            <Input {...register("password")} type="password" label="Mot de passe" required error={errors.password?.message} hint="8 caractères min., 1 majuscule, 1 chiffre" />
            <Input {...register("confirmPassword")} type="password" label="Confirmer le mot de passe" required error={errors.confirmPassword?.message} />

            <Controller
              control={control}
              name="acceptTerms"
              render={({ field }) => (
                <label className="flex items-start gap-3 cursor-pointer mt-2">
                  <input
                    type="checkbox"
                    checked={field.value ?? false}
                    onChange={(e) => field.onChange(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-[var(--color-beacon)]"
                  />
                  <span className="text-xs text-[var(--color-channel)]">
                    J'accepte les{" "}
                    <Link href="/cgu" className="text-[var(--color-beacon)] hover:underline">
                      conditions générales d'utilisation
                    </Link>
                  </span>
                </label>
              )}
            />
            {errors.acceptTerms && (
              <p className="text-xs text-[var(--color-danger)]">{errors.acceptTerms.message}</p>
            )}

            <Button type="submit" size="lg" loading={submitting} className="mt-2">
              Créer mon compte
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
