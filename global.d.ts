declare module "streamifier" {
  import { Readable } from "stream";

  interface Options {
    chunkSize?: number;
  }

  export function createReadStream(
    buffer: Buffer,
    options?: Options
  ): Readable;

  const streamifier: {
    createReadStream: (buffer: Buffer, options?: Options) => Readable;
  };

  export default streamifier;
}
