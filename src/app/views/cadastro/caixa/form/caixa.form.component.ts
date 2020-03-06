import { Component, OnInit, OnDestroy, ViewChildren, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, NgForm, Validators, FormControl } from '@angular/forms';
import { CaixaService } from '../caixa.service';
import { Caixa } from '../../../../models/caixa.model';
import { Router, ActivatedRoute } from '@angular/router';
import { isString } from 'util';
import { ModalDirective, ModalModule, BsModalService } from 'ngx-bootstrap';
import { TipoDialog } from '../dialog/tipo/tipo.componente.dialog';
import { LocalDialog } from '../dialog/local/local.componente.dialog';
import { CorDialog } from '../dialog/cor/cor.componente.dialog';
import QRCode from 'qrcode'
@Component({
  selector: 'app-caixa-form',
  templateUrl: './caixa.form.component.html',
  styleUrls: ['./caixa.form.component.scss']
})
export class CaixaFormComponent implements OnInit {

  myForm: FormGroup
  qrcode: QRCode;
  url:any

  @ViewChild('myModal') public myModal: ModalDirective;
  alertMensagem: string;
  constructor(
    private _service: CaixaService,
    private readonly _router: Router,
    private readonly _activeRouter: ActivatedRoute,
    private readonly _formBuilder: FormBuilder,
    private _dialog: BsModalService
  ) { }

  ngOnInit() {
    this.myForm = this._formBuilder.group({
      codigo: [0, []],
      tipo: [0, [Validators.required]],
      cor: [0, [Validators.required]],
      local: [0, [Validators.required]],
      altura: [0, []],
      largura: [0, []],
      caixaCodigo: [null, []],
      comprimento: [0, []],
      observacao: ['', []]
    })

    this._activeRouter.params.subscribe(params => {
      const codigo = params['codigo'];
      if (!isNaN(codigo)) {
        this._service.getCaixaByID(codigo).subscribe((c) => {
          this.myForm.setValue(c);
          this.myForm.value.observacao = c.observacao;
        });
      }
    });
  }

  salvar() {
    if (this.myForm.valid) {
      this._service.salvar(this.myForm.value).subscribe((p: Caixa) => {
        if (p.codigo) {
          QRCode.toDataURL(window.location.origin + '/#/cadastro/objeto' )
            .then(async url => {
              console.log(url)
              this.url = url
              
            })
            .catch(err => {
              console.error(err)
            })
          this.myModal.show()
          // this._router.navigate(['/cadastro/caixa']);
        }
      }, err => {
        this.alertMensagem = err.message;
        this.myModal.show()
      }
      );
    }
  }

  delete() {
    this._service.deleteCaixa(this.myForm.value.codigo).subscribe((value) => { this._router.navigate(['cadastro', 'caixa']) }, (err) => {
      console.log(err.toString())
    })
  }

  dialogTipo() {
    this._dialog.show(TipoDialog);
  }

  dialogLocal() {
    this._dialog.show(LocalDialog);
  }

  dialogCor() {
    this._dialog.show(CorDialog);
  }

}
