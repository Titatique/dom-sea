/**
 * Layout du groupe (auth) : pages connexion/inscription.
 * Pas de header/footer public — interface épurée centrée sur la conversion.
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
