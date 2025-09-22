import styles from '../../styles/scss/_RankBadge.module.scss';
export const RankBadge = ({ userInfo, ...props }) => {
  if (!userInfo?.isRanked || !Object.values(userInfo?.isRanked)?.includes(true))
    return null;
  return (
    <RankBadgeMark
      className={props?.className}
      size={props?.size}
      whichRank={
        Object.entries(userInfo.isRanked).find(
          ([key, value]) => value === true
        )?.[0]
      }
    >
      {props?.children ||
        Object.entries(userInfo.isRanked).find(
          ([key, value]) => value === true
        )?.[0]}
    </RankBadgeMark>
  );
};
export const RankBadgeMark = ({ whichRank, size, className, children }) => {
  const getIcon = () => {
    switch (whichRank) {
      case 'VIP':
        return <Crown size={size || 22} />;
      case 'COSMOS':
        return <Meteor size={size || 22} />;
      case 'STAR':
        return <Star size={size || 22} />;
      case 'NEW':
        return <Hat size={size || 22} />;
      default:
        return <Hat size={size || 22} />;
    }
  };
  return (
    <span
      className={`${styles.badge} ${styles['badge-position']} ${
        whichRank && styles[`${whichRank}`]
      } ${className || ''}`}
    >
      {getIcon()}
      {children || whichRank || 'NEW'}
    </span>
  );
};
const Crown = ({ size = 22, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7" />
    <path d="M5 20h14" /> {}
  </svg>
);
const Star = ({ size = 22, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon
      points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"
      fill="#f39c12" 
    >
      <animate
        attributeName="fill"
        values="#f1c40f;yellow;#f1c40f" 
        dur="1.5s" 
        repeatCount="indefinite" 
      />
      <animate
        attributeName="opacity"
        values="0.7;1;0.7" 
        dur="1.5s"
        repeatCount="indefinite"
      />
    </polygon>
  </svg>
);
const Hat = ({ size = 22, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {}
    <ellipse cx="12" cy="18" rx="11" ry="6" />
    {}
    <path d="M12 2L6 18H18L12 2Z" />
    {}
    <rect x="8" y="14" width="8" height="2" />
    {}
    <rect x="10" y="13" width="4" height="4" fill="none" strokeWidth="1" />
  </svg>
);
const Meteor = ({ size = 22, color = 'gold' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {}
    <defs>
      <radialGradient id="glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" style={{ stopColor: color, stopOpacity: 0.9 }} />
        <stop offset="70%" style={{ stopColor: color, stopOpacity: 0.3 }} />
        <stop offset="100%" style={{ stopColor: color, stopOpacity: 0 }} />
      </radialGradient>
    </defs>
    {}
    <path d="M22 2L6 18" strokeWidth="3" strokeDasharray="6,6">
      <animate
        attributeName="stroke-dashoffset"
        from="0"
        to="12"
        dur="1s"
        repeatCount="indefinite"
      />
    </path>
    {}
    <path
      d="M22 2L8 20"
      strokeWidth="2.5"
      strokeOpacity="0.9"
      strokeDasharray="5,5"
    >
      <animate
        attributeName="stroke-dashoffset"
        from="0"
        to="10"
        dur="1.2s"
        repeatCount="indefinite"
      />
    </path>
    <path
      d="M22 2L4 16"
      strokeWidth="2"
      strokeOpacity="0.8"
      strokeDasharray="4,4"
    >
      <animate
        attributeName="stroke-dashoffset"
        from="0"
        to="8"
        dur="1.4s"
        repeatCount="indefinite"
      />
    </path>
    <path
      d="M22 2L2 14"
      strokeWidth="1.5"
      strokeOpacity="0.7"
      strokeDasharray="3,3"
    >
      <animate
        attributeName="stroke-dashoffset"
        from="0"
        to="6"
        dur="1.6s"
        repeatCount="indefinite"
      />
    </path>
    <path
      d="M22 2L1 12"
      strokeWidth="1.2"
      strokeOpacity="0.6"
      strokeDasharray="2,2"
    >
      <animate
        attributeName="stroke-dashoffset"
        from="0"
        to="4"
        dur="1.8s"
        repeatCount="indefinite"
      />
    </path>
    <path
      d="M22 2L3 10"
      strokeWidth="1"
      strokeOpacity="0.5"
      strokeDasharray="2,2"
    >
      <animate
        attributeName="stroke-dashoffset"
        from="0"
        to="4"
        dur="2s"
        repeatCount="indefinite"
      />
    </path>
    <path
      d="M22 2L5 8"
      strokeWidth="0.8"
      strokeOpacity="0.4"
      strokeDasharray="1,1"
    >
      <animate
        attributeName="stroke-dashoffset"
        from="0"
        to="2"
        dur="2.2s"
        repeatCount="indefinite"
      />
    </path>
    {}
    <path
      d="M6 18Q7 19 8 20"
      strokeWidth="1"
      strokeOpacity="0.7"
      strokeDasharray="2,2"
    >
      <animate
        attributeName="stroke-dashoffset"
        from="0"
        to="2"
        dur="1s"
        repeatCount="indefinite"
      />
    </path>
    <path
      d="M8 20L9 21"
      strokeWidth="0.8"
      strokeOpacity="0.5"
      strokeDasharray="1,1"
    >
      <animate
        attributeName="stroke-dashoffset"
        from="0"
        to="1"
        dur="1.2s"
        repeatCount="indefinite"
      />
    </path>
    <path
      d="M4 16Q5 17 6 18"
      strokeWidth="1"
      strokeOpacity="0.7"
      strokeDasharray="2,2"
    >
      <animate
        attributeName="stroke-dashoffset"
        from="0"
        to="2"
        dur="1.4s"
        repeatCount="indefinite"
      />
    </path>
    <path
      d="M2 14Q3 15 4 16"
      strokeWidth="0.8"
      strokeOpacity="0.6"
      strokeDasharray="1,1"
    >
      <animate
        attributeName="stroke-dashoffset"
        from="0"
        to="1"
        dur="1.6s"
        repeatCount="indefinite"
      />
    </path>
    <path
      d="M1 12L2 13"
      strokeWidth="0.6"
      strokeOpacity="0.5"
      strokeDasharray="1,1"
    >
      <animate
        attributeName="stroke-dashoffset"
        from="0"
        to="1"
        dur="1.8s"
        repeatCount="indefinite"
      />
    </path>
    {}
    <circle cx="7" cy="15" r="6" fill="url(#glow)" />
    {}
    <circle cx="8" cy="16" r="1.5" fill={color} fillOpacity="0.6">
      <animate
        attributeName="r"
        values="1.5;1;1.5"
        dur="1.5s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);
