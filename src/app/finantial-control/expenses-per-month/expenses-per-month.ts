import { ExpenseCategory } from '../expenses-categories/expense-category';
import { ExpensePerMonthValues } from './expenses-per-month-values';

export interface ExpensesPerMonth {
    category: ExpenseCategory;
    values: ExpensePerMonthValues;
    expectedValuePerMonth: number;
    totalValue: number;
}