/* eslint-disable no-unused-vars */

import { FullMetadata } from 'firebase/storage';

export interface Storage {
  uploadFile: (uri: string, name: string) => Promise<UploadFileResult>;
}

export interface UploadFileResult {
  downloadUrl: string;
  metadata: FullMetadata;
}
