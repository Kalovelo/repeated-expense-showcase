import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as transactions from '../data/transactions.json';
import {
  Transaction,
  TransactionDocument,
} from '../schemas/transaction.schema';

@Injectable()
export class SeedingService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
  ) {}

  async seed() {
    if (!(await this.transactionModel.countDocuments()))
      this.transactionModel.insertMany(transactions.results);
  }
}
