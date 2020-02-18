import { environment } from '../environments/environment';


export function urlApi() {

    let URL_API = 'https://objetos-api.herokuapp.com';

    if (!environment.production) {
        URL_API = 'http://localhost:3000';
    }

    return URL_API;
}





