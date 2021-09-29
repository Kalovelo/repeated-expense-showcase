import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Transaction,
  TransactionDocument,
} from '../schemas/transaction.schema';
import { TransactionCategoryEnum } from '../interfaces/transaction.interface';
import RepeatingExpense from '../interfaces/repeatingExpense.interface';

interface ExpenseArchive {
  descriptionBased: {
    expenses: Transaction[];
    descriptions: string[];
  };
  merchantBased: {
    expenses: Transaction[];
    merchants: string[];
  };
}
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

  /**
   * Checks if the second expense is latest
   * @param  {Transaction} expenseA The first expense
   * @param  {Transaction} expenseB The second expense
   * @return {Boolean}  returns 1 if expense2 is latest
   */
  _sortByTimeReducer(expenseA: Transaction, expenseB: Transaction) {
    const dateA = new Date(expenseA.meta.transaction_time);
    const dateB = new Date(expenseB.meta.transaction_time);
    return dateA < dateB ? 1 : -1;
  }

  /**
   * Finds the latest repeating expenses.
   * @param  {Transaction[]} expenses All the (unfiltered) expenses
   * @return {Transaction[]}  returns the latest repeating expenses
   */
  _filterRepeatingExpenses = (expenses: Transaction[]): Transaction[] => {
    // An object for handling both usual and edge cases
    const expensesArchive: ExpenseArchive = {
      descriptionBased: {
        expenses: [],
        descriptions: [],
      },
      merchantBased: {
        expenses: [],
        merchants: [],
      },
    };

    expenses.forEach((expense) => {
      if (expense.merchant_name) {
        expensesArchive.merchantBased.expenses.push(expense);
        expensesArchive.merchantBased.merchants.push(expense.merchant_name);
      } else {
        expensesArchive.descriptionBased.expenses.push(expense);
        expensesArchive.descriptionBased.descriptions.push(expense.description);
      }
    });

    // Get unique values
    const descriptions = new Set(expensesArchive.descriptionBased.descriptions);
    const merchants = new Set(expensesArchive.merchantBased.merchants);
    const filteredExpenses: Transaction[] = [];

    // if an expense has no similar expenses, then it is not repeatitive, therefore skip it
    descriptions.forEach((description) => {
      const similarExpenses = expensesArchive.descriptionBased.expenses.filter(
        (descriptionExpense) => description === descriptionExpense.description,
      );
      if (similarExpenses.length < 2) return;
      similarExpenses.sort(this._sortByTimeReducer);
      filteredExpenses.push(similarExpenses[0]);
    });
    merchants.forEach((merchant) => {
      const similarExpenses = expensesArchive.merchantBased.expenses.filter(
        (merchantExpense) => merchant === merchantExpense.merchant_name,
      );
      if (similarExpenses.length < 2) return;
      similarExpenses.sort(this._sortByTimeReducer);
      filteredExpenses.push(similarExpenses[0]);
    });

    return filteredExpenses;
  };

  /**
   * Formats price.
   * @param  {Transaction} expense (pass by reference)
   */
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

    const repeatingExpenses = this._filterRepeatingExpenses(expenses);

    const formattedRepeatingExpenses: RepeatingExpense[] = [];
    repeatingExpenses.forEach((expense) => {
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
