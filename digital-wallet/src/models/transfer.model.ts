import { Money } from './money.model';

export interface Transfer {
	id: string;
	fromId: string;
	toId: string;
	money: Money;
	date: Date;
}

export interface TransferWithUsers {
	id: string;
	fromId: string;
	fromName: string;
	toId: string;
	toName: string;
	money: Money;
	date: Date;
}
