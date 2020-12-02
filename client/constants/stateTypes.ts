// Add types to each slice of state

// this will be used in user reducer's state
export interface UserState {
  id: number | null;
  name: string;
  authorized: boolean | null | string;
}

// board reducer state
export interface BoardState {
  id: number | null;
  name: string | null;
  boards: { _id: number; name: string }[] | [];
}

// job reducer state
export interface JobState {
  jobs: { status: string; company: string; title: string }[] | [];
}

// interview reducer state
export interface InterviewState {
  interviews: {
    _id: number;
    title: string;
    date: Date;
    time: Date;
    notes: string
  }[] | null;
}

export interface ContactState {
  contacts: {
    name: string;
    title: string | null;
    phone: string | null;
    email: string | null;
    notes: string | null;
    jobID: number;
  }[] | [];
}

// column reducer state
export interface ColumnState {
  opportunities: [];
  applied: [];
  interviews: [];
  offers: [];
  rejected: [];
}
