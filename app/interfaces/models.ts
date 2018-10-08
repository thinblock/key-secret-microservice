export interface IPair {
  id?: number;
  key: string;
  secret: string;
  exchange_id: number;
  user_id: string;
  created_at?: Date;
  updated_at?: Date;
  __v: number;
}