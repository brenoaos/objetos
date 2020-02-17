import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ObjetoListComponent } from './list/objeto.list.component'
import { ObjetoFormComponent } from './form/objeto.form.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Objeto',
        },
        component: ObjetoListComponent,
    },
    {
        path: 'form',
        data: {
            title: 'Objeto'
        },
        component: ObjetoFormComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ObjetoRoutingModule { }
