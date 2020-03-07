import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CadastroRoutingModule } from './cadastro-routing.module';
import { PessoaModule } from './pessoa/pessoa.module';
import { CaixaModule } from './caixa/caixa.module';
import { ObjetoModule } from './objeto/objeto.module';



@NgModule({
    imports: [
      CommonModule,
      PessoaModule,
      CaixaModule,
      ObjetoModule,
      CadastroRoutingModule,
      FormsModule
    ],
})
export class CadastroModule { }
