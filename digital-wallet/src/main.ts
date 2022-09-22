import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('/api');
	app.use(cookieParser());
	app.enableCors();
	app.useGlobalPipes(new ValidationPipe());
	await app.listen(3000, 'localhost');
	const url = await app.getUrl();
	console.log('NESTJS APP IS LISTENING ON', url);
}
bootstrap();
