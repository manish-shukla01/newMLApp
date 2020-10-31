export async function doGetCall(url, accessToken){

    const axios = require('axios');
    const config =  {headers: {'Authorization': `Bearer ${accessToken}`}};

    
    const baseurl = 'https://mlapiapp.azurewebsites.net';

    

    const resp = await axios.get(`${baseurl}/${url}`,config);
    return resp;
}

export async function doPostCall(url, data,accessToken){

    const axios = require('axios');
    const config =  {headers: {'Authorization': `Bearer ${accessToken}`}};
    
    const baseurl = 'https://mlapiapp.azurewebsites.net';

    
    const resp = await axios.post(`${baseurl}/${url}`,data,config);
    return resp;

}