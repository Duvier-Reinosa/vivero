import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Finca } from './finca/finca.entity';
import { Productor } from './productor/productor.entity';
import { ProductoControl, ProductoControlType } from './productoControl/productoControl.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'aws-0-us-west-1.pooler.supabase.com',
      port: 6543,
      username: 'postgres.ipctzjexgexsxjdravya',
      password: '#5D!Yr2DnnQXXny',
      database: 'postgres',
      synchronize: true, // solo para desarrollo
      // entities: [User],
      ssl: {
        rejectUnauthorized: false,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
