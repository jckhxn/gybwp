import React from "react";
import {
  useCurrentFrame,
  interpolate,
  Easing,
} from "remotion";

export interface ZoomWrapperProps {
  children: React.ReactNode;
  startFrame: number;
  endFrame: number;
  zoomScale?: number;
  className?: string;
  style?: React.CSSProperties;
  transformOriginX?: number;
  transformOriginY?: number;
}

export const ZoomWrapper: React.FC<ZoomWrapperProps> = ({
  children,
  startFrame,
  endFrame,
  zoomScale = 1.3,
  className = "",
  style = {},
  transformOriginX,
  transformOriginY,
}) => {
  const frame = useCurrentFrame();
  
  const totalDuration = endFrame - startFrame;
  const zoomInDuration = Math.floor(totalDuration * 0.3); // 30% for zoom in
  const holdDuration = Math.floor(totalDuration * 0.4); // 40% for hold
  const zoomOutDuration = totalDuration - zoomInDuration - holdDuration; // 30% for zoom out
  
  const zoomInEnd = startFrame + zoomInDuration;
  const holdEnd = zoomInEnd + holdDuration;
  
  // Scale animation with three phases: zoom in, hold, zoom out
  const scale = interpolate(
    frame,
    [
      startFrame,
      zoomInEnd,
      holdEnd,
      endFrame,
    ],
    [
      1,
      zoomScale,
      zoomScale,
      1,
    ],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  // Subtle shadow intensity during zoom
  const shadowIntensity = interpolate(
    frame,
    [startFrame, zoomInEnd, holdEnd, endFrame],
    [0.1, 0.3, 0.3, 0.1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Transform origin - use custom coordinates if provided, otherwise center
  const transformOrigin = transformOriginX !== undefined && transformOriginY !== undefined
    ? `${transformOriginX}px ${transformOriginY}px`
    : "center center";

  return (
    <div
      className={className}
      style={{
        ...style,
        transform: `scale(${scale})`,
        transformOrigin,
        filter: `drop-shadow(0 10px 25px rgba(0,0,0,${shadowIntensity}))`,
        transition: "none", // Disable CSS transitions to let Remotion handle animation
      }}
    >
      {children}
    </div>
  );
};