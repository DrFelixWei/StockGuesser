import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StockController } from './stock/stock.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';

// const knexProvider = {
//   provide: 'knex',
//   useFactory: async () => knex({ client: 'pg', connection: process.env.DATABASE_URL }),
// }

// @Global()
// @Module({
//   providers: [knexProvider],
//   exports: [knexProvider],
// })
// export class KnexModule {}

@Module({
  imports: [HttpModule, ConfigModule.forRoot({isGlobal: true})],
  controllers: [AppController, StockController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
