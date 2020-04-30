import { ExpenseCategory } from '../expenses-categories/expense-category';
import { ExpectedExpenseType } from './expected-expense-type';
import { ExpectedExpenseFormula } from './expected-expense-formula';

export interface ExpectedExpense {
    id: number;
    category: ExpenseCategory;
    type: ExpectedExpenseType;
    totalValue: number;
    formulas: ExpectedExpenseFormula[];
}