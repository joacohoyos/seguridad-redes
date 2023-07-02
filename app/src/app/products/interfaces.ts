export interface IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface INotification {
  id: number;
  text: string;
  expiration?: Date;
}