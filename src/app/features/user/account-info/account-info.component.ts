import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Country } from '../../../models/country';
import { State } from '../../../models/state';
import { User } from '../../../models/user';
import { UserModel } from '../../../models/UserModel';
import { UserDetailModel } from '../../../models/UserDetailModel';
import { GeoService } from '../../../services/geo.service';
import { AlertService } from '../../../ui/alert/alert.service';
import { UserService } from '../../service/user.service';
import { UsersService } from '../../../services/user.service';
import { Endereco } from 'src/app/models/endereco';

const USER_NAME = 'user_name';
const USER_EMAIL = 'user_email';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css'],
})
export class AccountInfoComponent implements OnInit {
  states: State[] = [];
  escolaridade: any[] = [];
  countries: Country[] = [];
  formSubmitted = false;
  user: UserModel = new UserModel();
  dataLoading = true;
  userName: string;
  userDetail: any;
  searchAddress: Endereco;
  form = new FormGroup({});

  constructor(
    private geoService: GeoService,
    private alertService: AlertService,
    private _userservice: UsersService
  ) {}

  async ngOnInit(): Promise<void> {
    this.initForm();
    this.userName = localStorage.getItem(USER_NAME);
    await this.getUserDetail();
    this.listaEscolaridade();
      this.form.patchValue({
      nome: this.userDetail['nome'],
      email: this.userDetail['email'],
      telefone: this.userDetail['telefone'],
      cep: this.userDetail['cep'],
      endereco: this.userDetail['endereco'],
      numero: this.userDetail['numeroEndereco'],
      complemento: this.userDetail['complemento'],
      cidade: this.userDetail['cidade'],
      estado: this.userDetail['estado'],
      obs: this.userDetail['obs'],
      profissao: this.userDetail['profissao'],
      escolaridade: this.userDetail['escolaridade'],
      orixa: this.userDetail['orixa'],
      valorPagamento: this.userDetail['valorPagamento'],
      diaPagamento: this.userDetail['diaPagamento'],
    });
    console.log(this.userDetail['cep'])
    if(this.userDetail['cep'] !== '' && this.userDetail['cep'] !== null){
      this.getEndereco(this.userDetail['cep']);
    }

  }
  listaEscolaridade() {
    this.escolaridade.push({
      nome: 'Primeiro Grau Completo',
      value: 'Primeiro Grau Completo',
    });
    this.escolaridade.push({
      nome: 'Segundo Grau Completo',
      value: 'Segundo Grau Completo',
    });
    this.escolaridade.push({
      nome: 'Terceiro Grau Completo',
      value: 'Terceiro Grau Completo',
    });
    this.escolaridade.push({
      nome: 'Pós Graduação',
      value: 'Pós Graduação',
    });
    this.escolaridade.push({
      nome: 'Mestrado',
      value: 'Mestrado',
    });
    this.escolaridade.push({
      nome: 'Doutorado',
      value: 'Doutorado',
    });
  }
  async getUserDetail() {
    await this._userservice
      .getUserInformation(localStorage.getItem(USER_EMAIL))
      .then((dt) => {
        this.userDetail = dt as UserModel;

      })
      .catch((err) => this.alertService.error(err.message))
      .finally(() => (this.dataLoading = false));
  }
  getEndereco(cep: string) {
    this.dataLoading = true;
    this.geoService.EnderecoPorCep(cep).subscribe(
      (address) => {
        if (address.erro === true) {
          this.searchAddress = undefined;
          this.alertService.error('Cep Não encontrado.', 'Ops...');
          this.limpaPreecheEnderco();
          this.dataLoading = false;
        } else {
          this.searchAddress = address;
          this.preecheEnderco(address);
        }
      },
      (error) => {
        this.alertService.error(`Error: ${error.message}.', 'Ops...`);
        this.searchAddress = undefined;
        this.dataLoading = false;
      }
    );
  }
  preecheEnderco(endereco: Endereco) {
    this.form.patchValue({
      endereco: endereco.logradouro,
      bairro: endereco.bairro,
      cidade: endereco.localidade,
      estado: endereco.uf,
    });
    this.dataLoading = false;
  }
  limpaPreecheEnderco() {
    this.form.patchValue({
      endereco: '',
      bairro: '',
      cidade: '',
      estado: '',
    });
    this.dataLoading = false;
  }
  private initForm() {
    this.form = new FormGroup({
      dataIniciacao: new FormControl('', [
        // Validators.required,
        // Validators.email,
      ]),
      dataNascimento: new FormControl('', [
        // Validators.required,
        // Validators.email,
      ]),
      diaPagamento: new FormControl('', [
        // Validators.required,
        // Validators.email,
      ]),

      email: new FormControl(
        { value: '', disabled: true },
        Validators.required
      ),
      empregado: new FormControl('', [
        // Validators.required,
        // Validators.email,
      ]),
      cep: new FormControl('', [
        // Validators.required,
        // Validators.email,
      ]),
      endereco: new FormControl(
        { value: '', disabled: true },
        Validators.required
      ),
      numero: new FormControl('', [
        // Validators.required,
        // Validators.email,
      ]),
      complemento: new FormControl('', [
        // Validators.required,
        // Validators.email,
      ]),
      bairro: new FormControl(
        { value: '', disabled: true },
        Validators.required
      ),
      cidade: new FormControl(
        { value: '', disabled: true },
        Validators.required
      ),
      estado: new FormControl(
        { value: '', disabled: true },
        Validators.required
      ),
      escolaridade: new FormControl('', [
        // Validators.required,
        // Validators.email,
      ]),
      nome: new FormControl('', [
        // Validators.required,
        // Validators.email,
      ]),
      obs: new FormControl('', [
        // Validators.required,
        // Validators.email,
      ]),
      orixa: new FormControl('', [
        Validators.required,
        // Validators.email,
      ]),
      profissao: new FormControl('', [
        Validators.required,
        // Validators.email,
      ]),
      telefone: new FormControl('', [
        // Validators.required,
        // Validators.email,
      ]),
      valorPagamento: new FormControl('', [
        // Validators.required,
        // Validators.email,
      ]),
    });
  }

