import { Injectable } from '@nestjs/common';
import { Currency } from '../../models/currency.model';
import { Money } from '../../models/money.model';
import { Transfer } from '../../models/transfer.model';
import { Wallet } from '../../models/wallet.model';

const wallets: Map<string, Wallet> = new Map();
//
const transactions: Map<string, Transfer[]> = new Map();

// rename just to 'external'

@Injectable()
export class WebmoneyService {
	// in the real app an interface for values would be different from the inner
	async createWallet(): Promise<Wallet> {
		const { randomUUID } = await import('node:crypto');
		const newWallet: Wallet = {
			id: randomUUID(),
			currenciesList: { [Currency.EUR]: 1000, [Currency.USD]: 0 },
		};

		wallets.set(newWallet.id, newWallet);
		transactions.set(newWallet.id, []);

		return Promise.resolve(newWallet);
	}

	// a real app would return an error
	async depositMoney(walletId: string, money: Money): Promise<boolean> {
		const wallet = wallets.get(walletId);
		if (!wallet) {
			return false;
		}

		wallet.currenciesList[money.currency] += Number(money.value);

		return true;
	}

	// a real app would return error instead of null
	async getWallet(walletId: string): Promise<Wallet> {
		const wallet = wallets.get(walletId);

		if (!wallet) {
			throw new Error('Wallet is not found');
		}

		return wallet;
	}

	// a real app would return error instead of null
	async getTransactionsHistory(walletId: string): Promise<Transfer[] | null> {
		const history = transactions.get(walletId);

		if (!history) {
			return null;
		}

		return history;
	}

	async makeTransfer(
		fromId: string,
		toId: string,
		money: Money,
	): Promise<{ transfer: Transfer; wallet: Wallet }> {
		const { randomUUID } = await import('node:crypto');
		const newTranfer: Transfer = {
			fromId,
			toId,
			money,
			id: randomUUID(),
			date: new Date(),
		};

		const historyFrom = transactions.get(fromId);
		const historyTo = transactions.get(toId);
		const fromWallet = wallets.get(fromId);
		const toWallet = wallets.get(toId);

		if (fromWallet && toWallet) {
			if (fromWallet.currenciesList[money.currency] < money.value) {
				throw new Error(
					`Not enough ${money.currency} on wallet: ${fromWallet.id}`,
				);
			}
			fromWallet.currenciesList[money.currency] -= money.value;
			toWallet.currenciesList[money.currency] += money.value;
			historyFrom?.push(newTranfer);
			historyTo?.push(newTranfer);

			wallets.set(fromWallet.id, fromWallet);
			wallets.set(toWallet.id, toWallet);
			return { transfer: newTranfer, wallet: fromWallet };
		}

		throw new Error('Recepient was not found');
	}
}
