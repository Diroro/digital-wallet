import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';
import { type Request, type Response } from 'express';
import { Currency } from '../../models/currency.model';
import { AuthService } from '../../services/auth/auth.service';
import { TransferService } from '../../services/transfer/transfer.service';

class TransferDTO {
	@IsNotEmpty()
	usernameTo!: string;
	@IsNotEmpty()
	currency!: Currency;
	@IsNotEmpty()
	value!: number;
}

@Controller('transfer')
export class TransferController {
	constructor(
		private authService: AuthService,
		private transferService: TransferService,
	) {}

	@Post()
	async makeTransfer(
		@Body() body: TransferDTO,
		@Req() req: Request,
		@Res() res: Response,
	) {
		const username = req.headers.authorization;

		if (!username) {
			console.error('Username is not found in cookies');
			res.sendStatus(401);
			return;
		}

		const { usernameTo, currency, value } = body;
		const user = await this.authService.getUser(username);
		const userTo = await this.authService.getUser(usernameTo);

		if (!user) {
			console.error('User is not found');
			res.sendStatus(401);
			return;
		}

		if (!userTo) {
			res.statusCode = 400;
			res.send('Recipient user does not exist');
			return;
		}

		if (usernameTo === username) {
			res.statusCode = 400;
			res.send('Impossible to send money to your own account');
			return;
		}

		if (value <= 0) {
			res.statusCode = 400;
			res.send('Value should be greater than 0');
			return;
		}

		try {
			const transferWithUsers = await this.transferService.makeTransfer(
				user,
				userTo,
				{
					currency,
					// perfectly there should be validation
					value: Number(value),
				},
			);

			res.send(transferWithUsers);
			return;
		} catch (e: any) {
			res.statusCode = 400;
			res.send(e.message);
			return;
		}
	}
}
