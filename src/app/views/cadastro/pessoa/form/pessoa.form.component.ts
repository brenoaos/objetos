import { Component, OnInit, OnDestroy, ViewChildren, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, NgForm, Validators } from '@angular/forms';
import { PessoaService } from '../pessoa.service';
import { Pessoa } from '../../../../models/pessoa.model';
import { Router, ActivatedRoute } from '@angular/router';

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
  ) { }

  ngOnInit() {

    this.myForm = this._formBuilder.group({
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
          this._router.navigate(['/cadastro/pessoa']);
        }
      });
    }
  }

}
