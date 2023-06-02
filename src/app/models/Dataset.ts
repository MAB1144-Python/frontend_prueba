export class Dataset {

    constructor(
        public Key: string,
        public LastModified: string,
        public Etag: string,
        public Size: string,
        public StorageClass: string,

    ) { }
}