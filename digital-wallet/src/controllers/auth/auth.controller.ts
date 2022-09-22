import { Body, Controller, Post, Res } from '@nestjs/common';
import { IsNotEmpty, IsString } from 'class-validator';
import { Response } from 'express';
import { User } from '../../models/user.model';
import { Wallet } from '../../models/wallet.model';
import { AuthService } from '../../services/auth/auth.service';

export class LoginDto {
	@IsNotEmpty()
	@IsString()
	username!: string;
}

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('login')
	async login(
		@Body() body: LoginDto,
		@Res({ passthrough: true }) res: Response,
	): Promise<{ user: User; wallet: Wallet }> {
		const { username } = body;
		return this.authService.createIfNotExists(username);
	}

	@Post('logout')
	async logout(@Res({ passthrough: true }) res: Response) {
		return 'You were logged out';
	}
}
