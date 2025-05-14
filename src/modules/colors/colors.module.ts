import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ColorsResolver } from './colors.resolver';
import { ColorsService } from './colors.service';
import { ColorEntity } from './entities/color.entity';

@Module({
	imports: [TypeOrmModule.forFeature([ColorEntity])],
	providers: [ColorsService, ColorsResolver]
})
export class ColorsModule {}
