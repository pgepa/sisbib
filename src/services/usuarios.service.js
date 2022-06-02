import axios from 'axios';
import authHeader from './auth-header';
import apiurl from './apiurl';
const APIURL = `${apiurl()}/api/usuarios/`;
const auth = authHeader().Authorization;

const getOne = (id) => {
    return axios.get(APIURL.concat(id), { headers: { Authorization: auth } });
}

const getAll = (limit,page) => {
    return axios.get(APIURL.concat(`all?limit=${limit}&page=${page}`),
    { headers: { Authorization: auth } });
}

const getSome = (termo,limit,page) => {
    return axios.post(APIURL.concat(`search?limit=${limit}&page=${page}`), termo,
    { headers: { Authorization: auth } });
}

const getNames = (limit,page) => {
    return axios.get(APIURL.concat(`names?limit=${limit}&page=${page}`),
    { headers: { Authorization: auth } });
}

const update = (data) => {
    return axios.post(APIURL.concat(`update`), data, { headers: { Authorization: auth } });
}

const remove = (id) => {
    return axios.delete(APIURL.concat(id), { headers: { Authorization: auth } });
}

const UsuariosService = { getOne, getAll, getSome, getNames, update, remove };

export default UsuariosService;
