import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';

@NgModule({
  exports: [
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class AngularMaterialModule {}