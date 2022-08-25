import axios from "axios";
export default axios.create({

    baseURL: "https://api-nodejs-todolist.herokuapp.com/user",
    headers: {
        "Content-type": "application/json"
    }
});
