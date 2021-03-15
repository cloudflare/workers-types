/** This Streams API interface represents a readable stream of byte data. The Fetch API offers a concrete instance of a ReadableStream through the body property of a Response object. */
interface ReadableStream<R = any> {
  readonly locked: boolean
  cancel(reason?: any): Promise<void>
  getReader(opts?: ReadableStreamGetReaderOptions): ReadableStreamReader<R>
  pipeThrough<T>(transform: ReadableWritablePair<T, R>, options?: StreamPipeOptions): ReadableStream<T>
  pipeTo(dest: WritableStream<R>, options?: StreamPipeOptions): Promise<void>
  tee(): [ReadableStream<R>, ReadableStream<R>]
}

interface ReadableStreamBYOBReader {
  read(buffer: ArrayBufferView): Promise<ReadableStreamBYOBReadResult>
  releaseLock(): void
}

interface ReadableStreamBYOBReadResult {
  done: boolean
  value: ArrayBufferView
}

interface ReadableStreamDefaultReader<R = any> extends ReadableStreamGenericReader {
  read(): Promise<ReadableStreamDefaultReadResult<R>>
  releaseLock(): void
}

interface ReadableStreamDefaultReadDoneResult {
  done: true
  value?: undefined
}

interface ReadableStreamDefaultReadValueResult<T> {
  done: false
  value: T
}

interface ReadableStreamGenericReader {
  readonly closed: Promise<undefined>
  cancel(reason?: any): Promise<void>
}

interface ReadableStreamGetReaderOptions {
  mode?: ReadableStreamReaderMode
}

interface ReadableWritablePair<R = any, W = any> {
  readable: ReadableStream<R>
  /**
   * Provides a convenient, chainable way of piping this readable stream through a transform stream (or any other { writable, readable } pair). It simply pipes the stream into the writable side of the supplied pair, and returns the readable side for further use.
   *
   * Piping a stream will lock it for the duration of the pipe, preventing any other consumer from acquiring a reader.
   */
  writable: WritableStream<W>
}

interface StreamPipeOptions {
  preventAbort?: boolean
  preventClose?: boolean
}

interface TransformStream {
  readonly readable: ReadableStream<Uint8Array>
  readonly writable: WritableStream<Uint8Array>
}

declare var TransformStream: {
  prototype: TransformStream
  new (): TransformStream
}

interface WritableStream<W = any> {
  readonly locked: boolean
  abort(reason?: any): Promise<void>
  getWriter(): WritableStreamDefaultWriter<W>
}

/** This Streams API interface is the object returned by WritableStream.getWriter() and once created locks the < writer to the WritableStream ensuring that no other streams can write to the underlying sink. */
interface WritableStreamDefaultWriter<W = any> {
  readonly closed: Promise<undefined>
  readonly desiredSize: number | null
  abort(reason?: any): Promise<void>
  close(): Promise<void>
  releaseLock(): void
  write(chunk: W): Promise<void>
}

type EndingType = 'native' | 'transparent'
type ReadableStreamDefaultReadResult<T> = ReadableStreamDefaultReadValueResult<T> | ReadableStreamDefaultReadDoneResult
type ReadableStreamReader<R> = ReadableStreamDefaultReader<R> | ReadableStreamBYOBReader
type ReadableStreamReaderMode = 'byob'
