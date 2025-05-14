import { Test } from '@nestjs/testing';

import { ColorsResolver } from './colors.resolver';
import { ColorsService } from './colors.service';

const mockService = {
	findAll: jest.fn(),
	findByName: jest.fn(),
	create: jest.fn(),
	update: jest.fn(),
	remove: jest.fn()
};

describe('Colors Resolver', () => {
	let resolver: ColorsResolver;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				ColorsResolver,
				{
					provide: ColorsService,
					useValue: mockService
				}
			]
		}).compile();

		resolver = module.get<ColorsResolver>(ColorsResolver);
	});

	it('should be defined', () => {
		expect(resolver).toBeDefined();
	});

	describe('findAll', () => {
		it('should return an array of colors', async () => {
			const filters = { take: 5 };
			mockService.findAll.mockResolvedValue([]);

			await resolver.findAll(filters as any);
			expect(mockService.findAll).toHaveBeenCalledWith(filters);
		});
	});

	describe('findByName', () => {
		it('should return a color by name', async () => {
			const name = 'Red';
			mockService.findByName.mockResolvedValue({});

			await resolver.findByName(name);
			expect(mockService.findByName).toHaveBeenCalledWith(name);
		});
	});

	describe('createColor', () => {
		it('should call create with data', async () => {
			const input = { name: 'Red', hex: '#FF0000', rgb: 'rgb(255,0,0)' };
			mockService.create.mockResolvedValue(true);

			await resolver.createColor(input as any);
			expect(mockService.create).toHaveBeenCalledWith(input);
		});
	});

	describe('updateColor', () => {
		it('should call update with id and data', async () => {
			const id = '1';
			const input = { name: 'Red', hex: '#FF0000', rgb: 'rgb(255,0,0)' };
			mockService.update.mockResolvedValue(true);

			await resolver.updateColor(id, input as any);
			expect(mockService.update).toHaveBeenCalledWith(id, input);
		});
	});

	describe('removeColor', () => {
		it('should call remove with id', async () => {
			const id = '1';
			mockService.remove.mockResolvedValue(true);

			await resolver.removeColor(id);
			expect(mockService.remove).toHaveBeenCalledWith(id);
		});
	});
});
