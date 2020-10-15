import { getTokenRedirect } from '../../authentication/authRedirect';

const baseApiUrl = process.env.REACT_APP_API_URL;

function getAccessToken(){
    return getTokenRedirect()
        .then( response =>  {
            return response.accessToken
        }).catch(error => console.log(error));
}

function createHeaders(token, methodType, body = {}){
    const headers = new Headers();
    if(!token){
        headers.append("Authorization",`Bearer ${token}`);
    }

    let requestInit;
    if( methodType === 'GET'){
        requestInit = {
            method: methodType,
            headers: headers
        }
    }else{
        headers.append("Content-Type",'application/json');
        requestInit = {
            method: methodType,
            headers: headers,
            body: JSON.stringify(body)
        }
    }
    return requestInit;
}


export async function getStores() {
    
    const requestInit = createHeaders(null, 'GET');
    return fetch(baseApiUrl+"/stores",requestInit)
        .then( response => {
            return response.json();
        })
        .catch(error => {
            console.log(`Error calling api ${error}`);
            throw error;
        });
}

export async function createStore(store){
    return getAccessToken().then(token => {

        const requestInit = createHeaders(token, 'POST', store );

        return fetch(baseApiUrl+"/stores",requestInit)
        .then( response => {
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


export async function saveStoreDetails(store){
    return getAccessToken().then(token => {

        const requestInit = createHeaders(token, 'PUT', store );

        return fetch(baseApiUrl+"/stores",requestInit)
        .then( response => {
            if(response.ok){
                return response.json();
            }
            throw response;
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

export async function saveStorePhotos(photosData){

    return getAccessToken().then(token => {

        const headers = new Headers();
        headers.append("Authorization",`Bearer ${token}`);

        const formData  = new FormData();

        for(const value in photosData) {
            formData.append(photosData[value].name, photosData[value].PhotoFile);
        }
        formData.append("Objects",JSON.stringify(photosData));

        let requestInit = {
            method: 'POST',
            headers: headers,
            body: formData
        }

        return fetch(baseApiUrl+"/Gallery",requestInit)
        .then( response => {
            if(!response.ok){
                throw response;
            }
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