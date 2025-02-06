import { IUserList } from "../interfaces";
import { IRes } from "../types";
import { apiUser } from "./apiService";

const userService = {
  getAll: (results: string, seed: number): IRes<IUserList> =>
    apiUser.get("", { params: { results, seed } }),
};

export { userService };
