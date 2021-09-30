// TODO: maybe make Readable/WriteableStreams generic?

declare abstract class ReadableStream {
  tee(): [ReadableStream, ReadableStream];
}

export {};
