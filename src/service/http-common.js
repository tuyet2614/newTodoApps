import axios from "axios";
import { token } from './author'
export default axios.create({

    baseURL: "https://api-nodejs-todolist.herokuapp.com",
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json"
    }
});