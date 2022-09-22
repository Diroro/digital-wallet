import { Currency } from './currency.model';

export interface Money {
	value: number;
	currency: Currency;
}
