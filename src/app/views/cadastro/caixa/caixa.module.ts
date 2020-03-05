import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CaixaRoutingModule } from './caixa.rounting';
import { CaixaListComponent } from './list/caixa.list.component';
import { CaixaFormComponent } from './form/caixa.form.component';
import { CaixaService } from './caixa.service'
import { HttpClientModule } from '@angular/common/http';
import { ModalModule, BsModalRef } from 'ngx-bootstrap';
import { TipoDialog } from './dialog/tipo/tipo.componente.dialog';

@NgModule({
  imports: [
    CommonModule,
    CaixaRoutingModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    CaixaListComponent,
    CaixaFormComponent,
    TipoDialog,
  ],
  providers: [
    CaixaService,
    BsModalRef,
  ]
})
export class CaixaModule { }
