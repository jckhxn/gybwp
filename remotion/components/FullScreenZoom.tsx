import React from "react";
import {
  useCurrentFrame,
  interpolate,
  Easing,
  useVideoConfig,
} from "remotion";

export interface FullScreenZoomProps {
  children: React.ReactNode;
  startFrame: number;
  endFrame: number;
  targetX: number; // Target component's center X coordinate
  targetY: number; // Target component's center Y coordinate
  zoomScale?: number;
  disabled?: boolean;
}

export const FullScreenZoom: React.FC<FullScreenZoomProps> = ({
  children,
  startFrame,
  endFrame,
  targetX,
  targetY,
  zoomScale = 2.5,
  disabled = false,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  
  if (disabled) {
    return <>{children}</>;
  }
  
  const totalDuration = endFrame - startFrame;
  const zoomInDuration = Math.floor(totalDuration * 0.4); // 40% for zoom in (more gradual)
  const holdDuration = Math.floor(totalDuration * 0.25); // 25% for hold 
  const zoomOutDuration = totalDuration - zoomInDuration - holdDuration; // 35% for zoom out
  
  const zoomInEnd = startFrame + zoomInDuration;
  const holdEnd = zoomInEnd + holdDuration;
  
  // Enhanced scale animation with custom easing for each phase
  const scale = interpolate(
    frame,
    [startFrame, zoomInEnd, holdEnd, endFrame],
    [1, zoomScale, zoomScale, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.25, 0.46, 0.45, 0.94), // Smooth custom easing curve
    }
  );

  // Calculate translation to center the target point
  // When we zoom in, we need to translate so the target point stays in the center
  const centerX = width / 2;
  const centerY = height / 2;
  
  // Enhanced translation with matching easing curve
  const translateX = interpolate(
    frame,
    [startFrame, zoomInEnd, holdEnd, endFrame],
    [0, (centerX - targetX) * (zoomScale - 1), (centerX - targetX) * (zoomScale - 1), 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.25, 0.46, 0.45, 0.94), // Match scale easing
    }
  );

  const translateY = interpolate(
    frame,
    [startFrame, zoomInEnd, holdEnd, endFrame],
    [0, (centerY - targetY) * (zoomScale - 1), (centerY - targetY) * (zoomScale - 1), 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.25, 0.46, 0.45, 0.94), // Match scale easing
    }
  );

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
        transformOrigin: 'center center',
      }}
    >
      {children}
    </div>
  );
};