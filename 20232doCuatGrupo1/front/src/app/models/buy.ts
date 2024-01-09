import {Item} from "./item";
import {User} from "./user";

export interface Buy {
  _id: string;
  buyNumber: number;
  user: User;
  items: Item[];
  total: number;
  quantity: number;
  date:  Date;
}
