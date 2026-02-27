import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className = "", size = 32 }: LogoProps) {
  // A stylized ship's helm with 7 spokes and a keyhole in the center
  const spokes = 7;
  const centerX = 50;
  const centerY = 50;
  const innerRingRadius = 24;
  const outerRingRadius = 36;
  const spokeLength = 48;

  return (
    <Link to="/" className="inline-block">
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className} cursor-pointer`}
        whileHover="hover"
        initial="initial"
      >
        {/* Outer definition stroke */}
        <circle cx={centerX} cy={centerY} r="49" stroke="var(--color-fortuna-grey)" strokeWidth="0.25" opacity="0.5" />

        {/* Background Decorative Elements (Subtle) */}
        <circle cx={centerX} cy={centerY} r="46" stroke="var(--color-fortuna-grey)" strokeWidth="0.5" strokeDasharray="1 3" opacity="0.3" />
        <circle cx={centerX} cy={centerY} r="42" stroke="var(--color-fortuna-grey)" strokeWidth="0.5" opacity="0.1" />

        {/* Main Helm Group - Rotates on hover */}
        <motion.g
          variants={{
            hover: { rotate: 360 }
          }}
          transition={{ 
            type: "spring", 
            stiffness: 60, 
            damping: 15,
            duration: 2.5
          }}
          style={{ originX: "50px", originY: "50px" }}
        >
          {/* 7 Spokes - Bold and Rounded ends */}
          {Array.from({ length: spokes }).map((_, i) => {
            const angle = (i * 360) / spokes - 90;
            const x2 = centerX + spokeLength * Math.cos((angle * Math.PI) / 180);
            const y2 = centerY + spokeLength * Math.sin((angle * Math.PI) / 180);
            
            return (
              <line
                key={i}
                x1={centerX}
                y1={centerY}
                x2={x2}
                y2={y2}
                stroke="var(--color-fortuna-pink-dark)"
                strokeWidth="9"
                strokeLinecap="round"
              />
            );
          })}

          {/* Outer Ring - Thick and bold */}
          <circle
            cx={centerX}
            cy={centerY}
            r={outerRingRadius}
            stroke="var(--color-fortuna-grey)"
            strokeWidth="8"
            fill="none"
          />

          {/* Inner Ring - Slightly thinner but prominent */}
          <circle
            cx={centerX}
            cy={centerY}
            r={innerRingRadius}
            stroke="var(--color-fortuna-pink-dark)"
            strokeWidth="6"
            fill="none"
          />

          {/* Center Hub - Solid circle */}
          <circle cx={centerX} cy={centerY} r="14" fill="var(--color-fortuna-grey)" />
        </motion.g>
        
        {/* Keyhole Symbol - Pulses on hover */}
        <motion.g
          variants={{
            hover: { 
              scale: [1, 1.2, 1],
              transition: {
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut"
              }
            }
          }}
          style={{ originX: "50px", originY: "50px" }}
        >
          {/* Keyhole - Circle + Trapezoid with refined proportions */}
          <circle cx={centerX} cy={centerY - 3} r="4" fill="#050505" />
          <path
            d="M46.5 52L44.5 64H55.5L53.5 52H46.5Z"
            fill="#050505"
          />
        </motion.g>
      </motion.svg>
    </Link>
  );
}
