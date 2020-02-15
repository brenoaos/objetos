import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PessoaRoutingModule } from './pessoa.rounting';
import { PessoaListComponent } from './list/pessoa.list.component';
import { PessoaFormComponent } from './form/pessoa.form.component';
import { PessoaService } from './pessoa.service'
import { HttpClient } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    PessoaRoutingModule,
    FormsModule
  ],
  declarations: [
    PessoaListComponent,
    PessoaFormComponent,
  ],
  providers: [
    PessoaService,
    HttpClient
  ]
})
export class PessoaModule { }
