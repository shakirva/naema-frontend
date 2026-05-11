const DateSticker = ({ size = 220 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 680 680"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <path id="topArc" d="M 340,340 m -218,0 a 218,218 0 1,1 436,0" />
       <path id="bottomArc" d="M 340,340 m -228,0 a 228,228 0 0,0 456,0" />
      </defs>

      {/* Outer gold circle */}
      <circle cx="340" cy="340" r="270" fill="#d4caa2" />

      {/* Navy ring */}
      <circle
        cx="340"
        cy="340"
        r="250"
        fill="none"
        stroke="#0f1f3d"
        strokeWidth="3"
      />

      {/* Inner navy circle */}
      <circle cx="340" cy="340" r="195" fill="#0f1f3d" />

      {/* Dashed inner border */}

      {/* Top curved text */}
      <text
        fontFamily="Georgia, serif"
        fontSize="30"
        fontWeight="700"
        fill="#0f1f3d"
        letterSpacing="2"
      >
        <textPath href="#topArc" startOffset="8%">
          FROM ORCHARD TO YOUR DOOR
        </textPath>
      </text>

      {/* Bottom curved text */}
      <text
        fontFamily="Georgia, serif"
        fontSize="22"
        fontWeight="600"
        fill="#0f1f3d"
        letterSpacing="5"
      >
        <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">
          ✦ NATURALLY SOURCED ✦ INDIA
        </textPath>
      </text>

      {/* Brand name */}
      <text
        x="340"
        y="345"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="48"
        fontWeight="700"
        fill="#ccba78"
        letterSpacing="6"
      >
        NAEMA
      </text>

      {/* Tagline */}
      <text
        x="340"
        y="378"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="14"
        fill="#ccba78"
        letterSpacing="3"
        fontStyle="italic"
      >
        Premium Dates
      </text>

      {/* Divider */}
      <line
        x1="275"
        y1="390"
        x2="310"
        y2="390"
        stroke="#ccba78"
        strokeWidth="1"
      />
      <circle cx="340" cy="390" r="3" fill="#ccba78" />
      <line
        x1="370"
        y1="390"
        x2="405"
        y2="390"
        stroke="#ccba78"
        strokeWidth="1"
      />

      {/* Est. */}
      <text
        x="340"
        y="415"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="13"
        fill="#ccba78"
        letterSpacing="4"
      >
        EST. 2024
      </text>
    </svg>
  );
};

export default DateSticker;
