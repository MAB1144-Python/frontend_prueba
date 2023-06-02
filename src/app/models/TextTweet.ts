export class TextTweet {
    constructor(
        public model_name: string,
        public sentiment: string,
        public tweet_account: string,
        public transformed_text: string,
        public text: string,
        public uuid: string,
    ) { }
}