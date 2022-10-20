interface AnalyticsEngineDataset {
  writeDataPoint(dataPoint: AnalyticsEngineDataPoint): void;
}

interface AnalyticsEngineDataPoint {
  readonly indexes?: string[];
  readonly blobs?: (ArrayBuffer | string | null)[];
  readonly doubles?: (number | null)[];
}

export {};
