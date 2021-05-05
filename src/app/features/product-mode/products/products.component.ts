import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from "@angular/forms";
import { ProductsModel } from "src/app/models/products";
import { WebapiService } from "../../service/webapi.service";

import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  modifyActionForm = new FormGroup({
    name: new FormControl("", [
      // Validators.required,
      // Validators.email,
    ]),
    qtd: new FormControl("", [
      // Validators.required,
      // Validators.email,
    ]),
    description: new FormControl("", [
      // Validators.required,
      // Validators.email,
    ]),

    price: new FormControl("", [
      // Validators.required,
      // Validators.email,
    ]),
  });

  productsModel: ProductsModel;
  ListaProdutos: ProductsModel[];
  dataSource: MatTableDataSource<ProductsModel>;
  displayedColumns: string[] = ["name", "qtd", "price", "description"];

  columnNames = [
    {
      id: "qtd",
      value: "Quantidade",
    },
    {
      id: "name",
      value: "Produto",
    },
    {
      id: "price",
      value: "Preço Unitário",
    },
    {
      id: "description",
      value: "Descrição",
    },
    {
      id:"action",
      value: "action"
    }
  ];

  constructor(private directWebApi: WebapiService) {}

  async ngOnInit() {
    this.productsModel = new ProductsModel();
    await this.getProducts();
    this.dataSource = new MatTableDataSource(this.ListaProdutos);
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
    this.dataSource.sort = this.sort;
  }
  onSubmit() {
    let prod = new ProductsModel();
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
}
