import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { FiltersInput } from '@/src/shared/inputs/filters.input';

import { ColorsService } from './colors.service';
import { ColorEntity } from './entities/color.entity';
import { ChangeColorInput } from './inputs/change-color.input';
import { CreateColorInput } from './inputs/create-color.input';

describe('Colors Service', () => {
	let service: ColorsService;
	let repo: Repository<ColorEntity>;

	const mockColor = {
		id: uuidv4(),
		name: 'Red',
		hex: '#FF0000',
		rgb: 'rgb(255, 0, 0)',
		createdAt: new Date(),
		updatedAt: new Date()
	};

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			providers: [
				ColorsService,
				{
					provide: getRepositoryToken(ColorEntity),
					useValue: {
						find: jest.fn(),
						findOne: jest.fn(),
						create: jest.fn(),
						save: jest.fn(),
						delete: jest.fn()
					}
				}
			]
		}).compile();

		service = moduleRef.get<ColorsService>(ColorsService);
		repo = moduleRef.get<Repository<ColorEntity>>(
			getRepositoryToken(ColorEntity)
		);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('findAll', () => {
		it('should return an array of colors', async () => {
			const filters: FiltersInput = {};
			const mockColors = [mockColor];

			jest.spyOn(repo, 'find').mockResolvedValue(mockColors);

			expect(await service.findAll(filters)).toEqual(mockColors);
		});
	});

	describe('findByName', () => {
		it('should return a color by name', async () => {
			jest.spyOn(repo, 'findOne').mockResolvedValue(mockColor);

			expect(await service.findByName('Red')).toEqual(mockColor);
		});

		it('should throw NotFoundException if not found', async () => {
			jest.spyOn(repo, 'findOne').mockResolvedValue(null);

			await expect(service.findByName('NotFound')).rejects.toThrow(
				NotFoundException
			);
		});
	});

	describe('create', () => {
		const input: CreateColorInput = {
			name: 'Blue',
			hex: '#0000FF',
			rgb: 'rgb(0,0,255)'
		};

		it('should create a new color', async () => {
			jest.spyOn(repo, 'findOne').mockResolvedValue(null);
			jest.spyOn(repo, 'create').mockReturnValue(mockColor as any);
			jest.spyOn(repo, 'save').mockResolvedValue(mockColor as any);

			expect(await service.create(input)).toBe(true);
		});

		it('should throw ConflictException if exists', async () => {
			jest.spyOn(repo, 'findOne').mockResolvedValue(mockColor as any);

			await expect(service.create(input)).rejects.toThrow(ConflictException);
		});
	});

	describe('update', () => {
		const input: ChangeColorInput = {
			name: 'Updated Red',
			hex: '#FF0001',
			rgb: 'rgb(255,0,1)'
		};

		it('should update color', async () => {
			const updatedColor = { ...mockColor, ...input };
			jest.spyOn(repo, 'findOne').mockResolvedValue(mockColor as any);
			jest.spyOn(repo, 'save').mockResolvedValue(updatedColor as any);

			expect(await service.update(mockColor.id, input)).toBe(true);
		});

		it('should throw NotFoundException if not found', async () => {
			jest.spyOn(repo, 'findOne').mockResolvedValue(null);

			await expect(service.update(mockColor.id, input)).rejects.toThrow(
				NotFoundException
			);
		});
	});

	describe('remove', () => {
		it('should remove color', async () => {
			jest.spyOn(repo, 'delete').mockResolvedValue({ affected: 1 } as any);

			expect(await service.remove(mockColor.id)).toBe(true);
		});

		it('should throw NotFoundException if not found', async () => {
			jest.spyOn(repo, 'delete').mockResolvedValue({ affected: 0 } as any);

			await expect(service.remove(mockColor.id)).rejects.toThrow(
				NotFoundException
			);
		});
	});
});
