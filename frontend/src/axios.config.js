import _ from "axios";

const axios=_.create({
    baseURL:"http://localhost:3000/api"
})

export default axios;