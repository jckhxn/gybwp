import Image from "next/image";

interface MaintenancePageProps {
  title?: string;
  message?: string;
}

export default function MaintenancePage({
  title = "We'll Be Right Back",
  message = "We're making some improvements to bring you a better experience. Check back soon.",
}: MaintenancePageProps) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden"
      style={{ background: "#0A0F1C" }}
    >
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Top-left amber glow */}
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #F59E0B 0%, transparent 70%)",
          }}
        />
        {/* Bottom-right sky glow */}
        <div
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #0EA5E9 0%, transparent 70%)",
          }}
        />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Card */}
      <div
        className="relative z-10 flex flex-col items-center max-w-lg w-full rounded-3xl px-10 py-14"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(24px)",
          boxShadow:
            "0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/images/logo.webp"
            alt="Growing Your Business With People"
            width={72}
            height={72}
            priority
            className="rounded-full mx-auto"
            style={{
              boxShadow: "0 0 32px rgba(245,158,11,0.25)",
            }}
          />
        </div>

        {/* Status badge */}
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 text-xs font-semibold tracking-widest uppercase"
          style={{
            background: "rgba(245,158,11,0.12)",
            border: "1px solid rgba(245,158,11,0.3)",
            color: "#F59E0B",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: "#F59E0B",
              boxShadow: "0 0 6px #F59E0B",
            }}
          />
          Scheduled Maintenance
        </div>

        {/* Heading */}
        <h1
          className="text-4xl font-bold tracking-tight mb-4 leading-tight"
          style={{
            color: "#F8FAFC",
            textShadow: "0 1px 2px rgba(0,0,0,0.4)",
          }}
        >
          {title}
        </h1>

        {/* Divider */}
        <div
          className="w-12 h-px mb-6 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, #F59E0B, transparent)",
          }}
        />

        {/* Message */}
        <p className="text-base leading-relaxed" style={{ color: "#94A3B8" }}>
          {message}
        </p>
      </div>

      {/* Footer */}
      <p
        className="relative z-10 mt-10 text-xs tracking-wide"
        style={{ color: "#475569" }}
      >
        &copy; {new Date().getFullYear()} Growing Your Business With People
      </p>
    </div>
  );
}
