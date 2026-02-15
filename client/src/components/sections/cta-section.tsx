import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

const avatarColors = [
  "bg-blue-500", "bg-emerald-500", "bg-amber-500",
  "bg-purple-500", "bg-rose-500", "bg-cyan-500",
];
const avatarInitials = ["MR", "LS", "AC", "JP", "RF", "TC"];

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();

    const w = () => canvas.offsetWidth;
    const h = () => canvas.offsetHeight;
    const nodeCount = 35;
    const connectionDistance = 160;

    if (nodesRef.current.length === 0) {
      nodesRef.current = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * w(),
        y: Math.random() * h(),
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 1,
      }));
    }

    const animate = () => {
      const width = w();
      const height = h();
      ctx.clearRect(0, 0, width, height);

      const nodes = nodesRef.current;
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
        node.x = Math.max(0, Math.min(width, node.x));
        node.y = Math.max(0, Math.min(height, node.y));
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDistance) {
            const opacity = (1 - dist / connectionDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0, 101, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 101, 255, 0.3)";
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    const onResize = () => {
      resize();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 1 }}
    />
  );
}

function GradientBorder() {
  return (
    <div className="absolute inset-0 pointer-events-none rounded-2xl" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full" style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="cta-border-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0A2E76">
              <animate attributeName="stop-color" values="#0A2E76;#0065FF;#3399FF;#0065FF;#0A2E76" dur="5s" repeatCount="indefinite" />
            </stop>
            <stop offset="33%" stopColor="#0065FF">
              <animate attributeName="stop-color" values="#0065FF;#3399FF;#0A2E76;#3399FF;#0065FF" dur="5s" repeatCount="indefinite" />
            </stop>
            <stop offset="66%" stopColor="#3399FF">
              <animate attributeName="stop-color" values="#3399FF;#0A2E76;#0065FF;#0A2E76;#3399FF" dur="5s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#0065FF">
              <animate attributeName="stop-color" values="#0065FF;#0A2E76;#3399FF;#0065FF;#0A2E76" dur="5s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
        </defs>
        <rect
          x="0.5" y="0.5"
          rx="16" ry="16"
          fill="none"
          stroke="url(#cta-border-grad)"
          strokeWidth="1"
          style={{ width: "calc(100% - 1px)", height: "calc(100% - 1px)" }}
        />
      </svg>
    </div>
  );
}

export function CtaSection() {
  return (
    <section
      className="relative overflow-hidden bg-[hsl(213,80%,8%)]"
      data-testid="section-cta"
    >
      <div className="absolute inset-0">
        <NetworkCanvas />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#0065FF]/10 via-transparent to-[#0065FF]/5 pointer-events-none" />

      <div className="container-narrow py-20 md:py-28 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-10"
        >
          <div className="flex items-center">
            <div className="flex -space-x-3">
              {avatarInitials.map((initials, i) => (
                <div
                  key={i}
                  className={`w-10 h-10 rounded-full ${avatarColors[i]} border-2 border-[hsl(213,80%,8%)] flex items-center justify-center text-white text-xs font-bold`}
                  data-testid={`avatar-cta-${i}`}
                >
                  {initials}
                </div>
              ))}
            </div>
            <div className="ml-2 bg-white/15 backdrop-blur-sm text-white text-xs font-bold rounded-full px-3 py-2 border border-white/20">
              +2.5K
            </div>
          </div>
        </motion.div>

        <div className="relative max-w-4xl mx-auto px-8 md:px-16 py-14 md:py-20">
          <GradientBorder />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight tracking-tight"
              data-testid="text-cta-title"
            >
              A Plataforma de Pesquisa Quantitativa que vai transformar a sua carreira acadêmica.
            </h2>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10"
            >
              <a
                href="https://psicometriaonline.com.br/academy/"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-cta-start"
              >
                <Button
                  className="bg-white text-[#0A2E76] font-semibold px-8 rounded-full border border-white/80 gap-2 text-base"
                >
                  Começar
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
