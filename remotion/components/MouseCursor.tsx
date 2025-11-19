import React from "react";
import {
  useCurrentFrame,
  interpolate,
  Easing,
} from "remotion";

export interface MouseCursorProps {
  startFrame: number;
  endFrame: number;
  x: number;
  y: number;
  clickFrame?: number;
  visible?: boolean;
}

export const MouseCursor: React.FC<MouseCursorProps> = ({
  startFrame,
  endFrame,
  x,
  y,
  clickFrame,
  visible = true,
}) => {
  const frame = useCurrentFrame();

  // Debug logging for cursor visibility and positioning
  React.useEffect(() => {
    console.log('🖱️ MouseCursor Debug:', {
      frame,
      startFrame,
      endFrame,
      x,
      y,
      clickFrame,
      visible,
      shouldShow: frame >= startFrame && frame <= endFrame,
    });
  }, [frame, startFrame, endFrame, x, y, clickFrame, visible]);

  if (!visible) return null;

  // Enhanced cursor opacity animation
  const opacity = interpolate(
    frame,
    [startFrame, startFrame + 20, endFrame - 20, endFrame],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.25, 0.46, 0.45, 0.94), // Smooth custom easing
    }
  );

  // Enhanced cursor movement animation (more natural)
  const offsetX = interpolate(
    frame,
    [startFrame, endFrame],
    [0, 5],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
    }
  );

  const offsetY = interpolate(
    frame,
    [startFrame, endFrame],
    [0, -2],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
    }
  );

  // Enhanced click animation scale
  const clickScale = clickFrame
    ? interpolate(
        frame,
        [clickFrame, clickFrame + 4, clickFrame + 12],
        [1, 0.85, 1],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.68, -0.55, 0.265, 1.55), // Bouncy click effect
        }
      )
    : 1;

  // Enhanced click ripple effect
  const rippleOpacity = clickFrame
    ? interpolate(
        frame,
        [clickFrame, clickFrame + 25],
        [0.9, 0],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        }
      )
    : 0;

  const rippleScale = clickFrame
    ? interpolate(
        frame,
        [clickFrame, clickFrame + 25],
        [0.3, 2.5],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
        }
      )
    : 0;

  return (
    <div
      style={{
        position: "absolute",
        left: x + offsetX,
        top: y + offsetY,
        opacity,
        transform: `scale(${clickScale})`,
        pointerEvents: "none",
        zIndex: 1000,
      }}
    >
      {/* Click ripple effect */}
      {clickFrame && (
        <div
          style={{
            position: "absolute",
            left: -10,
            top: -10,
            width: 20,
            height: 20,
            borderRadius: "50%",
            border: "2px solid rgba(255, 255, 255, 0.6)",
            opacity: rippleOpacity,
            transform: `scale(${rippleScale})`,
            transformOrigin: "center",
          }}
        />
      )}

      {/* Mouse cursor SVG */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        style={{
          filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.5))",
        }}
      >
        {/* Cursor shadow */}
        <path
          d="M5.5 4.5L19.5 18.5L14.5 19.5L11.5 15.5L9.5 17.5L5.5 4.5Z"
          fill="rgba(0,0,0,0.3)"
          transform="translate(1,1)"
        />
        
        {/* Main cursor */}
        <path
          d="M4 3L18 17L13 18L10 14L8 16L4 3Z"
          fill="white"
          stroke="black"
          strokeWidth="1"
        />
        
        {/* Cursor highlight */}
        <path
          d="M5 4L16 15L12 16L10 13L8 15L5 4Z"
          fill="rgba(255,255,255,0.9)"
        />
      </svg>
    </div>
  );
};