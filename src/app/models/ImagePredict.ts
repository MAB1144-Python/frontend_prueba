export class ImagePredict {
    constructor(
        public filename: string,
        public probability: string,
        public created_at: string,
        public class_prediction: string,
        public message: string,
    ) { }
}