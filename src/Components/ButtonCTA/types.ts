import React from "react";
import { ActionType } from "../../globalTypes";

export interface ButtonCTAProps{
  ItemId?: number | string | undefined;
  dispatch?: React.Dispatch<ActionType>;
  added?: boolean;
  content?: string;
  onclick?: Function;
  state?: any;
}