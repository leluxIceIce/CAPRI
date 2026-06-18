import { Link } from "react-router-dom";
import {
  Cpu,
  Github,
  ArrowRight,
  UploadCloud,
  Sliders,
  Orbit,
  Activity,
  Mountain,
  Radio,
  Palette,
  Monitor,
  Mail,
  Download,
  Sparkles,
  Code2,
} from "lucide-react";

const APPS = [
  {
    icon: Radio,
    title: "EEF Ecological Encoding Framework",
    description: "Real-time 3D geospatial telemetry dashboard for exploring ocean-color spectral variables.",
    cta: "Launch Dashboard",
    ctaTo: "/dashboard",
    badge: "Web",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: Code2,
    title: "VibeCode Grasshopper Editor",
    description: "Interactive 3D visual programming environment for grasshopper algorithm design and parametric modeling.",
    cta: "Download (macOS arm64)",
    ctaHref: "/downloads/VibeCode.Grasshopper.Editor-0.1.0-arm64.dmg",
    badge: "Desktop",
    color: "from-purple-500 to-pink-500",
  },
];

const STEPS = [
  {
    icon: Orbit,
    title: "Launch the dashboard",
    description: "Open the console to start the synthetic telemetry stream and bring the 3D terrain online.",
  },
  {
    icon: Sliders,
    title: "Configure the stream",
    description: "Tune flow velocity, Gaussian noise, thermal-front anomalies, sensor drift, and refresh rate — or drop in a CSV for recorded playback.",
  },
  {
    icon: Mountain,
    title: "Explore the terrain",
    description: "Orbit, zoom, and adjust layer spacing across the 20×20 multi-layer mesh; toggle any of the seven spectral variables on or off.",
  },
  {
    icon: Activity,
    title: "Read the diagnostics",
    description: "Watch regime classification, tipping-point entropy, spatial-front index, and novelty p-value update live as the signal evolves.",
  },
];

