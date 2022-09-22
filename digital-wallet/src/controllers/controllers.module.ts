import { Module } from '@nestjs/common';
import { ServicesModule } from '../services/services.module';
import { AuthController } from './auth/auth.controller';
import { TransferController } from './transfer/transfer.controller';
import { HistoryController } from './history/history.controller';

@Module({
	imports: [ServicesModule],
	controllers: [TransferController, AuthController, HistoryController],
})
export class ControllersModule {}
