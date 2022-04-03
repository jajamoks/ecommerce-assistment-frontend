import React from "react";
import { ActionType } from "../../globalTypes";

export interface ItemProps{
  _id?: string;
  id?: any;
  name: string;
  category: string;
  price: number;
  image: string;
  dispatch: React.Dispatch<ActionType>
  added: boolean,
  states?: any
}