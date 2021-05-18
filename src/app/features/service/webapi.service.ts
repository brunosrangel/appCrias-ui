import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ProductsModel } from "../../models/products";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class WebapiService {
  private bearerToken: string;
  private header: HttpHeaders;
  //private apiURL: string = "https://loja-crias-api.herokuapp.com";
  private apiURL: string = 'http://localhost:3000';
  private options;

  constructor(private http: HttpClient, private router: Router) {}
  async loadConfiguration(): Promise<void> {
    this.getToken;

    this.header = new HttpHeaders({
          'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    });
     this.options = { headers: this.header}
  }

  async getToken(): Promise<void> {
    let param = {
      email: "bruno@gmail.com",
      password: "123456",
    };
    await this.http
      .get(`${this.apiURL}/user/login`)
      .toPromise()
      .then((data) => {
        this.bearerToken = data["token"];
      })
      .catch((error) => console.log(error.message));
  }
  async GetProduts(): Promise<any> {
    let retorno : any;
    let options = {headers: this.header}
    const url = `${this.apiURL}` + '/products';
    await this.http.get<any>(url,options)
    .toPromise()
    .then((data) => {retorno = data})
    .catch((err)=> {console.log(err)});

    console.log(retorno);
    return retorno;
  }

  async SaveProducts(products: ProductsModel): Promise<any> {
    this.loadConfiguration();
    let ret;

    const param = {
      name: products.name,
      qtd: products.qtd,
      description: products.description,
      price: products.price,
    };
    const options = { headers: this.header, params: param };
    debugger;

    await this.http
      .post(`${this.apiURL}/products`, options)
      .toPromise()
      .then((data) => {
        ret = data;
      })
      .catch((error) => {
        debugger;
        console.log(error);
      });
    return ret;
  }

  GetMany(): Observable<ProductsModel[]> {
   const url = `${this.apiURL}` + '/products';
    //console.log("Fetch my contacts URL is " + url);
    let ret =  this.http.get<ProductsModel[]>(url);
    return ret;
  }
}
