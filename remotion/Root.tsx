import React from "react";
import { Composition } from "remotion";
import { IntroVideo } from "./compositions/IntroVideo";
import "./styles.css";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="IntroVideo"
        component={IntroVideo}
        durationInFrames={1350} // 45 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "Growing Your Business With People",
          subtitle: "Where Leadership Meets Excellence"
        }}
      />
    </>
  );
};