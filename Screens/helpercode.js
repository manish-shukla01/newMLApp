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

// need to improve the security before go to prod 
export async function doPostCallAMLEndPoint(data){

    const config =  {headers: {'Content-Type': `application/json`}};

    const axios = require('axios');
    
    const baseurl = 'http://836d24f7-652e-40ea-bd88-118f804ded5c.uksouth.azurecontainer.io/score';

    const resp = await axios.post(baseurl,data,config);
    return resp;

}

