import { Controller, Get, Req, Res } from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { Response, Request } from 'express';
import { HistoryService } from '../../services/history/history.service';

const isNonNullable = <T>(value: T): value is NonNullable<T> =>
	value !== null && value !== undefined;

@Controller('history')
export class HistoryController {
	constructor(
		private authService: AuthService,
		private historyService: HistoryService,
	) {}

	@Get()
	async getMyTransactionsHistory(@Req() req: Request, @Res() res: Response) {
		const username = req.headers.authorization;
		if (!username) {
			return res.sendStatus(401);
		}

		const user = await this.authService.getUser(username);
		if (!user) {
			return res.sendStatus(401);
		}

		const transactionsWithUsers = await this.historyService.getHistory(
			user.walletId,
		);
		res.send(transactionsWithUsers ?? []);
	}
}
