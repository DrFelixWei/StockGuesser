import { Controller, Get } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Controller('stock')
export class StockController {
  private readonly stockSymbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA'];
  
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  @Get('random')
  getRandomStockPrice(): Observable<any> {
    const apiKey = this.configService.get<string>('MARKETSTACK_API_KEY');
    const randomSymbol = this.getRandomSymbol();
    const randomDate = this.getRandomDate();
    const url = `http://api.marketstack.com/v1/eod?access_key=${apiKey}&symbols=${randomSymbol}&date_from=${randomDate}&date_to=${randomDate}`;

    return this.httpService.get(url).pipe(
      map(response => response.data)
    );
  }

  private getRandomSymbol(): string {
    const randomIndex = Math.floor(Math.random() * this.stockSymbols.length);
    return this.stockSymbols[randomIndex];
  }

  private getRandomDate(): string {
    const start = new Date(2020, 0, 1); // Start date: Jan 1, 2020
    const end = new Date(); // End date: today
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return randomDate.toISOString().split('T')[0]; // Return date in YYYY-MM-DD format
  }
}
