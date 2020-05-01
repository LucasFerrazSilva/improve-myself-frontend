import { StringDecoder } from 'string_decoder';
import { ExpectedExpenseFormulaElement } from './expected-expense-formula-element';

export interface ExpectedExpenseFormula {
    id: number;
    operation: string;
    elements: ExpectedExpenseFormulaElement[]
}