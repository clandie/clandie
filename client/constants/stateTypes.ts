// Add types to each slice of state

// this will be used in user reducer's state
export interface UserState {
  id: number | null;
  name: string;
  authorized: boolean;
}

// board reducer state
export interface BoardState {
  id: number | null;
  name: string | null;
  boards: { _id: number; name: string }[] | [];
}
