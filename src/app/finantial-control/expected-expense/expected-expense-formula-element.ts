import { ExpectedExpenseType } from './expected-expense-type';
import { ExpenseCategory } from '../expenses-categories/expense-category';

export interface ExpectedExpenseFormulaElement {
    id: number;
    operation: string;
    type: ExpectedExpenseType;
    value: number;
    category: ExpenseCategory;
}