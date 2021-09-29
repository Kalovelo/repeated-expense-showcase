import { Controller, Get } from '@nestjs/common';
import { Transaction } from '../interfaces/transaction.interface';
import { TransactionsService } from '../services/transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionService: TransactionsService) {}

  @Get()
  async findAll(): Promise<Transaction[]> {
    return await this.transactionService.findAll();
  }
}
