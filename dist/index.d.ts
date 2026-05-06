/**
 * Options for romanization
 */
export interface RomanizeOptions {
  /**
   * The romanization method to use.
   * 'RR' - Revised Romanization of Korean (Default)
   * 'MR' - McCune-Reischauer
   * 'RRT' - Revised Romanization Transliteration
   * @default 'RR'
   */
  method?: 'RR' | 'MR' | 'RRT' | string;

  /**
   * Whether to include hyphens between syllables.
   * @default false (except for RRT which defaults to true)
   */
  hyphenate?: boolean;

  /**
   * Whether to return ruby annotation objects.
   * @default false
   */
  ruby?: boolean;

  /**
   * A dictionary of custom romanization overrides.
   * Key is the Hangul word, value is the custom romanization.
   */
  overrides?: Record<string, string> | Map<string, string>;

  /**
   * Whether to identify and romanize Hanja (Chinese characters).
   * @default false
   */
  hanja?: boolean;

  /**
   * Whether to apply South Korean Initial Sound Rule (Dueum Beopchik) during Hanja conversion.
   * @default true
   */
  initialSoundRule?: boolean;
}

/**
 * A ruby annotation object
 */
export interface RubyResult {
  text: string;
  ruby: string;
}

/**
 * Transforms a given string by replacing each Hangul character-containing substring with romaja.
 *
 * @param text The string containing Hangul to romanize.
 * @param options Romanization options.
 */
export function romanize(
  text: string,
  options?: RomanizeOptions & { ruby?: false }
): string;
export function romanize(
  text: string,
  options: RomanizeOptions & { ruby: true }
): Array<string | RubyResult>;
export function romanize(
  text: string,
  options?: RomanizeOptions
): string | Array<string | RubyResult>;

/**
 * Transforms a single Hangul word into its Roman equivalent.
 *
 * @param word The Hangul word to romanize.
 * @param options Romanization options.
 */
export function romanizeWord(word: string, options?: RomanizeOptions): string;

/**
 * Converts Hanja characters in a string to their Hangul equivalents.
 *
 * @param text The string containing Hanja.
 * @param options Hanja conversion options.
 */
export function hanjaToHangul(
  text: string,
  options?: { initialSoundRule?: boolean }
): string;
