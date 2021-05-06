import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ProductsModel } from 'src/app/models/products';
import { WebapiService } from '../../service/webapi.service';

import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { DropdownService } from '../../ui/service/dropdown.service';
import { AlertService } from 'src/app/ui/alert/alert.service';
import { ContactService } from '../../service/contact.service';
import { UserService } from '../../service/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  modifyActionForm = new FormGroup({
    name: new FormControl('', [
      // Validators.required,
      // Validators.email,
    ]),
    qtd: new FormControl('', [
      // Validators.required,
      // Validators.email,
    ]),
    description: new FormControl('', [
      // Validators.required,
      // Validators.email,
    ]),

    price: new FormControl('', [
      // Validators.required,
      // Validators.email,
    ]),
  });

  productsModel: ProductsModel;
  ListaProdutos: ProductsModel[];
  dataSource: MatTableDataSource<ProductsModel>;

  displayedColumns: string[] = [
    'action',
    'name',
    'description',
    'qtd',
    'price',
    ];
  currentUser: User;
  dataLoading = true;
  tipoOperacao = 'Adcionar Produto';
  statusFilter = new FormControl('');
  sourceFilter = new FormControl('');
  filterValues: any = {
    status: '',
    source: '',
  };

  // columnNames = [
  //   {
  //     id: "qtd",
  //     value: "Quantidade",
  //   },
  //   {
  //     id: "name",
  //     value: "Produto",
  //   },
  //   {
  //     id: "price",
  //     value: "Preço Unitário",
  //   },
  //   {
  //     id: "description",
  //     value: "Descrição",
  //   },
  //   {
  //     id:"action",
  //     value: "action"
  //   }
  // ];

  constructor(
    private directWebApi: WebapiService,
    private userService: UserService,
    private contactService: ContactService,
    private alertService: AlertService,
    private dropdownService: DropdownService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.productsModel = new ProductsModel();
    await this.getProducts();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async getProducts() {
    await this.directWebApi
      .GetProduts()
      .then((data) => {
        this.ListaProdutos = data.products as ProductsModel[];
      })
      .catch((error) => {
        console.log(error);
      });

    this.dataSource = new MatTableDataSource(this.ListaProdutos);
     this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataLoading = false;
  }
  onSubmit() {
    const prod = new ProductsModel();
    (prod.name = this.modifyActionForm.value.name),
      (prod.description = this.modifyActionForm.value.description),
      (prod.price = this.modifyActionForm.value.price),
      (prod.qtd = this.modifyActionForm.value.qtd);

    this.directWebApi
      .SaveProducts(prod)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  clearFilter() {
    this.sourceFilter.setValue('');

  }
}
