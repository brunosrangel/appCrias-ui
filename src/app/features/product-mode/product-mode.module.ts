import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { ProductsComponent } from './products/products.component';
import { MatTableModule } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

export const routes = [
  { path: '', pathMatch: 'full', redirectTo: 'products' },
  { path: 'products', component: ProductsComponent }
];

@NgModule({
  declarations: [
    ProductsComponent
  ],
imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    RouterModule.forChild(routes)
]
})
export class ProductModeModule { }
