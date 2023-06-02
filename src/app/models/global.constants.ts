export class GlobalConstants {
    //Message
    public static genericError:string = "Algo salió mal. Intentalo más tarde"

    //Restrictions
    public static nameRegex:string = "[a-zA-Z0-9]*";
    public static emailRegex:string = "[A-Za-ze-9._X-]+e[A-Za-ze-9._X-J+\\. [a-z]{2,3)";
    public static passwordRegex:string = "^[e0-9]{10, 10}$";
    public tok_us:string = '';


    //Variables
    public static error:string = "error";

}

export const serverUrl1 = "/models/";
export const serverUrl = "https://backend-api-models.caobalab.co/models/";
export const serverUrl2 = "https://backend-api-app.caobalab.co/user/";
export const serverUrlapimodel = "https://backend-api-models.caobalab.co";
export const serverUrlocal = "http://127.0.0.1:8000";
export const serverUrlapiapp = "https://backend-api-app.caobalab.co";

// en el port 8050 apimodels
// en el port 8000 apiapp
export const serverUrl_auth = serverUrlapiapp+"/auth/";
export const serverUrl_models = "/models/";
export const serverUrl_user = "/user/";
export const serverUrl_credit = "https://backend-api-app.caobalab.co/user/";



