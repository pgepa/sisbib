export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));
  const Bearer = 'Bearer ';
  if (user && user.accessToken) {
      // return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
      return { Authorization: Bearer.concat(user.accessToken) };       // for Node.js Express back-end
  } else {
      return {};
  }
}
