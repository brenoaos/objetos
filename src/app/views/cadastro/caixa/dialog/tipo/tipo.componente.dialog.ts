import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BsModalRef } from 'ngx-bootstrap';
import { urlApi } from '../../../../../app.api';


// @Component({
//     selector: 'app-caixa-form',
//     templateUrl: './caixa.form.component.html',
//     styleUrls: ['./caixa.form.component.scss']
//   })
//   export class CaixaFormComponent implements OnInit {
  

@Component({
    selector: 'tipo.component.dialog.html',
    templateUrl: './tipo.component.dialog.html',
})
export class TipoDialog implements OnInit {

    myForm: FormGroup;
    url: string = `${urlApi()}/caixas/tipo`;

    constructor(
        public dialogRef: BsModalRef,
        private _formBuilder: FormBuilder,
        private _http: HttpClient
    ) { }

    ngOnInit() {
        this.myForm = this._formBuilder.group({
            codigo: [0, []],
            descricao: ['', [Validators.required]]
        })
    }

    salvar() {
        if (this.myForm.valid) {
            this._http.post(this.url, this.myForm.value).subscribe(r => {
                this.dialogRef.hide();
            }, () => this.dialogRef.hide())
        }
    }
}