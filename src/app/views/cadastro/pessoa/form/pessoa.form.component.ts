import { Component, OnInit, OnDestroy, ViewChildren, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, NgForm, Validators } from '@angular/forms';
import { PessoaService } from '../pessoa.service';
import { Pessoa } from '../../../../models/pessoa.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa.form.component.html',
  styleUrls: ['./pessoa.form.component.scss']
})
export class PessoaFormComponent implements OnInit {

  pessoa: Pessoa;
  myForm: FormGroup;

  constructor(
    private _service: PessoaService,
    private readonly _router: Router,
    private readonly _activeRouter: ActivatedRoute,
    private readonly _formBuilder: FormBuilder,
    private readonly _toastyService: ToastrService,
  ) { }

  ngOnInit() {

    this.myForm = this._formBuilder.group({
      codigo: [0, []],
      nome: ['', [Validators.required]],
      sobrenome: ['', [Validators.required]],
      apelido: ['', []],
      sexo: [0, []],
      isDono: [false, []],
      isZelador: [false, []],
      bloqueado: [false, []]
    })


    this._activeRouter.params.subscribe(params => {
      const codigo = params['codigo'];
      if (!isNaN(codigo)) {
        this._service.getPessoasByID(codigo).subscribe((p) => {
          this.myForm.setValue(p);
        });
      }
    });

  }

  salvar() {
    if (this.myForm.valid) {
      this._service.salvar(this.myForm.value).subscribe((p: Pessoa) => {
        if (p.codigo) {
          this._toastyService.success('Registro incluído com sucesso!');
          this._router.navigate(['/cadastro/pessoa']);
        }
      },
        (err) => {
          this._toastyService.error(err.message, 'Erro');
        });
    }
  }


  delete() {
    let codigo = this.myForm.value.codigo;
    if (codigo !== 0) {
      this._service.deletePessoa(codigo).subscribe(
        () => {
          this._toastyService.success('Removido com sucesso!')
          this._router.navigate(['cadastro', 'pessoa'])
        },
        (err) => this._toastyService.error(err.messager, 'Erro'))
    }
  }
}
