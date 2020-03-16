import { Component, OnInit, OnDestroy, ViewChildren, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, NgForm, Validators } from '@angular/forms';
import { ObjetoService } from '../objeto.service';
import { Objeto } from '../../../../models/objeto.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Pessoa } from '../../../../models/pessoa.model';
import { PessoaModule } from '../../pessoa/pessoa.module';
import { PessoaService } from '../../pessoa/pessoa.service';
import { stringify } from 'querystring';
import { CaixaService } from '../../caixa/caixa.service';
import { Caixa } from '../../../../models/caixa.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-objeto-form',
  templateUrl: './objeto.form.component.html',
  styleUrls: ['./objeto.form.component.scss']
})
export class ObjetoFormComponent implements OnInit {
  pessoas: Pessoa[];
  @ViewChild('form') form: NgForm;

  myForm: FormGroup;
  caixas: Caixa[] = [];
  novoRegistro: boolean = true;

  constructor(
    private _service: ObjetoService,
    private readonly _router: Router,
    private readonly _pessoaService: PessoaService,
    private readonly _caixaService: CaixaService,
    private readonly _activeRouter: ActivatedRoute,
    private readonly _formBuilder: FormBuilder,
    private readonly _toastyService: ToastrService,
  ) { }

  ngOnInit() {
    this.myForm = this._formBuilder.group({
      codigo: [0, []],
      nome: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      altura: [0.00, []],
      largura: [0.00, []],
      comprimento: [0.00, []],
      peso: [0.00, []],
      cor: [0, []],
      material: [0, []],
      tensao: [0, []],
      donoCodigo: [0, [Validators.required]],
      caixaCodigo: [0, []],
      zeladorCodigo: [0, []],
      dataValidade: [null, []],
      chaveAcessoNotaFiscal: ['', []],
      observacao: ['', []]
    })

    this.getCaixas();
    this.getPessoas();

    this._activeRouter.params.subscribe(params => {
      const codigo = params['codigo'];
      if (!isNaN(codigo)) {
        this._service.getObjetosById(codigo).subscribe((p) => {
          console.log(JSON.stringify(p))
          this.myForm.setValue(p);
          this.novoRegistro = false
        }, (err) => {
          this._toastyService.error(err.message, 'Erro')
        });
      }
    });
  }

  salvar() {
    this._service.salvar(this.myForm.value).subscribe((p: Objeto) => {
      if (this.novoRegistro) {
        this._toastyService.success('Registro incluído com sucesso!');
      } else {
        this._toastyService.success('Registro Alterado com sucesso!');
      }

      this._router.navigate(['/cadastro/objeto']);
      
    }, (err) => this._toastyService.error(err.message, 'Erro'));
  }

  getPessoas(formInput?: any) {
    let filter = {};

    if (formInput) {
      filter = {
        like: [
          { 'nome': formInput.value },
          { 'sobrenome': formInput.value },
        ],
        where: [{ "codigo": this.myForm.value.codigo }],
        'isDono': true
      };
    }
    this._pessoaService.getPessoas(filter).subscribe((p) => {
      this.pessoas = p.registros;
    }, (err) => {
      this._toastyService.error(err.message, 'Erro')
    });
  }

  getCaixas() {
    this._caixaService.getCaixas().subscribe(c => {
      this.caixas = c.registros
      this.caixas.forEach(c => {
        this._caixaService.getCorByID(c.cor).subscribe((t) => c.cor = t)
        this._caixaService.getTipoByID(c.tipo).subscribe((t) => c.tipo = t)
        this._caixaService.getLocalByID(c.local).subscribe((t) => c.local = t)
      })
    });
  }

  delete(codigo?: number): void {
    if (!codigo) codigo = this.myForm.value.codigo;
    this._service.deleteObjeto(codigo).subscribe(null, err => this._toastyService.error(err.message, 'Erro'));
  }

}
