import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
	Column,
	CreateDateColumn,
	Generated,
	PrimaryColumn,
	UpdateDateColumn
} from 'typeorm';

@ObjectType({ isAbstract: true })
export class AbstractEntity<T> {
	@Field(() => ID)
	@PrimaryColumn({
		type: 'uuid',
		unique: true,
		nullable: false
	})
	@Generated('uuid')
	id: string;

	@Field(() => Date)
	@CreateDateColumn({
		name: 'created_at'
	})
	createdAt: Date;

	@Field(() => Date)
	@UpdateDateColumn({
		name: 'updated_at'
	})
	updatedAt: Date;

	constructor(entity: Partial<T>) {
		Object.assign(this, entity);
	}
}
