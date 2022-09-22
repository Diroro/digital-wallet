import { Test, TestingModule } from '@nestjs/testing';
import { WebmoneyService } from './webmoney.service';

describe('WebmoneyService', () => {
	let service: WebmoneyService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [WebmoneyService],
		}).compile();

		service = module.get<WebmoneyService>(WebmoneyService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
