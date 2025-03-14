import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Finca } from './finca/finca.entity';
import { Productor } from './productor/productor.entity';
import { ProductoControl, ProductoControlType } from './productoControl/productoControl.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: (process.env.DB_TYPE || 'postgres') as any,
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'postgres',
      synchronize: process.env.DB_SYNC === 'true',
      entities: [Finca, Productor, ProductoControl, ProductoControlType],
      ssl: {
        rejectUnauthorized: false
      },
      logging: ['error', 'warn'],
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([Finca, Productor, ProductoControl, ProductoControlType]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
