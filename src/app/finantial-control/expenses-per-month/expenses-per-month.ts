import { ExpensePerMonthValues } from './expenses-per-month-values';
import { ExpenseCategory } from '../expenses-categories/expense-category';

export interface ExpensesPerMonth {
    category: ExpenseCategory;
    values: ExpensePerMonthValues;
    totalValue: number;
}