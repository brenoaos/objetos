import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        children: [{
            path: 'pessoa',
            loadChildren: () => import('./pessoa/pessoa.module').then(m => m.PessoaModule),
            data: {
                title: 'Cadastro'
            }
        },

        {
            path: 'caixa',
            loadChildren: () => import('./caixa/caixa.module').then(m => m.CaixaModule),
            data: {
                title: 'Cadastro'
            },

        },
        {
            path: 'objeto',
            loadChildren: () => import('./objeto/objeto.module').then(m => m.ObjetoModule),
            data: {
                title: 'Cadastro'
            },

        }
    ]
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CadastroRoutingModule { }
