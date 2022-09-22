import { Currency, Transfer, User, Wallet } from '../models/models';

const defaultHeaders = {
	authorization: '',
};

interface LoginResponse {
	user: User;
	wallet: Wallet;
}

const baseHref = 'http://127.0.0.1:3000/api';

export const login = async (
	username: string,
): Promise<LoginResponse | undefined> => {
	const body = JSON.stringify({ username });
	try {
		const response = await fetch(`${baseHref}/auth/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: body,
		});

		const data = (await response.json()) as LoginResponse;

		defaultHeaders.authorization = data.user.name;
		return data;
	} catch (e) {
		return undefined;
	}
};

interface TransferResponse {
	transfer: Transfer;
	wallet: Wallet;
}

export const sendTransfer = async (
	value: number,
	to: string,
	currency: Currency,
): Promise<TransferResponse | undefined> => {
	const body = {
		usernameTo: to,
		currency,
		value,
	};

	try {
		const response = await fetch(`${baseHref}/transfer`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', ...defaultHeaders },
			body: JSON.stringify(body),
		});

		return (await response.json()) as TransferResponse;
	} catch (e) {
		return undefined;
	}
};

type HistoryResponse = Transfer[];

export const getHistory = async (): Promise<HistoryResponse | undefined> => {
	try {
		const response = await fetch(`${baseHref}/history`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json', ...defaultHeaders },
		});

		return (await response.json()) as HistoryResponse;
	} catch (e) {
		return undefined;
	}
};
