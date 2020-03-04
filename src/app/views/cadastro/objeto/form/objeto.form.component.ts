import { Component, OnInit, OnDestroy, ViewChildren, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, NgForm, Validators } from '@angular/forms';
import { ObjetoService } from '../objeto.service';
import { Objeto } from '../../../../models/objeto.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Pessoa } from '../../../../models/pessoa.model';
import { PessoaModule } from '../../pessoa/pessoa.module';
import { PessoaService } from '../../pessoa/pessoa.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-objeto-form',
  templateUrl: './objeto.form.component.html',
  styleUrls: ['./objeto.form.component.scss']
})
export class ObjetoFormComponent implements OnInit {
  pessoas: Pessoa[];
  @ViewChild('form') form: NgForm;

  myForm: FormGroup;

  constructor(
    private _service: ObjetoService,
    private readonly _router: Router,
    private readonly _pessoaService: PessoaService,
    private readonly _activeRouter: ActivatedRoute,
    private readonly _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.myForm = this._formBuilder.group({
      codigo: [0, []],
      nome: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      altura:[0.00, []],
      largura:[0.00, []],
      comprimento:[0.00, []],
      peso:[0.00, []],
      cor: ['', []],
      material: ['', []],
      tensao: [0, []],
      donoCodigo: [null, [Validators.required]],
      zeladorCodigo: [null, []],
      dataValidade: [null, []],
      chaveAcessoNotaFiscal: ['', []],
      observacao: ['', []]
    })


    this._activeRouter.params.subscribe(params => {
      const codigo = params['codigo'];
      if (!isNaN(codigo)) {
        this._service.getObjetosById(codigo).subscribe((p) => {
          console.log(JSON.stringify(p))
          this.myForm.setValue(p);
        });
      }
    });
  }

  salvar() {
    this._service.salvar(this.myForm.value).subscribe((p: Objeto) => {
      if (p.codigo) {
        this._router.navigate(['/cadastro/objeto']);
      }
    });
  }

  getPessoas(formInput?: any) {
    debugger;
    let filter = {};

    if (formInput) {
      filter = {
        like: [
          { 'nome': formInput.value },
          { 'sobrenome': formInput.value },
        ],
        where: [{"codigo": this.myForm.value.codigo}],
        'isDono': true
      };
    }
    this._pessoaService.getPessoas(filter).subscribe((p) => {
      debugger;
      this.pessoas = p.registros;
    });
  }

  delete(codigo?: number): void {
    if(!codigo) codigo = this.myForm.value.codigo;    
    this._service.deleteObjeto(codigo).subscribe();
  }

  
}
