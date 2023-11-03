import {
  FirebaseStorage as FirebaseStorageType,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { Storage, UploadFileResult } from './storage.types';

export class FirebaseStorage implements Storage {
  constructor(private readonly storage: FirebaseStorageType) {
    this.storage = storage;
  }

  async uploadFile(uri: string, name: string): Promise<UploadFileResult> {
    const fetchResponse = await fetch(uri);
    const theBlob = await fetchResponse.blob();

    const imageRef = ref(this.storage, name);

    const uploadTask = uploadBytesResumable(imageRef, theBlob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          console.log(error);
          reject(error);
        },

        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({
            downloadUrl,
            metadata: uploadTask.snapshot.metadata,
          });
        }
      );
    });
  }
}
