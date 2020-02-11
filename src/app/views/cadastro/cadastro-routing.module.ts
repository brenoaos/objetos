import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PessoaComponent } from './pessoa/pessoa.component';

const routes: Routes = [
    {
        path: '',
        children: [{
            path: 'pessoa',
            component: PessoaComponent,
            data: {
                title: 'Pessoa'
            }
        }]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CadastroRoutingModule { }
