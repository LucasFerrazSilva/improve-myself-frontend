import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material-module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExpenseCategoryFormDialogComponent } from './finantial-control/expenses-categories/expense-category-form-dialog/expense-category-form-dialog.component';
import { ExpensesCategoriesComponent } from './finantial-control/expenses-categories/expenses-categories.component';
import { ExpensesPerMonthComponent } from './finantial-control/expenses-per-month/expenses-per-month.component';
import { ExpenseFormDialogComponent } from './finantial-control/expenses/expense-form-dialog/expense-form-dialog.component';
import { ExpensesComponent } from './finantial-control/expenses/expenses.component';
import { FinantialControlComponent } from './finantial-control/finantial-control.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { DefaultDialogComponent } from './util/default-dialog/default-dialog.component';
import { FinantialParametersComponent } from './finantial-control/finantial-parameters/finantial-parameters.component';
import { FinantialParameterFormDialogComponent } from './finantial-control/finantial-parameters/finantial-parameter-form-dialog/finantial-parameter-form-dialog.component';
import { ExpectedExpenseComponent } from './finantial-control/expected-expense/expected-expense.component';
import { ExpectedExpenseFormDialogComponent } from './finantial-control/expected-expense/expected-expense-form-dialog/expected-expense-form-dialog.component';
import { AccountsComponent } from './finantial-control/accounts/accounts.component';
import { AccountFormDialogComponent } from './finantial-control/accounts/account-form-dialog/account-form-dialog.component';
import { InvestmentsComponent } from './finantial-control/investments/investments.component';
import { InvestmentFormDialogComponent } from './finantial-control/investments/investment-form-dialog/investment-form-dialog.component';
import { InvestmentDetailsComponent } from './finantial-control/investments/investment-details/investment-details.component';
import { InvestmentDetailHistoryComponent } from './finantial-control/investments/investment-details/investment-detail-history/investment-detail-history.component';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    FinantialControlComponent,
    ExpensesComponent,
    ExpenseFormDialogComponent,
    DefaultDialogComponent,
    ExpensesCategoriesComponent,
    ExpenseCategoryFormDialogComponent,
    ExpensesPerMonthComponent,
    FinantialParametersComponent,
    FinantialParameterFormDialogComponent,
    ExpectedExpenseComponent,
    ExpectedExpenseFormDialogComponent,
    AccountsComponent,
    AccountFormDialogComponent,
    InvestmentsComponent,
    InvestmentFormDialogComponent,
    InvestmentDetailsComponent,
    InvestmentDetailHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    MatDatepickerModule,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  entryComponents: [
    ExpenseFormDialogComponent,
    ExpenseCategoryFormDialogComponent,
    ExpectedExpenseFormDialogComponent,
    DefaultDialogComponent,
    AccountFormDialogComponent,
    InvestmentFormDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
