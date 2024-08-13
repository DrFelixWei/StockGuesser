import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StockController } from './stock/stock.controller';
import { StockService } from './stock/stock.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [HttpModule, ConfigModule.forRoot({isGlobal: true})],
  controllers: [AppController, StockController],
  providers: [AppService, PrismaService, StockService],
})
export class AppModule {}
