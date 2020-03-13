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
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import {Subject, Observable, Subscription} from 'rxjs/';
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
  novoRegistro: boolean = true;

  @ViewChild('myModal') public myModal: ModalDirective;
  @ViewChild('itemModal') public itemModal: ModalDirective;
  @ViewChild('inputLocal') public inputLocal: FormControl


  alertMensagem: string;
  constructor(
    private _service: CaixaService,
    private readonly _router: Router,
    private readonly _activeRouter: ActivatedRoute,
    private readonly _formBuilder: FormBuilder,
    private _dialog: BsModalService,
    private readonly _toastyService: ToastyService,
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

    this._activeRouter.params.subscribe(params => {
      const codigo = params['codigo'];
      if (!isNaN(codigo)) {
        this._service.getCaixaByID(codigo).subscribe((c) => {
          this.novoRegistro = false;
          this.myForm.setValue(c)
        });
      }
    });

    this.getTipos();
    this.getCores();
    this.getLocais();
    this.getCaixas();
  }




  addToast() {
    // Just add default Toast with title only
    this._toastyService.default('Hi there');
    // Or create the instance of ToastOptions
    var toastOptions: ToastOptions = {
      title: "My title",
      msg: "The message",
      showClose: true,
      timeout: 5000,
      theme: 'default',
      onAdd: (toast: ToastData) => {
        console.log('Toast ' + toast.id + ' has been added!');
      },
      onRemove: function (toast: ToastData) {
        console.log('Toast ' + toast.id + ' has been removed!');
      }
    };
    // Add see all possible types in one shot
    this._toastyService.info(toastOptions);
    this._toastyService.success(toastOptions);
    this._toastyService.wait(toastOptions);
    this._toastyService.error(toastOptions);
    this._toastyService.warning(toastOptions);
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
    console.log(`codigo do formulario ${this.myForm.value.codigo}`);
    this._service.getCaixas(filter).subscribe((t: any) => {
      t.registros.forEach(caixa => {
        if (caixa.codigo !== this.myForm.value.codigo) {
          this._service.getCorByID(caixa.cor).subscribe(cor => {
            caixa.cor = cor;
            this._service.getTipoByID(caixa.tipo).subscribe(tipo => {
              caixa.tipo = tipo;
              this._service.getLocalByID(caixa.local).subscribe(local => {
                caixa.local = local
                this.caixas.push(caixa);
              })
            })
          })
        }
      })
    });
  }


  salvar() {
    if (this.myForm.valid) {
      this._service.salvar(this.myForm.value).subscribe((p: Caixa) => {
        if (this.novoRegistro) {
          this.myModal.show()
        }
        else {
          this._router.navigate(['cadastro', 'caixa'])
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
