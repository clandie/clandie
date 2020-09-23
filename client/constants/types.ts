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
  status: string;
  company?: string;
  title?: string;
  board_id: number;
  list_order: number | null;
}

export interface IDetails {
  status: string;
  company: string;
  title: string;
  location?: string;
  salary?: string | number;
  url?: string;
  notes?: string;
  jobId: number;
}

export interface IInterviews {
  title: String;
  date: Date;
  time: Date;
  notes: String;
  jobs_id: Number;
}

export interface IJobsArray {
  _id: number;
  status: string;
  company: string;
  title: string;
  location: string | null;
  notes: string | null;
  salary: string | null;
  url: string | null;
  list_order: number;
}
[];

export interface IJobs {
  _id: number;
  status: string;
  company: string;
  title: string;
  location: string | null;
  notes: string | null;
  salary: string | null;
  url: string | null;
  list_order: number;
}
