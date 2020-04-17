import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material-module';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { FinantialControlComponent } from './finantial-control/finantial-control.component';
import { ExpensesComponent } from './finantial-control/expenses/expenses.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { ExpenseFormDialogComponent } from './finantial-control/expenses/expense-form-dialog/expense-form-dialog.component';
import { DefaultDialogComponent } from './util/default-dialog/default-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ExpensesCategoriesComponent } from './finantial-control/expenses-categories/expenses-categories.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    FinantialControlComponent,
    ExpensesComponent,
    ExpenseFormDialogComponent,
    DefaultDialogComponent,
    ExpensesCategoriesComponent
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
    DefaultDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
