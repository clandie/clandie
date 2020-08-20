export interface ISignupState {
  name: string;
  email: string;
  password: string;
}

export interface ILoginState {
  email: string;
  password: string;
}

export interface IUserInfo {
  _id: number;
  name: string;
}

export interface IBoardInfo {
  _id: number;
  name: string;
}
