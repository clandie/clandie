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
  id: number;
  name: string;
  authorized?: boolean;
}

export interface IBoardInfo {
  id: number;
  name: string;
}
