import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Transaction,
  TransactionDocument,
} from '../schemas/transaction.schema';
import { TransactionCategoryEnum } from '../interfaces/transaction.interface';
import RepeatingExpense from '../interfaces/repeatingExpense.interface';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
  ) {}

  async findAll(): Promise<Transaction[]> {
    const transactions = await this.transactionModel.find();
    if (!transactions)
      throw new NotFoundException('No transactions were found.');
    return transactions;
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

  async findAllRepeatingExpenses(): Promise<RepeatingExpense[]> {
    const expenses: Transaction[] = await this.transactionModel
      .find()
      .or([
        { transaction_category: TransactionCategoryEnum.DIRECT_DEBIT },
        { transaction_category: TransactionCategoryEnum.PURCHASE },
      ])
      .exec();

    const repeatedexpenses = this._filterRepeatingExpenses(expenses);

    const formattedRepeatingExpenses: RepeatingExpense[] = [];
    repeatedexpenses.forEach((expense) => {
      this._formatPrice(expense);
      const newRepeatingExpense: RepeatingExpense = {
        transaction_amount: expense.amount,
        transaction_date: expense.meta.transaction_time,
        transaction_description: expense.description,
      };

      formattedRepeatingExpenses.push(newRepeatingExpense);
    });

    if (!formattedRepeatingExpenses)
      throw new NotFoundException('There are no repeating expenses.');

    return formattedRepeatingExpenses;
  }
}
