import axios from "axios";

import { baseURL } from "../constants";

const apiUser = axios.create({ baseURL: baseURL.users });
const apiWeather = axios.create({ baseURL: baseURL.weather });

export { apiUser, apiWeather };
