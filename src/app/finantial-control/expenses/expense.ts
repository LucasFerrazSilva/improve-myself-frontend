import { ExpenseCategory } from '../expenses-categories/expense-category';

export interface Expense {
    id: number;
    name: string;
    amount: number;
    expenseDate: Date;
    category: ExpenseCategory;
}