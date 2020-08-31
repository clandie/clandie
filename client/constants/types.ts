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

export interface IBoardInput {
  name: string;
  user_id: number;
}

export interface IJobInput {
  status: string | null;
  company?: string;
  title?: string;
  board_id: number;
}

export interface IDetails {
  status: string;
  company: string;
  title: string;
  location?: string;
  salary?: string;
  url?: string;
  notes?: string;
  jobId: number;
}
