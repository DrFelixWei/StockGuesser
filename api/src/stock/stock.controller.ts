import { Controller, Get, Post, Body } from '@nestjs/common';
import { StockService } from './stock.service';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get('get')
  async getSnapshot(@Body() id: number) {
    return this.stockService.getSnapshot(id);
  }

  @Get('getRandom')
  async getRandomSnapshot() {
    return this.stockService.getRandomSnapshot();
  }

  @Post('generate')
  async generateSnapshot(@Body() symbol: string, date: Date) {
    return this.stockService.generateSnapshot(symbol, date);
  }

  @Post('generateRandom')
  async generateRandomSnapshot() {
    return this.stockService.generateRandomSnapshot();
  }

}
