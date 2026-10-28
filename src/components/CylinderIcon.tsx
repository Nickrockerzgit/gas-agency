interface Props {
  label: string;
  capacityKg: number;
  className?: string;
}

/** Oxford Blue cylinder with Signal Red collar, scaled by capacity. Replace with approved product photos via products.ts `image`. */
export function CylinderIcon({ label, capacityKg, className = "" }: Props) {
  const bodyH = 90 + capacityKg * 2;
  const bodyW = 62 + capacityKg * 0.5;
  const x = (120 - bodyW) / 2;
  const y0 = 258 - bodyH;
  return (
    <svg viewBox="0 0 120 280" className={className} role="img" aria-label={`${label} commercial LPG cylinder illustration`}>
      <rect x="38" y={y0 - 42} width="44" height="24" rx="4" fill="none" stroke="#002147" strokeWidth="4" />
      <rect x="52" y={y0 - 36} width="16" height="12" fill="#b38f00" />
      <path d={`M${x} ${y0 - 14} Q60 ${y0 - 26} ${x + bodyW} ${y0 - 14} L${x + bodyW} ${y0 + 4} Q60 ${y0 - 4} ${x} ${y0 + 4} Z`} fill="#c8102e" />
      <rect x={x} y={y0} width={bodyW} height={bodyH} rx="8" fill="#002147" />
      <text x="60" y={y0 + 34} textAnchor="middle" fontSize="9" fontWeight="800" letterSpacing="1" fill="#fff" fillOpacity="0.85">
        COMMERCIAL
      </text>
      <text x="60" y={y0 + 54} textAnchor="middle" fontSize="17" fontWeight="800" fill="#fff">
        {label.toUpperCase()}
      </text>
      <rect x={x + 5} y="258" width={bodyW - 10} height="14" rx="3" fill="#001630" />
    </svg>
  );
}
