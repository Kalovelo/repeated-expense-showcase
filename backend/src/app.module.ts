import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionModule } from './transactions/transactions.module';


@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL),
    TransactionModule,
  ],
})
export class AppModule {}
