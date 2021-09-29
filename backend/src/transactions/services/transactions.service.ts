import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Transaction,
  TransactionDocument,
} from '../schemas/transaction.schema';
import {
  Transaction as ITransaction,
  TransactionCategoryEnum,
} from '../interfaces/transaction.interface';

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

  _filterRepeatingExpenses = (expenses: Transaction[]) => {
    const descriptions = [];
    const merchants = [];
    expenses.forEach((transaction) => {
      descriptions.push(transaction.description);
      if (transaction.merchant_name) merchants.push(transaction.merchant_name);
    });

    const descriptionDuplicates = descriptions.filter(
      (description, i) => descriptions.indexOf(description) !== i,
    );

    const merchantDuplicates = merchants.filter(
      (merchant, i) => merchants.indexOf(merchant) !== i,
    );

    return expenses.filter(
      (expense) =>
        merchantDuplicates.includes(expense.merchant_name) || // edge case where a transaction has a unique description but is repeated
        descriptionDuplicates.includes(expense.description),
    );
  };

  _formatPrice = (expense: Transaction) =>
    (expense.amount = parseFloat(expense.amount.toFixed(1)));

  async findAllRepeatingExpenses(): Promise<Transaction[]> {
    const expenses: Transaction[] = await this.transactionModel
      .find()
      .or([
        { transaction_category: TransactionCategoryEnum.DIRECT_DEBIT },
        { transaction_category: TransactionCategoryEnum.PURCHASE },
      ])
      .exec();

    const repeatedexpenses = this._filterRepeatingExpenses(expenses);
    repeatedexpenses.forEach((expense) => this._formatPrice(expense));

    return repeatedexpenses;
  }
}
