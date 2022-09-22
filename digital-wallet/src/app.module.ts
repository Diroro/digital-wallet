import { Module } from '@nestjs/common';
import { ControllersModule } from './controllers/controllers.module';
import { ExternalModule } from './external/external.module';
import { ServicesModule } from './services/services.module';

@Module({
	imports: [ControllersModule, ServicesModule, ExternalModule],
})
export class AppModule {}
