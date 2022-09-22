import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { TransferService } from './transfer/transfer.service';
import { HistoryService } from './history/history.service';
import { ExternalModule } from '../external/external.module';

const services = [AuthService, TransferService, HistoryService];

@Module({
	imports: [ExternalModule],
	providers: services,
	exports: services,
})
export class ServicesModule {}
