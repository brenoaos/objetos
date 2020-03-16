import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ObjetoRoutingModule } from './objeto.rounting';
import { ObjetoListComponent } from './list/objeto.list.component';
import { ObjetoFormComponent } from './form/objeto.form.component';
import { ObjetoService } from './objeto.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    ObjetoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  declarations: [
    ObjetoListComponent,
    ObjetoFormComponent,
  ],
  providers: [
    ObjetoService,
    FormBuilder
  ]
})
export class ObjetoModule { }
