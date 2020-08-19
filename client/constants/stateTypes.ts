// Add types to each slice of state

// this will be used in user reducer's state
export interface UserState {
  id: number | null;
  name: string;
  // email: string;
  // password: string;
  authorized: boolean;
}

export interface BoardState {
  id: number | null;
  name: string;
}
