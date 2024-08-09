import { Controller, Get, Post, Body } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { StockInput } from './stock.input'; 

@Controller('stock')
export class StockController {
  private readonly stockSymbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA'];

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  @Get('all')
  async getAllStocks() {
    return this.prisma.stockSnapshot.findMany();
  }

  @Post('create')
  async createStock(@Body() data: StockInput) {
    return this.prisma.stockSnapshot.create({
      data: {
        symbol: data.symbol,
        name: data.name,
        prices: data.prices,
        dateGenerated: data.dateGenerated || new Date(),  
      },
    });
  }

  @Get('random')
  getRandomStockPrices(): Observable<any> {
    const apiKey = this.configService.get<string>('MARKETSTACK_API_KEY');
    const randomSymbol = this.getRandomSymbol();
    const { startDate, endDate } = this.getRandomDateRange();
    const url = `http://api.marketstack.com/v1/eod?access_key=${apiKey}&symbols=${randomSymbol}&date_from=${startDate}&date_to=${endDate}`;

    return this.httpService.get(url).pipe(
      map(response => response.data)
    );
  }

  private getRandomSymbol(): string {
    const randomIndex = Math.floor(Math.random() * this.stockSymbols.length);
    return this.stockSymbols[randomIndex];
  }

  private getRandomDateRange(): { startDate: string; endDate: string } {
    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setMonth(startDate.getMonth() - 1); // 1 month before the endDate
    return {
      startDate: this.formatDate(startDate),
      endDate: this.formatDate(endDate)
    };
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0]; // Return date in YYYY-MM-DD format
  }
}
