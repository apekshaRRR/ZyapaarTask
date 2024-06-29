const { default: axios } = require("axios");

const API_URl ='http://localhost:8081/api/inventry'


const createItem = (item)=>{
    return axios.post(API_URl,item)
}
const updateItem = (item)=>{
    return axios.put('${API_URl}/${id}',item)
}
const getAllitem = (item)=>{
    return axios.get(API_URl)
}
const deteleItem = (id)=>{
    return axios.delete('${API_URl}/${id}')
}
export default{
    createItem,
    updateItem,
    getAllitem,
    deteleItem
}