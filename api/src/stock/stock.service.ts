import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { StockInput } from './stock.input'; 
import { 
  tickersTech, 
  tickersHealthcare, 
  tickersFinancial, 
  tickersConsumerDiscretionary, 
  tickersEnergy, 
  tickersIndustrials, 
  tickersConsumerStaples, 
  tickersUtilities, 
  tickersTelecommunications, 
  tickersMaterials 
} from './tickers';

@Injectable()
export class StockService {

  private readonly tickers = [
    tickersTech, 
    tickersHealthcare, 
    tickersFinancial, 
    tickersConsumerDiscretionary, 
    tickersEnergy, 
    tickersIndustrials, 
    tickersConsumerStaples, 
    tickersUtilities, 
    tickersTelecommunications, 
    tickersMaterials,
  ];

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async getSnapshot(id: number) {
    return this.prisma.stockSnapshot.findUnique({
      where: { id },
    });
  }

  async getRandomSnapshot() {
    // Get the total number of rows in the stockSnapshot table
    const count = await this.prisma.stockSnapshot.count(); 

    // Return null or handle the case where there are no rows
    if (count === 0) { return null; }

    // Generate a random offset
    const randomOffset = Math.floor(Math.random() * count);

    // Fetch a random row
    return this.prisma.stockSnapshot.findMany({
      take: 1,
      skip: randomOffset,
    }).then(result => result[0]); // result is an array, get the first element
  }
  
  async generateSnapshot(symbol: string, date: Date) {

  }

  async generateRandomSnapshot() {

  }


  async saveSnapshot() {

  }



  async createStock(data: StockInput) {
    return this.prisma.stockSnapshot.create({
      data: {
        symbol: data.symbol,
        name: data.name,
        prices: data.prices,
        dateGenerated: data.dateGenerated || new Date(),
      },
    });
  }

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
    const r1 = Math.floor(Math.random() * this.tickers.length);
    const r2 = Math.floor(Math.random() * this.tickers[r1].length);
    return this.tickers[r1][r2];
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
