import { useEffect, useRef, useState } from "react";
import { Check, X } from "lucide-react";

const FIRST_NAMES = [
  "William", "Carolina", "Arthur", "Fernando", "Gabriel", "Mariana", "Lucas",
  "Beatriz", "Rafael", "Juliana", "Pedro", "Larissa", "Gustavo", "Camila",
  "Bruno", "Amanda", "Felipe", "Letícia", "Rodrigo", "Patrícia", "Thiago",
  "Fernanda", "Matheus", "Aline", "Vinícius", "Bruna", "Leonardo", "Carla",
  "Daniel", "Vanessa", "Eduardo", "Priscila", "Marcelo", "Renata", "André",
  "Tatiane", "Ricardo", "Sabrina", "Henrique", "Débora", "Caio", "Natália",
  "Diego", "Isabela", "Murilo", "Jéssica", "Otávio", "Raquel", "Vitor",
  "Manuela", "Igor", "Bianca", "Leandro", "Adriana", "Fábio", "Cláudia",
];

const LAST_NAMES = [
  "Pessoa", "Neves", "Medeiros", "Silva", "Santos", "Oliveira", "Souza",
  "Lima", "Pereira", "Costa", "Almeida", "Ferreira", "Rodrigues", "Gomes",
  "Martins", "Araújo", "Barbosa", "Ribeiro", "Carvalho", "Teixeira", "Cardoso",
  "Rocha", "Dias", "Nascimento", "Moreira", "Mendes", "Freitas", "Cavalcanti",
  "Monteiro", "Azevedo", "Correia", "Pinto", "Macedo", "Batista", "Andrade",
  "Nogueira", "Moraes", "Vieira", "Ramos", "Castro", "Duarte", "Camargo",
];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInterval() {
  return (40 + Math.random() * 45) * 1000;
}

export function SocialProofToast() {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const lastNameRef = useRef("");

  useEffect(() => {
    let cancelled = false;
    const timers: number[] = [];

    const schedule = (delay: number) => {
      const t = window.setTimeout(() => {
        if (cancelled) return;

        let full = "";
        do {
          full = `${randomItem(FIRST_NAMES)} ${randomItem(LAST_NAMES)}`;
        } while (full === lastNameRef.current);
        lastNameRef.current = full;

        setName(full);
        setVisible(true);

        const hideT = window.setTimeout(() => {
          if (cancelled) return;
          setVisible(false);
          schedule(randomInterval());
        }, 3000);
        timers.push(hideT);
      }, delay);
      timers.push(t);
    };

    schedule(10000);

    return () => {
      cancelled = true;
      timers.forEach((id) => clearTimeout(id));
    };
  }, []);

  return (
    <div
      aria-live="polite"
      className={`fixed bottom-5 left-5 z-50 transition-all duration-500 ease-out ${
        visible
          ? "translate-x-0 opacity-100"
          : "-translate-x-[130%] opacity-0 pointer-events-none"
      }`}
      data-testid="toast-social-proof"
    >
      <div className="flex items-start gap-3 bg-white rounded-xl shadow-xl ring-1 ring-black/5 pl-3 pr-2.5 py-3 w-[19rem] max-w-[calc(100vw-2.5rem)]">
        <div className="w-10 h-10 rounded-full bg-[#0065FF] text-white flex items-center justify-center font-semibold shrink-0">
          {name.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <p
            className="text-sm font-semibold text-[#0A2E76] leading-tight truncate"
            data-testid="text-social-proof-name"
          >
            {name}
          </p>
          <p className="text-xs text-[hsl(215,15%,45%)] leading-snug mt-0.5">
            Acabou de adquirir a{" "}
            <span className="font-semibold text-[#0A2E76]">
              Psicometria Online Academy
            </span>
          </p>
          <div className="flex items-center gap-1 mt-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-500" strokeWidth={3} />
            <span className="text-[11px] text-emerald-600 font-medium">
              compra verificada
            </span>
          </div>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="text-[hsl(215,15%,65%)] hover:text-[hsl(215,15%,40%)] transition-colors shrink-0"
          data-testid="button-close-social-proof"
          aria-label="Fechar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
