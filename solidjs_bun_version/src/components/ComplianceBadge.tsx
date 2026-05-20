import type { JSX } from "solid-js";

type ComplianceTile = {
  label: string;
  badge: () => JSX.Element;
};

function IsoBadge() {
  return (
    <svg viewBox="0 0 120 120" class="compliance-tile-svg" aria-hidden="true">
      <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" stroke-width="2" />
      <text x="60" y="52" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor">
        ISO
      </text>
      <text x="60" y="72" text-anchor="middle" font-size="14" font-weight="700" fill="currentColor">
        27001
      </text>
    </svg>
  );
}

function CcpaBadge() {
  return (
    <svg viewBox="0 0 120 120" class="compliance-tile-svg" aria-hidden="true">
      <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" stroke-width="2" />
      <text x="60" y="56" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">
        CCPA
      </text>
      <text x="60" y="74" text-anchor="middle" font-size="10" font-weight="600" fill="currentColor">
        READY
      </text>
    </svg>
  );
}

function GdprBadge() {
  return (
    <svg viewBox="0 0 120 120" class="compliance-tile-svg" aria-hidden="true">
      <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" stroke-width="2" />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x = 60 + 38 * Math.cos(angle - Math.PI / 2);
        const y = 60 + 38 * Math.sin(angle - Math.PI / 2);
        return <circle cx={x} cy={y} r="2.5" fill="currentColor" />;
      })}
      <text x="60" y="66" text-anchor="middle" font-size="16" font-weight="700" fill="currentColor">
        GDPR
      </text>
    </svg>
  );
}

const tiles: ComplianceTile[] = [
  {
    label: "SOC 2",
    badge: () => (
      <img src="/SOC_2.jpeg" alt="SOC 2 Type II Compliant" class="compliance-tile-image" />
    ),
  },
  {
    label: "ISO",
    badge: IsoBadge,
  },
  {
    label: "CCPA",
    badge: CcpaBadge,
  },
  {
    label: "GDPR",
    badge: GdprBadge,
  },
];

export default function ComplianceBadge() {
  return (
    <section class="security-section" aria-labelledby="security-heading">
      <div class="container">
        <div class="pain-grid security-grid reveal-up">
          <div class="reveal-slide">
            <div
              class="font-mono text-gradient"
              style={{ "margin-bottom": "1.5rem", "font-size": "0.875rem", "letter-spacing": "0.05em" }}
            >
              // SECURITY
            </div>
            <h2 id="security-heading" style={{ "margin-bottom": "2rem" }}>
              ENTERPRISE-GRADE <span class="text-gradient">SECURITY</span>
            </h2>
            <p style={{ "font-size": "1.125rem", "margin-bottom": "2rem", "max-width": "36rem" }}>
              Your data is encrypted both in transit and at rest, utilizing robust encryption standards:
              AES-256 for storage and TLS 1.2/1.3 for secure communication.
            </p>
            <a href="/privacy" class="btn">
              LEARN MORE
            </a>
          </div>

          <div class="compliance-grid" role="list">
            {tiles.map((tile) => (
              <div class="compliance-tile" role="listitem">
                <span class="compliance-tile-corner" aria-hidden="true" />
                <span class="compliance-tile-label">{tile.label}</span>
                <div class="compliance-tile-badge">{tile.badge()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
