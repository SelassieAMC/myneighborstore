import { getTokenRedirect } from '../../authentication/authRedirect';

const baseApiUrl = process.env.REACT_APP_API_URL + "/stores"

function getAccessToken(){
    return getTokenRedirect()
        .then( response =>  {
            return response.accessToken
        }).catch(error => console.log(error));
}


export function getStores(result, resolve) {
    const headers = new Headers();

    return getAccessToken().then(token => {
        headers.append("Authorization",`Bearer ${token}`);

        const requestInit = {
            method: 'GET',
            headers: headers
        };

        return fetch(baseApiUrl,requestInit)
        .then( response => {
            console.log(response);
            return response.json();
        })
        .catch(error => {
            console.log(`Error calling api ${error}`);
            throw error;
        });
    }).catch(error => {
        console.log(`Error getting access token ${error}`);
        throw error;
    });
}

export function getStoresTest() {
    return new Promise((resolve, reject) => {
        resolve(obj);
    })
}





const obj = [
    {
        "id":"1",
        "name":"dona pepa",
        "description":"tienda doña x que sirve para mock"
    },
    {
        "id":"2",
        "name":"fruver z",
        "description":"fruver pailita"
    }
];