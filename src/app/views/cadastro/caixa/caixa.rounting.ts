import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CaixaListComponent } from './list/caixa.list.component';
import { CaixaFormComponent } from './form/caixa.form.component';
import { TipoDialog } from './dialog/tipo/tipo.componente.dialog';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Caixa',
        },
        component: CaixaListComponent,
    },
    {
        path: 'form',
        data: { title: 'Caixa' },
        component: CaixaFormComponent
    },
    {
        path: 'form/:codigo',
        data: { title: 'Caixa' },
        component: CaixaFormComponent
    },
    {
        path: 'tipo',
        data: { title: 'Caixa' },
        component: TipoDialog
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CaixaRoutingModule { }





