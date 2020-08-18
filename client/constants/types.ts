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
}
