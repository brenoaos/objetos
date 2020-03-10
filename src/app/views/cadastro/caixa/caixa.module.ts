import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CaixaRoutingModule } from './caixa.rounting';
import { CaixaListComponent } from './list/caixa.list.component';
import { CaixaFormComponent } from './form/caixa.form.component';
import { CaixaService } from './caixa.service'
import { HttpClientModule } from '@angular/common/http';
import { ModalModule, BsModalRef, BsModalService } from 'ngx-bootstrap';
import { TipoDialog } from './dialog/tipo/tipo.componente.dialog';
import { LocalDialog } from './dialog/local/local.componente.dialog';
import { CorDialog } from './dialog/cor/cor.componente.dialog';
import { QRCodeModule } from 'angularx-qrcode'
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { IndoorDialog } from './dialog/indoor/indoor.componente.dialog';

@NgModule({
  imports: [
    CommonModule,
    CaixaRoutingModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    QRCodeModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    CaixaListComponent,
    CaixaFormComponent,
    TipoDialog,
    LocalDialog,
    CorDialog,
    IndoorDialog
  ],
  providers: [
    CaixaService,
    BsModalRef,
    ToastrService,
    BsModalService,
  ]
})
export class CaixaModule { }
