/** A decoder for a specific method, that is a specific character encoding, like utf-8, iso-8859-2, koi8, cp1261, gbk, etc. A decoder takes a stream of bytes as input and emits a stream of code points. */
interface TextDecoder extends TextDecoderCommon {
  /**
   * Returns the result of running encoding's decoder. The method can be invoked zero or more times with options's stream set to true, and then once without options's stream (or set to false), to process a fragmented input. If the invocation without options's stream (or set to false) has no input, it's clearest to omit both arguments.
   *
   * ```
   * var string = "", decoder = new TextDecoder(encoding), buffer;
   * while(buffer = next_chunk()) {
   *   string += decoder.decode(buffer, {stream:true});
   * }
   * string += decoder.decode(); // end-of-queue
   * ```
   *
   * If the error mode is "fatal" and encoding's decoder returns error, throws a TypeError.
   */
  decode(input?: BufferSource, options?: TextDecodeOptions): string
}

declare var TextDecoder: {
  prototype: TextDecoder
  new (label?: TextDecoderEncodings, options?: TextDecoderOptions): TextDecoder
}

interface TextDecoderCommon {
  /**
   * Returns encoding's name, lowercased.
   */
  readonly encoding: string
  /**
   * Returns true if error mode is "fatal", otherwise false.
   */
  readonly fatal: boolean
  /**
   * Returns the value of ignore BOM.
   */
  readonly ignoreBOM: boolean
}

interface TextDecodeOptions {
  stream?: boolean
}

interface TextDecoderOptions {
  fatal?: boolean
  ignoreBOM?: boolean
}

/** TextEncoder takes a stream of code points as input and emits a stream of bytes. **/
interface TextEncoder extends TextEncoderCommon {
  /**
   * Returns the result of running UTF-8's encoder.
   */
  encode(input?: string): Uint8Array
  /**
   * Runs the UTF-8 encoder on source, stores the result of that operation into destination, and returns the progress made as an object wherein read is the number of converted code units of source and written is the number of bytes modified in destination.
   */
  encodeInto(source: string, destination: Uint8Array): TextEncoderEncodeIntoResult
}

declare var TextEncoder: {
  prototype: TextEncoder
  new (): TextEncoder
}

interface TextEncoderCommon {
  /**
   * Returns "utf-8".
   */
  readonly encoding: TextEncoderEncoding
}

interface TextEncoderEncodeIntoResult {
  read?: number
  written?: number
}

type TextDecoderEncodings = 'utf-8'
type TextEncoderEncoding = 'utf-8'
