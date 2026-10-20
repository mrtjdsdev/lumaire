import type { CSSProperties, FunctionComponent } from "react";

export type LetterGlitchProps = {
  /** Up to 8 colors that glitching letters light up in. */
  glitchColors?: string[];
  /** Color of the letters at rest. */
  baseColor?: string;
  /** Characters to draw. Repeat a character to make it appear more often. */
  characters?: string;
  fontFamily?: string;
  /** Size of the letters in pixels. */
  fontSize?: number;
  /** Room around each letter relative to the font size. */
  spacing?: number;
  /** Share of the grid that shows a letter at rest, from 0 to 1. */
  density?: number;
  /** Opacity of the letters at rest, from 0 to 1. */
  baseOpacity?: number;
  /** How often letters glitch, from 0 (never) to 1 (constantly). */
  glitchAmount?: number;
  /** Tempo of the scrambling and glitches. 0 freezes the letters. */
  speed?: number;
  /** Fades glitching letters in and out instead of hard flicker. */
  smooth?: boolean;
  /** Lights up and scrambles the letters near the cursor. */
  interactive?: boolean;
  /** Radius of the area around the cursor that reacts, in pixels. */
  cursorRadius?: number;
  clickEffect?: "tear" | "burst" | "none";
  /** Strength of the soft waves of light drifting across, from 0 to 1. */
  flow?: number;
  /** Fades the letters out toward the edges, from 0 to 0.5. */
  edgeFade?: number;
  /** Clears letters behind the container's middle, from 0 to 1. */
  centerFade?: number;
  /** Boots the letters in with a flicker on mount. */
  intro?: boolean;
  /** Switches the default colors to dark ink for light backgrounds. */
  lightMode?: boolean;
  /** Opaque background behind the letters; unset means transparent. */
  backgroundColor?: string;
  /** Maximum device pixel ratio, capped at 2. */
  dpr?: number;
  className?: string;
  style?: CSSProperties;
};

declare const LetterGlitch: FunctionComponent<LetterGlitchProps>;
export default LetterGlitch;
