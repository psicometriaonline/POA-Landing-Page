import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RegistrationLink } from "@/components/ui/registration-link";
import { useEffect, useRef, useState, useCallback } from "react";
import avatar1 from "@assets/optimized/19_1771128693704.webp";
import avatar2 from "@assets/optimized/36_1771128693705.webp";
import avatar3 from "@assets/optimized/38_1771128693705.webp";
import avatar4 from "@assets/optimized/10_1771128693706.webp";
import avatar5 from "@assets/optimized/11_1771128693706.webp";
import avatar6 from "@assets/optimized/9_1771128693707.webp";
import avatar7 from "@assets/optimized/34_1771128693707.webp";

const avatarImages = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7];

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface BoxRect {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

function NetworkCanvas({ boxRef }: { boxRef: React.RefObject<HTMLDivElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animRef = useRef<number>(0);
  const boxRectRef = useRef<BoxRect>({ left: 0, top: 0, right: 0, bottom: 0 });

  const updateBoxRect = useCallback(() => {
    const canvas = canvasRef.current;
    const box = boxRef.current;
    if (!canvas || !box) return;
    const canvasRect = canvas.getBoundingClientRect();
    const bRect = box.getBoundingClientRect();
    boxRectRef.current = {
      left: bRect.left - canvasRect.left,
      top: bRect.top - canvasRect.top,
      right: bRect.right - canvasRect.left,
      bottom: bRect.bottom - canvasRect.top,
    };
  }, [boxRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      updateBoxRect();
    };

    requestAnimationFrame(resize);

    const w = () => canvas.offsetWidth;
    const h = () => canvas.offsetHeight;
    const nodeCount = 190;
    const connectionDistance = 130;
    const transitionZone = 40;

    if (nodesRef.current.length === 0) {
      nodesRef.current = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * w(),
        y: Math.random() * h(),
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 1,
      }));
    }

    const getNodeBlend = (x: number, y: number): number => {
      const b = boxRectRef.current;
      if (b.right === 0 && b.bottom === 0) return 0;

      const insideX = x >= b.left && x <= b.right;
      const insideY = y >= b.top && y <= b.bottom;

      if (insideX && insideY) {
        const dLeft = x - b.left;
        const dRight = b.right - x;
        const dTop = y - b.top;
        const dBottom = b.bottom - y;
        const minDist = Math.min(dLeft, dRight, dTop, dBottom);
        return Math.min(1, minDist / transitionZone);
      }

      let dx = 0;
      let dy = 0;
      if (x < b.left) dx = b.left - x;
      else if (x > b.right) dx = x - b.right;
      if (y < b.top) dy = b.top - y;
      else if (y > b.bottom) dy = y - b.bottom;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < transitionZone) {
        return Math.max(0, 1 - dist / transitionZone);
      }
      return 0;
    };

    const getColor = (blend: number, baseAlpha: number): string => {
      const r = Math.round(10 + blend * (255 - 10));
      const g = Math.round(46 + blend * (255 - 46));
      const b = Math.round(118 + blend * (255 - 118));
      const alpha = blend > 0 ? baseAlpha * (0.3 + (1 - blend) * 0.7) : baseAlpha;
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    let frameCount = 0;
    const animate = () => {
      const width = w();
      const height = h();
      ctx.clearRect(0, 0, width, height);

      if (frameCount % 30 === 0) updateBoxRect();
      frameCount++;

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
            const midX = (nodes[i].x + nodes[j].x) / 2;
            const midY = (nodes[i].y + nodes[j].y) / 2;
            const blend = getNodeBlend(midX, midY);
            const opacity = (1 - dist / connectionDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = getColor(blend, opacity);
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      for (const node of nodes) {
        const blend = getNodeBlend(node.x, node.y);
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = getColor(blend, 0.3 + blend * 0.4);
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
  }, [updateBoxRect]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 1 }}
    />
  );
}

