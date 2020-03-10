import { Component, OnInit, Input, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BsModalRef } from 'ngx-bootstrap';
import { urlApi } from '../../../../../app.api';
import { Objeto } from '../../../../../models/objeto.model';


// @Component({
//     selector: 'app-caixa-form',
//     templateUrl: './caixa.form.component.html',
//     styleUrls: ['./caixa.form.component.scss']
//   })
//   export class CaixaFormComponent implements OnInit {
  

@Component({
    selector: 'indoor.component.dialog',
    templateUrl: './indoor.component.dialog.html',
})
export class IndoorDialog implements OnInit {

    itens: Objeto[] = [];
    

    constructor(public bsModalRef: BsModalRef) {
        console.log(JSON.stringify(this.itens))
     }

    ngOnInit() {

    }
}