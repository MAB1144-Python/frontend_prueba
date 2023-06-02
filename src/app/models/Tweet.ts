
export class Tweet {

    constructor(
        public account: string,
        public social_network: string,
        public tweet_text: string,
        public tweet_created: string,
        public uuid: string,
        public sentiment: string, 
        public model_name : string,

    ) { }
}
