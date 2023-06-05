
export class User_authenticated {
    constructor(
        public access_token: string,
        public refresh_token: string,

    ) { }
}

export class user_data {
  constructor(
    public first_name: string,
    public last_name: string,
    public email: string,
    public username: string,
    public cellphone: string,
    public password: string,
    public born_date: string

) { }

}


export class imageRecog {
    constructor(
        public prediction: string,
        public filename: string,
        public probability: number,

    ) {}
}

export class pre_apnea {
  constructor(
    public prediction_text : string,
    public prediction_class : string,
    public prediction_probability : string,
  ){}
}
