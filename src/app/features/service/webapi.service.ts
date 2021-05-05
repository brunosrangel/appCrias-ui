import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductsModel } from '../../models/products';

@Injectable({
  providedIn: 'root'
})
export class WebapiService {
  private bearerToken: string;
  private header: HttpHeaders;
  //private apiURL : string = 'https://loja-crias-api.herokuapp.com';
  private apiURL: string = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }
  async loadConfiguration(): Promise<void> {
    this.getToken;
    this.header = new HttpHeaders({ Authorization: this.bearerToken, 'Content-Type': 'application/json' });

  }



// constructor(private http : HttpClient, private productsModel :ProductsModel ) { }
async getToken() : Promise<void>{
  let param = {
    "email" : "bruno@gmail.com",
    "password" :"123456"
  }
this.httpClient.get(`${this.apiURL}/user/login`).toPromise()
.then((data)=> {this.bearerToken = data['token']})
.catch(error => console.log(error.message))
}
  async GetProduts() : Promise<any> {
    this.loadConfiguration();
    let retorno;
  await this.httpClient.get(`${this.apiURL}/products`).toPromise().then(data=> {retorno = data});
  console.log(retorno)
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
    const options = { headers: this.header , params : param};
    debugger;

    await this.httpClient
      .post(`${this.apiURL}/products`, options )
      .toPromise()
      .then((data) => {
        ret = data;
      })
      .catch((error) => {
        debugger
        console.log(error);
      });
    return ret;
  }
}
