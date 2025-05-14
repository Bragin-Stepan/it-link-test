import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

import { CreateColorInput } from './create-color.input';

@InputType()
export class ChangeColorInput extends PartialType(CreateColorInput) {
	@Field(() => String, { nullable: true })
	@IsString()
	@IsNotEmpty()
	public name?: string;

	@Field(() => String, { nullable: true })
	@IsString()
	@IsNotEmpty()
	public hex?: string;

	@Field(() => String, { nullable: true })
	@IsString()
	@IsNotEmpty()
	public rgb?: string;
}
