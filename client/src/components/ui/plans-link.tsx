import { Link } from "wouter";

interface PlansLinkProps {
  children: React.ReactNode;
  className?: string;
  "data-testid"?: string;
}

export function PlansLink({
  children,
  className,
  "data-testid": testId,
}: PlansLinkProps) {
  return (
    <Link href="/planos" className={className} data-testid={testId}>
      {children}
    </Link>
  );
}
