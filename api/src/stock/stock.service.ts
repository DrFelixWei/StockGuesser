import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { Observable, lastValueFrom } from 'rxjs';
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
  tickersMaterials, 
} from './tickers';
import samplePrices from './samplePrices.json'; 
import sampleTicker from './sampleTicker.json'; 


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
  
  async generateSnapshot(symbol: string, startDate: Date) {
    const formattedStartDate = this.formatDate(startDate);
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1)
    const formattedEndDate = this.formatDate(endDate);
    const snapshot = await this.marketStackPrices(symbol, formattedStartDate, formattedEndDate);
    
    // const prices = snapshot.data.map(day => ({
    //   date: day.date,
    //   open: day.open,
    //   close: day.close,
    //   low: day.low,
    //   high: day.high,
    // }));
    // const stockInput: StockInput = {
    //   symbol: symbol,
    //   name: tickerData.name,
    //   prices: prices,
    //   dateGenerated: new Date(),
    // };
    // const savedSnapshot = await this.saveSnapshot(stockInput);
    // return savedSnapshot
  }

  async generateRandomSnapshot() {

    const randomSymbol = this.getRandomSymbol();
    const tickerData = await this.marketStackInfo(randomSymbol);
    // const tickerData = sampleTicker; // Use sample data for now

    const { startDate, endDate } = this.getRandomDateRange();
    const pricesResponse = await this.marketStackPrices(randomSymbol, startDate, endDate);
    const pricesResult = pricesResponse?.data;
    if (pricesResult?.length === 0) { return null; }
    // const pricesResult = samplePrices; // Use sample data for now
    const prices = pricesResult.map(day => ({
      date: day.date,
      open: day.open,
      close: day.close,
      low: day.low,
      high: day.high,
    }));

    const stockInput: StockInput = {
      symbol: randomSymbol,
      name: tickerData.name,
      prices: prices,
      dateGenerated: new Date(),
    };
    const savedSnapshot = await this.saveSnapshot(stockInput);
    return savedSnapshot
  }

  async saveSnapshot(data: StockInput) {
    return this.prisma.stockSnapshot.create({
      data: {
        symbol: data.symbol,
        name: data.name,
        prices: data.prices,
        dateGenerated: data.dateGenerated || new Date(),
      },
    });
  }

  async marketStackInfo(symbol: string) {
    const apiKey = this.configService.get<string>('MARKETSTACK_API_KEY');
    const url = `http://api.marketstack.com/v1/tickers/${symbol}?access_key=${apiKey}`;
    try {
      const data$ = this.httpService.get(url).pipe(
        map(response => response.data)
      );
      const data = await lastValueFrom(data$);
      return data; 
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async marketStackPrices(randomSymbol: string, startDate: string, endDate: string) {
    const apiKey = this.configService.get<string>('MARKETSTACK_API_KEY');
    const url = `http://api.marketstack.com/v1/eod?access_key=${apiKey}&symbols=${randomSymbol}&date_from=${startDate}&date_to=${endDate}`;
    try {
      const snapshot$ = this.httpService.get(url).pipe(
        map(response => response.data)
      );
      const snapshot = await lastValueFrom(snapshot$);
      return snapshot; 
    } catch (error) {
      console.error('Error:', error);
    }
  }

  private getRandomSymbol(): string {
    const r1 = Math.floor(Math.random() * this.tickers.length);
    const r2 = Math.floor(Math.random() * this.tickers[r1].length);
    return this.tickers[r1][r2];
  }

  private getRandomDateRange(): { startDate: string; endDate: string } {
    const today = new Date();

    const oneYearAgo = new Date(today); // MARKETSTACK API LIMITS TO 1 YEAR AGO HISTORICAL DATA
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    const minEndDate = new Date(today); // LIMITING RANGE OF POSSIBLE DATES TO NOT BE WITHIN 40 DAYS OF TODAY
    minEndDate.setDate(today.getDate() - 40); 

    const startDate = new Date(oneYearAgo.getTime() + Math.random() * (minEndDate.getTime() - oneYearAgo.getTime()));
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 30);

    return {
      startDate: this.formatDate(startDate),
      endDate: this.formatDate(endDate)
    };
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0]; // Return date in YYYY-MM-DD format
  }
}
