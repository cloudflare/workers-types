// TODO: maybe make Readable/WriteableStreams generic?

declare abstract class ReadableStream {
  tee(): [ReadableStream, ReadableStream];
}

interface StreamQueuingStrategy {
  size(chunk: ArrayBuffer): number;
}

// Back-compat alias. It used to be called ReadableStreamPipeToOptions
type ReadableStreamPipeToOptions = PipeToOptions;

// This is the actual standard name. Eventually the runtime internals will match.
type StreamPipeOptions = PipeToOptions;

export {};
