import { Controller, Get } from '@nestjs/common';
import { TransactionsService } from '../services/transactions.service';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import IRepeatingExpense from '../interfaces/repeatingExpense.interface';
import { Transaction } from '../schemas/transaction.schema';
import { RepeatingExpense } from '../schemas/repeatingExpense.schema';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionService: TransactionsService) {}

  @ApiNotFoundResponse()
  @ApiOkResponse({ type: Transaction })
  @Get()
  async findAll(): Promise<Transaction[]> {
    return await this.transactionService.findAll();
  }

  @ApiNotFoundResponse()
  @ApiOkResponse({ type: RepeatingExpense })
  @Get('/repeating_expenses')
  async findAllRepeatingExpenses(): Promise<IRepeatingExpense[]> {
    return await this.transactionService.findAllRepeatingExpenses();
  }
}
