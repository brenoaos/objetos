import { Component, OnInit, OnDestroy, ViewChildren, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, NgForm } from '@angular/forms';
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
  @ViewChild('form') form: NgForm;

  constructor(
    private _service: PessoaService,
    private readonly _router: Router,
    private readonly _activeRouter: ActivatedRoute
  ) { }

  ngOnInit(

  ) {
    this._activeRouter.params.subscribe(params => {
      
      
      const codigo = params['codigo'];
      if (!isNaN(codigo)) {
        this._service.getPessoasByID(codigo).subscribe((p) => {
          this.form.setValue(p);
        });
      }
    });

  }

  salvar(form) {
    this._service.salvar(form.value).subscribe((p: Pessoa) => {
      if (p.codigo) {
        this._router.navigate(['/cadastro/pessoa']);
      }
    });
  }

}
