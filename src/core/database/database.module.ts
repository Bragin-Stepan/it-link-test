import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				type: 'mysql',
				host: configService.getOrThrow('DB_HOST'),
				port: configService.getOrThrow('DB_PORT'),
				database: configService.getOrThrow('DB_DATABASE'),
				username: configService.getOrThrow('DB_USERNAME'),
				password: configService.getOrThrow('DB_PASSWORD'),
				autoLoadEntities: true,
				synchronize: configService.get('MYSQL_SYNCHRONIZE') === 'true'
			}),
			inject: [ConfigService]
		})
	]
})
export class DatabaseModule {}
