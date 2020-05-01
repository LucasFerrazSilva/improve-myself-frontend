import { FinantialParameter } from '../finantial-parameters/finantial-parameter';
import { ExpectedExpenseFormulaElementType } from './expected-expense-formula-element-type';

export interface ExpectedExpenseFormulaElement {
    id: number;
    operation: string;
    type: ExpectedExpenseFormulaElementType;
    totalValue: number;
    parameter: FinantialParameter;
}