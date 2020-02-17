import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ObjetoRoutingModule } from './objeto.rounting';
import { ObjetoListComponent } from './list/objeto.list.component';
import { ObjetoFormComponent } from './form/objeto.form.component';
import { ObjetoService } from './objeto.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    ObjetoRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [
    ObjetoListComponent,
    ObjetoFormComponent,
  ],
  providers: [
    ObjetoService,
  ]
})
export class ObjetoModule { }