  async update() {
    this.formSubmitted = true;
    console.log('Clearing alerts');
    this.alertService.clear();
    let ret: any;
    const userToSubmit = this.createUserToSubmit();
    await this._userservice
      .SaveUsersDetails(userToSubmit)
      .then((dt) => {
        ret = dt;
        if (dt === undefined) {
          this.alertService.error('Erro ao Alterar dados');
          this.formSubmitted = false;
        } else {
          window.scroll(0,0);
          this.alertService.success(dt.message);
          this.formSubmitted = false;
        }
      })
      .catch((err) => {
        this.alertService.error(err);
        this.formSubmitted = false;
      });
  }

  private createUserToSubmit(): any {
    const userToSubmit = new UserModel();
    userToSubmit.UserDetail = new UserDetailModel();

    userToSubmit.id =
      this.userDetail['userId'] === undefined
        ? null
        : this.userDetail['userId'];

    userToSubmit.UserDetail.iduserDetail =
      this.userDetail['iduserDetail'] === undefined
        ? null
        : this.userDetail['iduserDetail'];

    userToSubmit.UserDetail.dataNascimento =
      this.form.controls['dataNascimento'].value === undefined
        ? null
        : this.form.controls['dataNascimento'].value;
        userToSubmit.email =
      this.form.controls['email'].value === undefined
        ? null
        : this.form.controls['email'].value;
    userToSubmit.UserDetail.empregado =
      this.form.controls['empregado'].value === undefined
        ? null
        : this.form.controls['empregado'].value;

    userToSubmit.UserDetail.endereco =
      this.form.controls['endereco'].value === undefined
        ? null
        : this.form.controls['endereco'].value;
    userToSubmit.UserDetail.complemento =
      this.form.controls['complemento'].value === undefined
        ? null
        : this.form.controls['complemento'].value;

    userToSubmit.UserDetail.numero =
      this.form.controls['numero'].value === undefined
        ? null
        : this.form.controls['numero'].value;
    userToSubmit.UserDetail.cep =
      this.form.controls['cep'].value === undefined
        ? null
        : this.form.controls['cep'].value;
    userToSubmit.UserDetail.estado =
      this.form.controls['estado'].value === undefined
        ? null
        : this.form.controls['estado'].value;
    userToSubmit.UserDetail.cidade =
      this.form.controls['cidade'].value === undefined
        ? null
        : this.form.controls['cidade'].value;
    userToSubmit.UserDetail.orixa =
      this.form.controls['orixa'].value === undefined
        ? null
        : this.form.controls['orixa'].value;
    userToSubmit.UserDetail.escolaridade =
      this.form.controls['escolaridade'].value === undefined
        ? null
        : this.form.controls['escolaridade'].value;
    userToSubmit.UserDetail.dataNascimento =
      this.form.controls['dataNascimento'].value === undefined
        ? null
        : this.form.controls['dataNascimento'].value;
    userToSubmit.UserDetail.dataIniciacao =
      this.form.controls['dataIniciacao'].value === undefined
        ? null
        : this.form.controls['dataIniciacao'].value;
    userToSubmit.UserDetail.valorPagamento =
      this.form.controls['valorPagamento'].value === undefined
        ? null
        : this.form.controls['valorPagamento'].value;

    userToSubmit.UserDetail.profissao =
      this.form.controls['profissao'].value === undefined
        ? null
        : this.form.controls['profissao'].value;

    userToSubmit.UserDetail.telefone =
      this.form.controls['telefone'].value === undefined
        ? null
        : this.form.controls['telefone'].value;

    userToSubmit.UserDetail.obs =
      this.form.controls['obs'].value === undefined
        ? null
        : this.form.controls['obs'].value;

        userToSubmit.UserDetail.diaPagamento =
      this.form.controls['diaPagamento'].value === undefined
        ? null
        : this.form.controls['diaPagamento'].value;
    return userToSubmit;
  }
}
