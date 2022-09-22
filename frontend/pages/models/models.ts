export type Currency = 'EUR' | 'USD';

export interface User {
	name: string;
	walletId: string;
}

export interface Wallet {
	id: string;
	currenciesList: Record<Currency, number>;
}

export interface Money {
	value: number;
	currency: Currency;
}

export interface Transfer {
	id: string;
	fromId: string;
	fromName: string;
	toId: string;
	toName: string;
	money: Money;
	date: string;
}
