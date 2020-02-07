import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PessoaComponent } from './pages/pessoa/pessoa.component';
import { CaixaComponent } from './pages/caixa/caixa.component';


export const ROUTES: Routes  = [
    {path: '', component: HomeComponent },
    {path: 'pessoas', component: PessoaComponent},
    {path: 'caixas', component: CaixaComponent}
];
