import { Injectable } from '@nestjs/common';
import { WebmoneyService } from '../../external/webmoney/webmoney.service';
import { Money } from '../../models/money.model';
import { TransferWithUsers } from '../../models/transfer.model';
import { User } from '../../models/user.model';
import { Wallet } from '../../models/wallet.model';

@Injectable()
export class TransferService {
	constructor(private webmoneyService: WebmoneyService) {}

	async makeTransfer(
		userFrom: User,
		userTo: User,
		money: Money,
	): Promise<{ transfer: TransferWithUsers; wallet: Wallet }> {
		const { transfer, wallet } = await this.webmoneyService.makeTransfer(
			userFrom.walletId,
			userTo.walletId,
			money,
		);

		const transferWithUsers = {
			transfer: {
				...transfer,
				fromName: userFrom.name,
				toName: userTo.name,
			},
			wallet,
		};

		return transferWithUsers;
	}
}
