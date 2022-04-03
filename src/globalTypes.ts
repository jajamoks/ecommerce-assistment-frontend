import React from "react";

export interface ChangeQuantityInterface{
  _id?: string;
  id: any;
  quantity: number
}

export interface RoutesInterface{
  current: string;
  history: string;
}

interface RatingInterface{
  count: number;
}

export interface ItemInterface{
  _id?: string;
  id: any;
  category: string;
  description: string;
  image: string;
  price: number;
  rating: RatingInterface;
  name: string;
  quantity?: number;
  added?: boolean
}

export interface StateInterface{
  item: ItemInterface,
  items: Array<ItemInterface>,
  filteredItems: Array<ItemInterface>,
  shoppingCart: Array<ItemInterface>,
  searching: string,
  categories: Array<string>,
  current: string,
  history: string,
  isSearching: boolean,
  filterAt: string,
  totalAmount: number,
  error: boolean,
  loading: boolean,
  currency?: string
}

export type ActionType = {
  type: string,
  payload?: 
    | ItemInterface[] 
    | string 
    | number 
    | ChangeQuantityInterface
    | RoutesInterface
}

export interface PageProps {
  state: StateInterface;
  dispatch?: React.Dispatch<ActionType>;
  ctx?: React.Context<StateInterface>
}