const RESOURCES = [
  {
    icon: Radio,
    title: "Real-time 3D Terrain HUD",
    description: "Seven spectral variables — CHL, aphy, ADG, bbp, TSM, PAR, KD490 — rendered as a 20×20 multi-layer Three.js terrain.",
  },
  {
    icon: Sliders,
    title: "Stream Modulators",
    description: "Live sliders for flow velocity, Gaussian noise, thermal-front anomalies, sensor drift, and stream refresh rate.",
  },
  {
    icon: UploadCloud,
    title: "CSV Playback",
    description: "Drag and drop a 20×20 cell-vector CSV; frames play back and persist across reloads via localStorage.",
  },
  {
    icon: Palette,
    title: "Custom Colormaps",
    description: "Click any gradient strip to set a per-variable hex color; ramps generate live and apply to the 3D heatmap.",
  },
  {
    icon: Cpu,
    title: "Scientific Diagnostics",
    description: "Regime classification, tipping-point entropy, spatial-front index, and a heuristic novelty p-value — illustrative, not a trained model.",
  },
  {
    icon: Monitor,
    title: "macOS Desktop App",
    description: "Package the dashboard as a standalone Electron .dmg for arm64 Macs, no browser required.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#030307] text-[#f8fafc] antialiased selection:bg-white selection:text-black">
      <header className="h-[56px] border-b border-white/5 bg-[#030307]/80 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-lg bg-white flex items-center justify-center font-bold text-black text-sm select-none shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            <Cpu size={16} />
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-black uppercase tracking-wider text-white">EEF</h1>
            <span className="text-white/30 text-xs">|</span>
            <span className="text-[11px] font-mono tracking-widest text-white/90 font-bold bg-white/10 border border-white/10 px-1.5 py-0.5 rounded">
              ECOLOGICAL ENCODING FRAMEWORK
            </span>
          </div>
        </div>
        <Link
          to="/dashboard"
          className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-widest text-white bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg hover:bg-white/15 hover:border-white/20 transition-colors"
        >
          Launch Dashboard <ArrowRight size={12} />
        </Link>
      </header>

      <main className="max-w-[1280px] w-full mx-auto px-4 sm:px-6">
        <section className="py-20 sm:py-28 flex flex-col items-center text-center gap-6">
          <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
            Interactive · Multi-Platform Portal
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white max-w-3xl">
            CAPRI — Multi-Application Platform
          </h1>
          <p className="text-sm sm:text-base text-white/60 max-w-xl leading-relaxed">
            A unified portal for interactive scientific tools and visual programming environments.
            From real-time 3D telemetry dashboards to parametric design editors — all powered by
            cutting-edge visualization and data processing technologies.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
            <a
              href="https://github.com/leluxIceIce/CAPRI"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-white border border-white/20 px-5 py-3 rounded-2xl hover:bg-white/5 hover:border-white/35 transition-colors"
            >
              <Github size={14} /> View on GitHub
            </a>
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="flex items-center gap-2 mb-8">
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">00</span>
            <h2 className="text-xs font-bold uppercase tracking-widest text-white">Featured Applications</h2>
            <div className="flex-1 h-px bg-white/5" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {APPS.map((app) => {
              const Icon = app.icon;
              return (
                <div
                  key={app.title}
                  className="group glass-panel rounded-3xl overflow-hidden flex flex-col gap-6 p-8 relative border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className={`absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-r ${app.color} opacity-5 blur-3xl rounded-full group-hover:opacity-10 transition-opacity`} />

                  <div className="relative z-10 flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 flex-shrink-0">
                        <Icon size={24} />
                      </div>
                      <div className="text-left flex-1">
                        <h3 className="text-lg font-bold text-white mb-1">{app.title}</h3>
                        <span className={`text-[9px] font-mono font-bold uppercase tracking-widest text-white/40 bg-white/5 border border-white/10 px-2 py-1 rounded inline-block`}>
                          {app.badge}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-white/60 leading-relaxed relative z-10">{app.description}</p>

                  <div className="relative z-10 mt-auto">
                    {app.ctaTo ? (
                      <Link
                        to={app.ctaTo}
                        className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-black bg-white px-5 py-3 rounded-xl hover:bg-white/90 transition-all group/btn"
                      >
                        {app.cta} <ArrowRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform" />
                      </Link>
                    ) : (
                      <a
                        href={app.ctaHref}
                        className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-black bg-white px-5 py-3 rounded-xl hover:bg-white/90 transition-all group/btn"
                      >
                        <Download size={12} /> {app.cta}
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="flex items-center gap-2 mb-8">
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">01</span>
            <h2 className="text-xs font-bold uppercase tracking-widest text-white">How to use</h2>
            <div className="flex-1 h-px bg-white/5" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="glass-panel glass-panel-hover rounded-2xl p-5 flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70">
                      <Icon size={16} />
                    </div>
                    <span className="text-[10px] font-mono text-white/30 font-bold">
                      STEP {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white">{step.title}</h3>
                  <p className="text-[12px] text-white/50 leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="flex items-center gap-2 mb-8">
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">02</span>
            <h2 className="text-xs font-bold uppercase tracking-widest text-white">Interactive resources</h2>
            <div className="flex-1 h-px bg-white/5" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {RESOURCES.map((resource) => {
              const Icon = resource.icon;
              return (
                <div
                  key={resource.title}
                  className="glass-panel glass-panel-hover rounded-2xl p-5 flex flex-col gap-3"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 pulse-teal-glow">
                    <Icon size={16} />
                  </div>
                  <h3 className="text-sm font-bold text-white">{resource.title}</h3>
                  <p className="text-[12px] text-white/50 leading-relaxed">{resource.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-14 sm:py-24">
          <div className="glass-panel rounded-3xl p-8 sm:p-12 flex flex-col items-center text-center gap-5">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Ready to inspect the cube?
            </h2>
            <p className="text-sm text-white/50 max-w-md">
              Jump straight into the console — the synthetic stream starts running immediately,
              no setup required.
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-black bg-white px-5 py-3 rounded-2xl shadow-[0_0_24px_rgba(255,255,255,0.18)] hover:shadow-[0_0_32px_rgba(255,255,255,0.28)] hover:bg-white/90 transition-all"
            >
              Launch Dashboard <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 text-[10px] text-white/30 font-mono flex flex-col sm:flex-row items-center justify-between gap-2 px-4 sm:px-6 py-4 select-none max-w-[1280px] w-full mx-auto">
        <span>EEF PIPELINE ENGINE · CLIENT-SIDE SPECTRAL RECONSTRUCTION CORE</span>
        <span className="flex items-center gap-1.5">
          <Mail size={11} className="text-white/30" /> iceicefelix@gmail.com
        </span>
      </footer>
    </div>
  );
}
