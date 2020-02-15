import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PessoaRoutingModule } from './pessoa.rounting';
import { PessoaListComponent } from './list/pessoa.list.component';
import { PessoaFormComponent } from './form/pessoa.form.component';
import { PessoaService } from './pessoa.service'
import { CompDropdownsComponent } from '../../../core/components/dropdown/dropdowns.component';



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
    PessoaService
  ]
})
export class PessoaModule { }
