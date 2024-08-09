export class StockInput {
  symbol: string;
  name: string;
  prices: any[];
  dateGenerated?: Date;
}

// import { Field, InputType, Int } from '@nestjs/graphql'

// @InputType('StockInput')
// export class StockInput {
//   @Field(() => Int)
//   id: number
// }
