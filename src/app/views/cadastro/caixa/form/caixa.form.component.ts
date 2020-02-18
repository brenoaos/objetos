import { Component, OnInit, OnDestroy, ViewChildren, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, NgForm, Validators, FormControl } from '@angular/forms';
import { CaixaService } from '../caixa.service';
import { Caixa } from '../../../../models/caixa.model';
import { Router, ActivatedRoute } from '@angular/router';
import { isString } from 'util';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-caixa-form',
  templateUrl: './caixa.form.component.html',
  styleUrls: ['./caixa.form.component.scss']
})
export class CaixaFormComponent implements OnInit {
  @ViewChild('form') form: NgForm

  constructor(
    private _service: CaixaService,
    private readonly _router: Router,
    private readonly _activeRouter: ActivatedRoute) { }

  ngOnInit() {
    // this.form.setValue({ codigo: 0 })
    this._activeRouter.params.subscribe(params => {
      const codigo = params['codigo'];
      if (!isNaN(codigo)) {
        this._service.getCaixaByID(codigo).subscribe((c) => {
          this.form.setValue(c);
        });
      }
    });
  }

  salvar(form) {
    this._service.salvar(form.value).subscribe((p: Caixa) => {
      if (p.codigo) {
        this._router.navigate(['/cadastro/caixa']);
      }
    });
  }

  delete(codigo) {
    this._service.deleteCaixa(codigo).subscribe((value) => {this._router.navigate(['cadastro', 'caixa'])}, (err)=> {
      console.log(err.toString())
    })
  }

 }
