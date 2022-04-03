import { ActionType } from "../../globalTypes";

export interface ProductProps{
  title: string;
  price: number;
  quantity: number;
  currency: any;
  img: string;
  dispatch: React.Dispatch<ActionType>;
  id: any,
}