export interface SignUpData {
  fullName: string;
  email: string;
  passwordHash: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token?: string;
  user?: {
    id: string;
    email: string;
    fullName: string;
  };
}
