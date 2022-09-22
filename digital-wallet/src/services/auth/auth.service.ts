import { Injectable } from '@nestjs/common';
import { WebmoneyService } from '../../external/webmoney/webmoney.service';
import { User } from '../../models/user.model';

const users: Map<string, User> = new Map();

@Injectable()
export class AuthService {
	constructor(private webmoneyService: WebmoneyService) {}

	async createIfNotExists(username: string) {
		const user = users.get(username);
		if (user) {
			const wallet = await this.webmoneyService.getWallet(user.walletId);
			return { user, wallet };
		}

		const newWallet = await this.webmoneyService.createWallet();
		const newUser: User = {
			name: username,
			walletId: newWallet.id,
		};

		users.set(username, newUser);

		return { user: newUser, wallet: newWallet };
	}

	async getUser(username: string) {
		const user = users.get(username);
		return user ?? null;
	}

	async getUserByWalletid(walletId: string) {
		let foundUser: User | null = null;
		for (const userEntry of users) {
			const [_, user] = userEntry;
			if (user && user.walletId === walletId) {
				foundUser = user;
				break;
			}
		}

		return foundUser;
	}
}
