import { Component, OnInit, OnDestroy, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { CaixaService } from '../caixa.service';
import { Caixa } from '../../../../models/caixa.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-caixa-form',
  templateUrl: './caixa.form.component.html',
  styleUrls: ['./caixa.form.component.scss']
})
export class CaixaFormComponent implements OnInit {

  constructor(
    private _service: CaixaService,
    private readonly _router: Router, ) { }

  ngOnInit() { }

  salvar(form) {
    this._service.salvar(form.value).subscribe((p: Caixa) => {
      if (p.codigo) {
        this._router.navigate(['/cadastro/caixa']);
      }
    });
  }

}
