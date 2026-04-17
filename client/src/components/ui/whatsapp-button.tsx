export function WhatsAppButton() {
  const phone = "5583991771120";
  const message = encodeURIComponent(
    "Olá, pessoal! Estou no site da Psicometria Online Academy e gostaria de mais informações sobre a formação."
  );
  const href = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="button-whatsapp"
      aria-label="Fale conosco pelo WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg transition-transform duration-200 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 animate-whatsapp-pulse"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="w-8 h-8 fill-white"
        aria-hidden="true"
      >
        <path d="M16 0C7.164 0 0 7.163 0 16c0 2.824.737 5.475 2.027 7.774L0 32l8.453-2.007A15.934 15.934 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0Zm0 29.333a13.27 13.27 0 0 1-6.771-1.855l-.485-.288-5.018 1.192 1.213-4.886-.316-.502A13.267 13.267 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333Zm7.27-9.878c-.398-.199-2.352-1.16-2.717-1.293-.364-.132-.629-.198-.894.2-.264.398-1.026 1.293-1.258 1.558-.231.265-.463.298-.861.1-.398-.2-1.681-.62-3.202-1.977-1.183-1.055-1.982-2.358-2.213-2.756-.232-.398-.025-.613.174-.811.178-.178.398-.465.597-.697.199-.232.265-.398.398-.663.132-.265.066-.497-.033-.696-.1-.2-.894-2.155-1.225-2.95-.322-.773-.65-.668-.894-.68l-.762-.013c-.265 0-.696.1-1.06.497-.364.398-1.39 1.36-1.39 3.314 0 1.955 1.424 3.843 1.623 4.108.199.265 2.802 4.277 6.79 5.997.949.41 1.69.654 2.268.838.953.303 1.82.26 2.505.158.764-.114 2.352-.961 2.683-1.889.331-.928.331-1.723.232-1.889-.1-.165-.364-.265-.762-.464Z" />
      </svg>
    </a>
  );
}
