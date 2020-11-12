const baseApiUrl = process.env.REACT_APP_API_URL;


function createHeaders(methodType, body = {}){
    const headers = new Headers();
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

export async function getCountries(includeData=true) {
    const requestInit = createHeaders('GET');
    return fetch(baseApiUrl+"/staticData/countries/"+includeData,requestInit)
        .then( response => {
            return response.json();
        })
        .catch(error => {
            console.log(`Error calling api ${error}`);
            throw error;
        });
}

export async function getCountryById(id, includeData=true){
    const requestInit = createHeaders('GET');
    return fetch(baseApiUrl+"/staticData/countries/"+id+"/"+includeData,requestInit)
        .then( response => {
            return response.json();
        })
        .catch(error => {
            console.log(`Error calling api ${error}`);
            throw error;
        });
}