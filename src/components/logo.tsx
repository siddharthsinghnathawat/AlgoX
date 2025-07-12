export function Logo({ width = 32, height = 32 }: { width?: number, height?: number }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g>
        <circle cx="50" cy="50" r="50" fill="black" />
        <text 
          x="50" 
          y="60" 
          fontFamily="Arial, sans-serif" 
          fontSize="55" 
          fontWeight="bold" 
          fill="white" 
          textAnchor="middle" 
          dominantBaseline="middle"
        >
          <tspan>A</tspan>
          <tspan 
            dx="-5"
            style={{
              fontStretch: 'condensed',
              transform: 'scaleX(1.2) skewX(-12deg)',
              display: 'inline-block',
            }}
          >
            X
          </tspan>
        </text>
      </g>
    </svg>
  );
}
