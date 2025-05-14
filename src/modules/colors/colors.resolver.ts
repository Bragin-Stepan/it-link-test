import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { FiltersInput } from '../../shared/inputs/filters.input';

import { ColorsService } from './colors.service';
import { ColorEntity } from './entities/color.entity';
import { ChangeColorInput } from './inputs/change-color.input';
import { CreateColorInput } from './inputs/create-color.input';

@Resolver('Color')
export class ColorsResolver {
	public constructor(private readonly colorsService: ColorsService) {}

	@Query(() => [ColorEntity], { name: 'findAllColors' })
	public async findAll(
		@Args('filters', { nullable: true }) input: FiltersInput = {}
	) {
		return this.colorsService.findAll(input);
	}

	@Query(() => ColorEntity, { name: 'findColorByName' })
	public async findByName(@Args('name') name: string) {
		return this.colorsService.findByName(name);
	}

	@Mutation(() => Boolean, { name: 'createColor' })
	public async createColor(@Args('data') input: CreateColorInput) {
		return this.colorsService.create(input);
	}

	@Mutation(() => Boolean, { name: 'updateColor' })
	updateColor(@Args('id') id: string, @Args('data') input: ChangeColorInput) {
		return this.colorsService.update(id, input);
	}

	@Mutation(() => Boolean, { name: 'removeColor' })
	async removeColor(@Args('id') id: string) {
		return this.colorsService.remove(id);
	}
}
