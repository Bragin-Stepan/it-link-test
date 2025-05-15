import {
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { FiltersInput } from '@/src/shared/inputs/filters.input';

import { ColorEntity } from './entities/color.entity';
import { ChangeColorInput } from './inputs/change-color.input';
import { CreateColorInput } from './inputs/create-color.input';

@Injectable()
export class ColorsService {
	constructor(
		@InjectRepository(ColorEntity)
		private colorsRepository: Repository<ColorEntity>
	) {}

	public async findAll(input: FiltersInput) {
		const { take, skip, searchTerm } = input;

		const whereClause = searchTerm
			? { name: Like(`%${searchTerm}%`) }
			: undefined;

		const colors = await this.colorsRepository.find({
			take: take ?? 5,
			skip: skip ?? 0,
			where: whereClause
		});

		return colors;
	}

	public async findByName(name: string) {
		const color = await this.colorsRepository.findOne({
			where: { name }
		});

		if (!color) {
			throw new NotFoundException(`Цвет с таким именем не найден`);
		}

		return color;
	}

	public async create(input: CreateColorInput) {
		const { name, hex, rgb } = input;

		const colorExists = await this.colorsRepository.findOne({
			where: { name }
		});

		if (colorExists) {
			throw new ConflictException(`Цвет с таким именем уже существует`);
		}

		const color = await this.colorsRepository.create({
			name,
			hex,
			rgb
		});

		await this.colorsRepository.save(color);

		return true;
	}

	public async update(id: string, input: ChangeColorInput) {
		const { name, hex, rgb } = input;

		const color = await this.colorsRepository.findOne({
			where: { id }
		});

		if (!color) {
			throw new NotFoundException(`Цвет с таким id не найден`);
		}

		await this.colorsRepository.save({
			...color,
			name,
			hex,
			rgb
		});
		return true;
	}

	public async remove(id: string) {
		const result = await this.colorsRepository.delete(id);

		if (result.affected === 0) {
			throw new NotFoundException(`Цвет с таким id не найден`);
		}

		return true;
	}
}
