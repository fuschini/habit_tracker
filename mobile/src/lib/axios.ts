import axios from "axios";

// For andriod apps, the baseURL in dev should be the physical IP of the machine running the server. localhost doesn't work
export const api = axios.create({
    baseURL: 'http://localhost:3000'
})