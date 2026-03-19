const BASE_URL = "https://membros.psicometriaonline.com.br/cadastro";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

export function buildRegistrationUrl(): string {
  if (typeof window === "undefined") return BASE_URL;
  const current = new URLSearchParams(window.location.search);
  const utms = new URLSearchParams();
  UTM_KEYS.forEach((key) => {
    const val = current.get(key);
    if (val) utms.set(key, val);
  });
  const qs = utms.toString();
  return qs ? `${BASE_URL}?${qs}` : BASE_URL;
}

interface RegistrationLinkProps {
  children: React.ReactNode;
  className?: string;
  "data-testid"?: string;
}

export function RegistrationLink({
  children,
  className,
  "data-testid": testId,
}: RegistrationLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open(buildRegistrationUrl(), "_blank", "noopener,noreferrer");
  };

  return (
    <a
      href={BASE_URL}
      onClick={handleClick}
      className={className}
      data-testid={testId}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
