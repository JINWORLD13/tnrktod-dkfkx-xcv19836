import React from 'react';
const GiftBoxIcon = ({
  size = 24,
  color = '#8B5CF6',
  ribbonColor = '#EC4899',
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http:
      className={className}
    >
      {}
      <rect
        x="4"
        y="10"
        width="16"
        height="10"
        rx="1"
        fill={color}
        stroke={color}
        strokeWidth="1"
      />
      {}
      <rect
        x="3"
        y="8"
        width="18"
        height="3"
        rx="1"
        fill={color}
        stroke={color}
        strokeWidth="1"
      />
      {}
      <rect x="11" y="8" width="2" height="12" fill={ribbonColor} />
      {}
      <rect x="3" y="11" width="18" height="2" fill={ribbonColor} />
      {}
      <ellipse
        cx="9"
        cy="6"
        rx="2.5"
        ry="1.5"
        fill={ribbonColor}
        transform="rotate(-15 9 6)"
      />
      {}
      <ellipse
        cx="15"
        cy="6"
        rx="2.5"
        ry="1.5"
        fill={ribbonColor}
        transform="rotate(15 15 6)"
      />
      {}
      <circle cx="12" cy="6.5" r="1" fill={ribbonColor} />
      {}
      <circle cx="7" cy="14" r="0.5" fill="white" opacity="0.8" />
      <circle cx="16" cy="16" r="0.3" fill="white" opacity="0.6" />
    </svg>
  );
};
export default GiftBoxIcon;
{}
{}  {}
{}  {}
{}  {}
{}  {}
{}  {}
{}  {}
{}  {}
{}  {}
{}  {}
{}  {}
