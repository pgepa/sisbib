import axios from 'axios';
import apiurl from './apiurl';

const APIURL = `${apiurl()}/api/obras/`;

const addObra = (obra) => {
    return axios.post(APIURL.concat('add'), obra); 
};

const getOne = (id) => {
    return axios.get(APIURL.concat(id));
}

const getAll = (limit,page) => {
    return axios.get(APIURL.concat(`all?limit=${limit}&page=${page}`));
}

const update = (id, data) => {
    return axios.post(APIURL.concat(id), data);
}

const remove = (id) => {
    return axios.delete(APIURL.concat(id));
}

const ObraService = { addObra, getOne, getAll, update, remove };

export default ObraService;
