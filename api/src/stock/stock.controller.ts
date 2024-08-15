import { Controller, Get, Post, Body } from '@nestjs/common';
import { StockService } from './stock.service';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get('getRandom')
  async getRandomSnapshot() {
    return this.stockService.getRandomSnapshot();
  }
  
  @Get('getSpecific')
  async getSnapshot(@Body() id: number) {
    return this.stockService.getSnapshot(id);
  }

  @Post('generateRandom')
  async generateRandomSnapshot() {
    return this.stockService.generateRandomSnapshot();
  }

  @Post('generateSpecific')
  async generateSnapshot(@Body() symbol: string, date: Date) {
    return this.stockService.generateSnapshot(symbol, date);
  }
}
