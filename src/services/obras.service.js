import axios from 'axios';
import apiurl from './apiurl';
import authHeader from './auth-header';
const APIURL = `${apiurl()}/api/obras/`;
const auth = authHeader().Authorization;

const addObra = (obra) => {
    return axios.post(APIURL.concat('add'), obra,
    { headers: { Authorization: auth } });
};

const getOne = (id) => {
    return axios.get(APIURL.concat(id));
}

const getAll = (limit,page) => {
    return axios.get(APIURL.concat(`all?limit=${limit}&page=${page}`));
}

const getReducedAll = (limit,page) => {
    return axios.get(APIURL.concat(`reducedall?limit=${limit}&page=${page}`));
}

const getSome = (termo,limit,page) => {
    return axios.post(APIURL.concat(`search?limit=${limit}&page=${page}`), termo);
}

const update = (data) => {
  return axios.post(APIURL.concat(`update`), data,
  { headers: { Authorization: auth } });
}

const remove = (id) => {
    return axios.delete(APIURL.concat(id), { headers: { Authorization: auth } });
}

const ObrasService = { addObra, getOne, getAll, getReducedAll, getSome, update, remove };

export default ObrasService;
