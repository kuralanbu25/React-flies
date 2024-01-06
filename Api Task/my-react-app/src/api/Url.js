import axios from "axios"

export const Api_url='https://652fc2c86c756603295d9fab.mockapi.io/Employee/'

export  const postData = async(data)=>{
    const res = await axios({
        method:'POST',
        url:Api_url,
        data:data
    })
    return res;
}
export  const getData = async()=>{
    const res = await axios({
        method:'GET',
        url:Api_url,
    })
    return res;
}

export const putData= async(id,data)=>{
  
    const res= await axios({
        method:'PUT',
        url:Api_url+id,
        data:data
    })
    return res;

}
export const deleteData= async(id)=>{
  
    const res= await axios({
        method:'DELETE',
        url:Api_url+id,
        data:id
    })
    return res;

}

export  const getApiData = async(id)=>{
    const res = await axios({
        method:'GET',
        url:Api_url+id,
         })
    return res;
}
