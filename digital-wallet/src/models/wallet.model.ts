import { Currency } from './currency.model';

export interface Wallet {
	currenciesList: Record<Currency, number>;
	id: string;
}
