import axios from "axios";

class RequestService {
  constructor(base_url) {
    this.base_url = base_url;
  }
  create(path, data) {
    return axios.post(this.base_url + path, data);
  }
  read(path) {
    return axios.get(this.base_url + path);
  }
  update(path, data) {
    return axios.patch(this.base_url + path, data);
  }
  delete(path) {
    return axios.delete(this.base_url + path);
  }
}

export default new RequestService(
  process.env.BASE_API_URL ? process.env.BASE_API_URL : "https://reqres.in/api"
);
