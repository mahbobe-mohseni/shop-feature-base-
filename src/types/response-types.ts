export interface ResponseType<T> {
  state: boolean;
  data: T | null;
  message: string;
}
