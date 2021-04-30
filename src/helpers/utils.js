/** @format */

export function getFormBody(params) {
  let formBody = [];

  for (let property in params) {
    let encodedKey = encodeURIComponent(property); // 'user name' => 'user%20name'
    let encodedValue = encodeURIComponent(params[property]); // Nikhil 123 => Nikhil%2020123

    formBody.push(encodedKey + '=' + encodedValue);
  }

  return formBody.join('&'); // 'username=Nikhil&password=123213'
}

export function getAuthTokenFromLocalStorage() {
  return localStorage.getItem('token');
}
