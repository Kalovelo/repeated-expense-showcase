import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsController } from './controllers/transactions.controller';
import { TransactionSchema, Transaction } from './schemas/transaction.schema';
import { SeedingService } from './services/seeding.service';
import { TransactionsService } from './services/transactions.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
  ],
  providers: [TransactionsService, SeedingService],
  controllers: [TransactionsController],
  exports: [SeedingService],
})
export class TransactionModule {}
