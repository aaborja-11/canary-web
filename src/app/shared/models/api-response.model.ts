export interface ApiResponse<T> {
  data: T;
}

export interface ErrorDetails {
  message: string;
  errors: Error[];
}

export interface Error {
  message: string;
  field: string;
}
