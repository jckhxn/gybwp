import React from "react";
import { useCurrentFrame } from "remotion";
import { ZoomWrapper } from "./ZoomWrapper";
import { MouseCursor } from "./MouseCursor";

export interface InteractiveDemoProps {
  children: React.ReactNode;
  startFrame: number;
  totalDuration?: number;
  zoomScale?: number;
  cursorX: number;
  cursorY: number;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
}

export const InteractiveDemo: React.FC<InteractiveDemoProps> = ({
  children,
  startFrame,
  totalDuration = 90, // Default 3 seconds at 30fps
  zoomScale = 1.25,
  cursorX,
  cursorY,
  className = "",
  style = {},
  disabled = false,
}) => {
  const frame = useCurrentFrame();
  
  if (disabled) {
    return <div className={className} style={style}>{children}</div>;
  }
  
  const endFrame = startFrame + totalDuration;
  
  // Animation phases breakdown:
  // Phase 1: Zoom in (frames 0-30)
  // Phase 2: Cursor appears (frames 25-40) 
  // Phase 3: Cursor movement (frames 40-55)
  // Phase 4: Click animation (frames 55-75)
  // Phase 5: Zoom out (frames 65-90)
  
  const cursorStartFrame = startFrame + 25;
  const cursorEndFrame = endFrame - 15;
  const clickFrame = startFrame + 55;
  
  // Only show cursor during the middle phases
  const showCursor = frame >= cursorStartFrame && frame <= cursorEndFrame;
  
  return (
    <div style={{ position: "relative" }}>
      <ZoomWrapper
        startFrame={startFrame}
        endFrame={endFrame}
        zoomScale={zoomScale}
        className={className}
        style={style}
        transformOriginX={cursorX}
        transformOriginY={cursorY}
      >
        {children}
      </ZoomWrapper>
      
      <MouseCursor
        startFrame={cursorStartFrame}
        endFrame={cursorEndFrame}
        x={cursorX}
        y={cursorY}
        clickFrame={clickFrame}
        visible={showCursor}
      />
    </div>
  );
};