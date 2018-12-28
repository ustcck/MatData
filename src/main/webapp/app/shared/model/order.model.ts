import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';

export interface IOrder {
    id?: number;
    date?: Moment;
    price?: number;
    path?: string;
    user?: IUser;
}

export class Order implements IOrder {
    constructor(public id?: number, public date?: Moment, public price?: number, public path?: string, public user?: IUser) {}
}
