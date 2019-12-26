import axios from "axios";

function apiReq(method, address, headers, params) {
  return axios({
    method: method,
    url: address,
    headers: headers,
    data: params
  });
}

export default apiReq;
