export function MenuSvg({ color }: { color: string }) {
  return (
    <svg
      width="40"
      height="32"
      viewBox="0 0 40 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="8" y1="7" x2="31.3926" y2="7" stroke={color} stroke-width="2" />
      <line
        x1="8"
        y1="15"
        x2="31.3926"
        y2="15"
        stroke={color}
        stroke-width="2"
      />
      <line
        x1="8"
        y1="23"
        x2="31.3926"
        y2="23"
        stroke={color}
        stroke-width="2"
      />
    </svg>
  );
}
