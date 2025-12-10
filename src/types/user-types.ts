export interface UserType {
  _id: string;
  role: string;
  name: string;
  family: string;
  phone: string;
  email: string;
  password: string;
}

export type payloadType = {
  name: string;
  family: string;
  email: string;
  phone: string;
};
export type setOrderpayloadType = {
  products: any[];
  totalPrice: number;
};
