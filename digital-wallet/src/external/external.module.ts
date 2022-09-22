import { Module } from '@nestjs/common';
import { WebmoneyService } from './webmoney/webmoney.service';

@Module({
	providers: [WebmoneyService],
	exports: [WebmoneyService],
})
export class ExternalModule {}
