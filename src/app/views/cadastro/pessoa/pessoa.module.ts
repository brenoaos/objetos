import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PessoaRoutingModule } from './pessoa.rounting';
import { PessoaListComponent } from './list/pessoa.list.component';
import { PessoaFormComponent } from './form/pessoa.form.component';
import { PessoaService } from './pessoa.service'
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    PessoaRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    PessoaListComponent,
    PessoaFormComponent,
  ],
  providers: [
    PessoaService,
    FormBuilder
  ]
})
export class PessoaModule { }
