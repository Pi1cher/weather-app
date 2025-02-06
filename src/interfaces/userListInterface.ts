import { IUser } from "./userInterface";

export interface IUserList {
  results: IUser[];
  info: {
    page: number;
  };
}
