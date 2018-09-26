export interface IPair {
  id?: number;
  key: string;
  secret: string;
  exchangeId: number;
  created_at?: Date;
  updated_at?: Date;
  __v: number;
}

export interface IExchange {
  id?: number;
  exchangeId: number;
  name: string;
  created_at?: Date;
  updated_at?: Date;
  __v: number;
}