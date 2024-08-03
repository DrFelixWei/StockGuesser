import { Controller, Get, Query } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Controller('stock')
export class StockController {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  @Get('historical')
  getHistoricalData(@Query('symbol') symbol: string): any {
    const apiKey = this.configService.get<string>('MARKETSTACK_API_KEY');
    const url = `http://api.marketstack.com/v1/eod?access_key=${apiKey}&symbols=${symbol}`;

    const marketStackData = this.httpService.get(url).pipe(
      map(response => response.data)
    );
    console.log(marketStackData)
    return marketStackData
  }
}
