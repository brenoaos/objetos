import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PessoaListComponent } from './list/pessoa.list.component'
import { PessoaFormComponent } from './form/pessoa.form.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Pessoa',
        },
        component: PessoaListComponent,
    },
    {
        path: 'edit',
        data: {
            title: 'Pessoa'
        },
        component: PessoaFormComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PessoaRoutingModule { }





