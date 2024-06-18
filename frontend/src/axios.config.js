import _ from "axios";

const axios=_.create({
    baseURL:"http://localhost:3000/api",
    headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
    }
})

export default axios;