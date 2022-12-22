import axios from 'axios';
import authHeader from './auth-header';
import apiurl from './apiurl';
const APIURL = `${apiurl()}/api/emprestimos/`;
const auth = authHeader().Authorization;

const addEmprestimo = (emprestimo) => {
    return axios.post(APIURL.concat('add'), emprestimo, { headers: { Authorization: auth } }); 
};

const getOne = (id) => {
    return axios.get(APIURL.concat(id), { headers: { Authorization: auth } });
}

const getAll = (limit,page) => {
    return axios.get(APIURL.concat(`all?limit=${limit}&page=${page}`), { headers: { Authorization: auth } });
}

const getSome = (termo,limit,page) => {
    return axios.post(APIURL.concat(`search?limit=${limit}&page=${page}`), termo, { headers: { Authorization: auth } });
}

const getCount = () => {
    return axios.get(APIURL.concat('count'));
}

const update = (data) => {
    return axios.post(APIURL.concat(`update`), data, { headers: { Authorization: auth } });
}

const remove = (id) => {
    return axios.delete(APIURL.concat(id), { headers: { Authorization: auth } });
}

const EmprestimosService = { addEmprestimo, getOne, getAll, getSome, getCount, update, remove };

export default EmprestimosService;
