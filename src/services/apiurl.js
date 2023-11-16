export default function apiurl() {
  const API_URL = 'http://' + process.env.REACT_APP_APIURL + ':3000';
  return API_URL;
}
