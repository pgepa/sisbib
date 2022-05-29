import axios from 'axios';
import apiurl from './apiurl';

const APIURL = `${apiurl()}/api/usuarios/`;

const addUsuario = (usuario) => {
    return axios.post(APIURL.concat('add'), usuario); 
};

const getOne = (id) => {
    return axios.get(APIURL.concat(id));
}

const getAll = (limit,page) => {
    return axios.get(APIURL.concat(`all?limit=${limit}&page=${page}`));
}

const getSome = (termo,limit,page) => {
    return axios.post(APIURL.concat(`search?limit=${limit}&page=${page}`), termo);
}

const update = (data) => {
    return axios.post(APIURL.concat(`update`), data);
}

const remove = (id) => {
    return axios.delete(APIURL.concat(id));
}

const UsuarioService = { addUsuario, getOne, getAll, getSome, update, remove };

export default UsuarioService;
