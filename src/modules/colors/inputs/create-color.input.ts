import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateColorInput {
	@Field(() => String)
	@IsString()
	@IsNotEmpty()
	public name: string;

	@Field(() => String)
	@IsString()
	@IsNotEmpty()
	public hex: string;

	@Field(() => String)
	@IsString()
	@IsNotEmpty()
	public rgb: string;
}
