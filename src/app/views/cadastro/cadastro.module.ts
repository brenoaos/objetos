import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CadastroRoutingModule } from './cadastro-routing.module';
import { PessoaComponent } from './pessoa/pessoa.component';



@NgModule({
    imports: [
      CommonModule,
      CadastroRoutingModule,
      FormsModule
    ],
    declarations: [
        PessoaComponent
    ]


})
export class CadastroModule { }