function GradientBorder() {
  const borderRef = useRef<SVGRectElement>(null);
  const [pathD, setPathD] = useState("");

  useEffect(() => {
    const updatePath = () => {
      const rect = borderRef.current;
      if (!rect) return;
      const svg = rect.closest("svg");
      if (!svg) return;
      const w = svg.clientWidth - 1;
      const h = svg.clientHeight - 1;
      const r = 16;
      const x = 0.5;
      const y = 0.5;
      setPathD(
        `M${x + w / 2},${y} ` +
        `L${x + w - r},${y} Q${x + w},${y} ${x + w},${y + r} ` +
        `L${x + w},${y + h - r} Q${x + w},${y + h} ${x + w - r},${y + h} ` +
        `L${x + r},${y + h} Q${x},${y + h} ${x},${y + h - r} ` +
        `L${x},${y + r} Q${x},${y} ${x + r},${y} Z`
      );
    };
    requestAnimationFrame(updatePath);
    const obs = new ResizeObserver(() => requestAnimationFrame(updatePath));
    const svg = borderRef.current?.closest("svg");
    if (svg) obs.observe(svg);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none rounded-2xl z-30" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full" style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="cta-border-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0065FF" stopOpacity="0.3">
              <animate attributeName="stop-opacity" values="0.3;0.5;0.3" dur="5s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor="#0065FF" stopOpacity="0.5">
              <animate attributeName="stop-opacity" values="0.5;0.3;0.5" dur="5s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#3399FF" stopOpacity="0.4">
              <animate attributeName="stop-opacity" values="0.4;0.6;0.4" dur="5s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
          <radialGradient id="pulse-glow">
            <stop offset="0%" stopColor="#66BBFF" stopOpacity="1" />
            <stop offset="30%" stopColor="#3399FF" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#0065FF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0065FF" stopOpacity="0" />
          </radialGradient>
          {pathD && <path id="cta-border-path" d={pathD} fill="none" />}
        </defs>
        <rect
          ref={borderRef}
          x="0.5" y="0.5"
          rx="16" ry="16"
          fill="none"
          stroke="url(#cta-border-grad)"
          strokeWidth="1.5"
          style={{ width: "calc(100% - 1px)", height: "calc(100% - 1px)" }}
        />
        {pathD && (
          <>
            <circle r="4" fill="url(#pulse-glow)">
              <animateMotion dur="4s" repeatCount="indefinite" rotate="auto">
                <mpath href="#cta-border-path" />
              </animateMotion>
              <animate attributeName="opacity" values="0.9;1;0.9" dur="0.5s" repeatCount="indefinite" />
            </circle>
            <circle r="12" fill="url(#pulse-glow)" opacity="0.3">
              <animateMotion dur="4s" repeatCount="indefinite" rotate="auto">
                <mpath href="#cta-border-path" />
              </animateMotion>
            </circle>
          </>
        )}
      </svg>
    </div>
  );
}

export function CtaSection() {
  const boxRef = useRef<HTMLDivElement>(null);

  return (
    <section
      className="relative overflow-hidden bg-[#F4F5F7]"
      data-testid="section-cta"
    >
      <div className="absolute inset-0 z-20 pointer-events-none">
        <NetworkCanvas boxRef={boxRef} />
      </div>

      <div className="container-narrow py-20 md:py-28 relative z-10">
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center relative z-40 mb-[-1.25rem]"
          >
            <div className="flex items-center">
              <div className="flex -space-x-2.5">
                {avatarImages.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    loading="lazy"
                    className="w-11 h-11 rounded-full border-2 border-[#F4F5F7] object-cover"
                    style={{ animation: `avatarPulse 4s ease-in-out infinite`, animationDelay: `${i * 0.07}s` }}
                    data-testid={`avatar-cta-${i}`}
                  />
                ))}
                <div
                  className="w-11 h-11 rounded-full border-2 border-[#F4F5F7] bg-[#0A2E76] flex items-center justify-center text-white text-[10px] font-bold"
                  style={{ animation: `avatarPulse 4s ease-in-out infinite`, animationDelay: `${7 * 0.07}s` }}
                  data-testid="avatar-cta-count"
                >
                  +6.5K
                </div>
              </div>
            </div>
          </motion.div>

          <div
            ref={boxRef}
            className="relative px-8 md:px-16 pt-16 md:pt-20 pb-14 md:pb-20 rounded-2xl"
            style={{ background: "hsl(213,80%,8%)" }}
          >
            <GradientBorder />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center relative z-30"
            >
              <h2
                className="text-[1.75rem] md:text-display-sm font-heading font-bold text-white"
                data-testid="text-cta-title"
              >
                A Plataforma de <span className="text-[#0065FF]">Pesquisa Quantitativa</span> que vai transformar a sua carreira acadêmica.
              </h2>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-10"
              >
                <RegistrationLink data-testid="button-cta-start">
                  <Button
                    className="bg-white text-[#0A2E76] font-semibold px-8 rounded-full border border-[#0065FF] gap-2 text-base"
                  >
                    Quero a minha vaga
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </RegistrationLink>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CtaSection;
