import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CaixaService } from '../caixa.service';
import { Caixa } from '../../../../models/caixa.model';
import { Objeto } from '../../../../models/objeto.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDirective, BsModalService, ModalOptions } from 'ngx-bootstrap';
import { TipoDialog } from '../dialog/tipo/tipo.componente.dialog';
import { LocalDialog } from '../dialog/local/local.componente.dialog';
import { CorDialog } from '../dialog/cor/cor.componente.dialog';
// import QRCode from 'qrcode'
@Component({
  selector: 'app-caixa-form',
  templateUrl: './caixa.form.component.html',
  styleUrls: ['./caixa.form.component.scss']
})
export class CaixaFormComponent implements OnInit {

  myForm: FormGroup;
  tipos: string[] = [];
  cores: string[] = [];
  locais: string[] = [];
  caixas: string[] = [];
  url: any
  itens: Objeto[];

  @ViewChild('myModal') public myModal: ModalDirective;
  @ViewChild('itemModal') public itemModal: ModalDirective;
  @ViewChild('inputLocal') public inputLocal: FormControl


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
      tipo: ['', [Validators.required]],
      cor: ['', [Validators.required]],
      local: ['', [Validators.required]],
      altura: [0, []],
      largura: [0, []],
      caixaCodigo: [null, []],
      comprimento: [0, []],
      observacao: ['', []]
    })

    this.getTipos();
    this.getCores();
    this.getLocais();
    this.getCaixas();

    this._activeRouter.params.subscribe(params => {
      const codigo = params['codigo'];
      if (!isNaN(codigo)) {
        this._service.getCaixaByID(codigo).subscribe((c) => {
          this.myForm.setValue(c)
        });
      }
    });
  }

  getTipoById(caixa, callback) {
    this._service.getTipoByID(caixa.tipo).subscribe((t: any) => {
      caixa.tipo = t.codigo + ' | ' + t.descricao;
      callback(caixa)
    });
  }

  getLocalById(caixa, callback) {
    this._service.getLocalByID(caixa.local).subscribe((t: any) => {
      caixa.local = t.codigo + ' | ' + t.descricao;
      callback(caixa)
    });
  }
  getCorById(caixa, callback) {
    this._service.getCorByID(caixa.cor).subscribe((t: any) => {
      caixa.cor = t.codigo + ' | ' + t.descricao;
      callback(caixa)
    });
  }

  getTipos(filter?: any) {
    this._service.getTipos(filter).subscribe((t: any) => {
      t.registros.forEach(tipos => {
        this.tipos.push(tipos);
      })
    });
  }

  getCores(filter?: any) {
    this._service.getCores(filter).subscribe((t: any) => {
      t.registros.forEach(cor => {
        this.cores.push(cor);
      })
    });
  }

  getLocais(filter?: any) {
    this._service.getLocais(filter).subscribe((t: any) => {
      t.registros.forEach(local => {
        this.locais.push(local);
      })
    });
  }

  getCaixas(filter?: any) {
    this._service.getCaixas(filter).subscribe((t: any) => {
      t.registros.forEach(caixa => {
        this.caixas.push(caixa.codigo + ' | ' + caixa.descricao);
      })
    });
  }


  salvar() {
    if (this.myForm.valid) {
      this._service.salvar(this.myForm.value).subscribe((p: Caixa) => {
        if (p.codigo) {
          let modal = this.myModal;
          modal.show()
        }
      }, err => {
        this.alertMensagem = err.message;
        this.myModal.show()
      }
      );
    }
  }

  listarItens() {
    if (this.myForm.value.codigo) {
      let filtro = {
        caixaCodigo: this.myForm.value.codigo
      };

      this._service.getItens(filtro).subscribe((d) => {
        this.itens = d.registros;
        this.itemModal.show();
      })
    }
  }

  delete() {
    this._service.deleteCaixa(this.myForm.value.codigo).subscribe((value) => { this._router.navigate(['cadastro', 'caixa']) }, (err) => {
      console.log(err.toString())
    })
  }

  dialogTipo() {
    this._dialog.show(TipoDialog, {
      keyboard: true,
    })

  }

  dialogCor() {
    this._dialog.show(CorDialog, {
      keyboard: true,
    })
    this.getCores();
  }

  dialogLocal() {
    this._dialog.show(LocalDialog, {
      keyboard: true,
    })
  }

}
