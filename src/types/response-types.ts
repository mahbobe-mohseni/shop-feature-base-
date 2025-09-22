export interface ResponseType<T> {
  state: boolean;
  data: T | null;
  message: string;
  totalPages?: number;
  totalProducts?: number;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalProducts: number;
  };
}
