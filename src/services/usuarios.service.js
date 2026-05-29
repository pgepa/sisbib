import axios from 'axios';
import authHeader from './auth-header';
import apiurl from './apiurl';
const APIURL = `${apiurl()}/api/usuarios/`;

const authHeaders = () => ({ headers: authHeader() });

const getOne = (id) => {
    return axios.get(APIURL.concat(id), authHeaders());
}

const getAll = (limit,page) => {
    return axios.get(APIURL.concat(`all?limit=${limit}&page=${page}`),
    authHeaders());
}

const getSome = (termo,limit,page) => {
    return axios.post(APIURL.concat(`search?limit=${limit}&page=${page}`), termo,
    authHeaders());
}

const getNames = (limit,page) => {
    return axios.get(APIURL.concat(`names?limit=${limit}&page=${page}`),
    authHeaders());
}

const getCount = () => {
    return axios.get(APIURL.concat('count'));
}

const update = (data) => {
    return axios.post(APIURL.concat(`update`), data, authHeaders());
}

const remove = (id) => {
    return axios.delete(APIURL.concat(id), authHeaders());
}

const UsuariosService = { getOne, getAll, getSome, getNames, getCount, update, remove };

export default UsuariosService;
