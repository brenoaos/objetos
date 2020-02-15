import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CadastroRoutingModule } from './cadastro-routing.module';
import { PessoaModule } from './pessoa/pessoa.module';



@NgModule({
    imports: [
      CommonModule,
      PessoaModule,
      CadastroRoutingModule,
      FormsModule
    ],
})
export class CadastroModule { }
