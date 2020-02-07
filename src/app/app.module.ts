import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PessoaComponent } from './pages/pessoa/pessoa.component';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routing';
import { ThirdPartyModule } from './core/third-party.module';
import { MenuComponent } from './menu/menu.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { CaixaComponent } from './pages/caixa/caixa.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PessoaComponent,
    HomeComponent,
    MenuComponent,
    SideBarComponent,
    CaixaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES),
    ThirdPartyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
