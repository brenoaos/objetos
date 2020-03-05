import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PessoaRoutingModule } from './pessoa.rounting';
import { PessoaListComponent } from './list/pessoa.list.component';
import { PessoaFormComponent } from './form/pessoa.form.component';
import { PessoaService } from './pessoa.service'
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    PessoaRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    PessoaListComponent,
    PessoaFormComponent,
  ],
  providers: [
    PessoaService,
  ]
})
export class PessoaModule { }
