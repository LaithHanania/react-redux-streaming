//importing the axios library
import axios from 'axios';

//Creating an instance of axios with custom configuration and exporting it
export default axios.create({
    baseURL: 'http://localhost:3001' //giving the axios a base URL
});