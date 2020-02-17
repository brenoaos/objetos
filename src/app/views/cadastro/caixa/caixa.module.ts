import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CaixaRoutingModule } from './caixa.rounting';
import { CaixaListComponent } from './list/caixa.list.component';
import { CaixaFormComponent } from './form/caixa.form.component';
import { CaixaService } from './caixa.service'
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    CaixaRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [
    CaixaListComponent,
    CaixaFormComponent,
  ],
  providers: [
    CaixaService,
  ]
})
export class CaixaModule { }