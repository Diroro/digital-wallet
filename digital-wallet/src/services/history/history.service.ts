import { Injectable } from '@nestjs/common';
import { WebmoneyService } from '../../external/webmoney/webmoney.service';
import { User } from '../../models/user.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class HistoryService {
	constructor(
		private webmoneyService: WebmoneyService,
		private authService: AuthService,
	) {}

	async getHistory(walletId: string) {
		const transactionsHistory =
			(await this.webmoneyService.getTransactionsHistory(walletId)) ?? [];

		const users = await Promise.all(
			transactionsHistory.map((transfer) =>
				Promise.all([
					this.authService.getUserByWalletid(transfer.fromId),
					this.authService.getUserByWalletid(transfer.toId),
				]),
			),
		);

		const transactionsWithUsers = transactionsHistory.map(
			(transfer, index) => ({
				...transfer,
				fromName: users[index][0]?.name,
				toName: users[index][1]?.name,
			}),
		);

		return transactionsWithUsers;
	}
}
