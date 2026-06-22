"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/toaster";
import { contactSchema, type ContactInput } from "@/lib/validations";
import { siteConfig } from "@/config/site";

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactInput) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Erreur lors de l'envoi");
      setSubmitted(true);
      reset();
      toast.success("Message envoyé !");
    } catch {
      toast.error("Une erreur est survenue. Réessayez.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 max-w-xl mx-auto">
          <p className="font-mono text-[var(--color-beacon)] text-xs uppercase tracking-[0.2em] mb-3">
            Contact
          </p>
          <h1 className="font-display text-4xl uppercase text-[var(--color-abyss)] mb-4">
            Parlons de votre projet
          </h1>
          <p className="text-[var(--color-channel)]">
            Une question sur la plateforme, un partenariat, ou besoin d'aide ?
            Notre équipe vous répond rapidement.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Coordonnées */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            {[
              { label: "Email", value: siteConfig.contactEmail, href: `mailto:${siteConfig.contactEmail}` },
              { label: "Téléphone", value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s/g, "")}` },
              { label: "Adresse", value: siteConfig.address },
            ].map(({ label, value, href }) => (
              <Card key={label} padding="md">
                <p className="text-xs text-[var(--color-channel)] uppercase tracking-wide mb-1">{label}</p>
                {href ? (
                  <a href={href} className="font-mono text-sm text-[var(--color-abyss)] hover:text-[var(--color-beacon)]">
                    {value}
                  </a>
                ) : (
                  <p className="font-mono text-sm text-[var(--color-abyss)]">{value}</p>
                )}
              </Card>
            ))}
          </div>

          {/* Formulaire */}
          <div className="lg:col-span-2">
            <Card padding="lg">
              {submitted ? (
                <div className="text-center py-10">
                  <p className="font-display text-xl uppercase text-[var(--color-abyss)] mb-2">
                    Message envoyé
                  </p>
                  <p className="text-sm text-[var(--color-channel)]">
                    Nous vous répondrons dans les plus brefs délais.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input {...register("name")} label="Nom" required error={errors.name?.message} />
                    <Input {...register("email")} type="email" label="Email" required error={errors.email?.message} />
                  </div>
                  <Input {...register("subject")} label="Sujet" required error={errors.subject?.message} />
                  <Textarea {...register("message")} label="Message" required error={errors.message?.message} className="min-h-[160px]" />
                  {/* Honeypot */}
                  <div className="hidden" aria-hidden="true">
                    <input {...register("company")} type="text" tabIndex={-1} autoComplete="off" />
                  </div>
                  <Button type="submit" size="lg" loading={submitting} className="self-start">
                    Envoyer le message
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
