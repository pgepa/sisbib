import axios from 'axios';
import apiurl from './apiurl';
const APIURL = `${apiurl()}/api/auth/`;

const addUser = (inscription, name, department, cpf, email, password) => {
  return axios.post(APIURL.concat('signup'),
    { inscription, name, department, cpf, email, password });
};

const login = (email, password) => {
  return axios
    .post(APIURL.concat('signin'), { email, password })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem('email', email);
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('department', response.data.department);
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const getEmail = () => {
  return localStorage.getItem('email');
}

const getDepartment = () => {
  return localStorage.getItem('department');
}

const changePassword = (email, oldPassword, newPassword, repeatPassword) => {
  return axios.post(APIURL.concat('changepass'), {
    email, oldPassword, newPassword, repeatPassword
  });
}

const changeNewPassword = (email, newPassword) => {
  return axios.post(APIURL.concat('changenewpass'), { email, newPassword });
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { addUser, login, logout, getCurrentUser, getEmail,
  getDepartment, changePassword, changeNewPassword };
