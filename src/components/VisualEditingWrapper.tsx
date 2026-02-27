"use client";

import { VisualEditing } from "@sanity/visual-editing/react";
import React from "react";

const VisualEditingComponent = VisualEditing as React.ComponentType<{
  portal: boolean;
}>;

export function VisualEditingWrapper() {
  return <VisualEditingComponent portal={false} />;
}
