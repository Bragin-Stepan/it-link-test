import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '@/src/core/database/abstract.entity';

@Entity('colors')
@ObjectType()
export class ColorEntity extends AbstractEntity<ColorEntity> {
	@Field(() => String)
	@Column({ name: 'c_name', type: 'varchar', unique: true })
	public name: string;

	@Field(() => String)
	@Column({ name: 'c_hex', type: 'varchar', unique: false })
	public hex: string;

	@Field(() => String, { nullable: true })
	@Column({ name: 'c_rgb', type: 'varchar', unique: false })
	public rgb: string;
}
