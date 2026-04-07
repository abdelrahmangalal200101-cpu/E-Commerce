import React from "react";

export interface Slide {
  image: string;
  alt?: string;
  content?: React.ReactNode;
}

export interface SliderProps {
  slides: Slide[];
  height?: number;
  overlay?: string;
  className?: string;
  prevIcon?: React.ReactNode;
  nextIcon?: React.ReactNode;
  content?: React.ReactNode;
}
