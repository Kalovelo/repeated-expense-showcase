import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Transaction,
  TransactionDocument,
} from '../schemas/transaction.schema';
import { Transaction as ITransaction } from '../interfaces/transaction.interface';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
  ) {}

  private readonly transactions: Transaction[] = [];

  create(transaction: Transaction) {
    this.transactions.push(transaction);
  }

  async findAll(): Promise<ITransaction[]> {
    return await this.transactionModel.find();
  }

  findAllRepeatingExpensies(): Transaction[] {
    const expensies: Transaction[] = [];

    return expensies;
  }
}
