// import { NgModule } from '@angular/core';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
// import { MatInputModule } from '@angular/material/input';
// import { MatTreeModule } from '@angular/material/tree';
// import { MatMenuModule } from '@angular/material/menu';
// import { MatIconModule } from '@angular/material/icon';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MatStepperModule } from '@angular/material/stepper';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatTooltipModule } from '@angular/material/tooltip';
// import { MatListModule } from '@angular/material/list';
// import { MatSelectModule } from '@angular/material/select';
// import { MatTableModule } from '@angular/material/table';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatExpansionModule } from '@angular/material/expansion';
// import { PercentPipe, CommonModule } from '@angular/common';
// import { CurrencyPipe } from '@angular/common';
// import {
//     MAT_DATE_FORMATS,
//     MatSnackBarModule,
//     MatFormFieldModule,
//     MatTabsModule,
//     MatCheckboxModule,
//     MatPaginatorModule,
//     MatSortModule,
//     MatProgressBarModule,
//     MatSlideToggleModule,
//     MatAutocompleteModule,
//     MAT_DATE_LOCALE,
//     DateAdapter,
//     MatPaginatorIntl,
//     MatRippleModule,
//     MatGridListModule
// } from '@angular/material';
// import { CurrencyMaskModule } from 'ng2-currency-mask';
// import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask/src/currency-mask.config';
// import { CdkTableModule } from '@angular/cdk/table';
// import { LocalStorageModule } from 'angular-2-local-storage';
// import { getBrPaginatorIntl } from './intl';

// export const MY_FORMATS = {
//     parse: {
//         dateInput: 'DD/MM/YYYY',
//     },
//     display: {
//         dateInput: 'DD/MM/YYYY',
//         monthYearLabel: 'MMM YYYY',
//         dateA11yLabel: 'LL',
//         monthYearA11yLabel: 'MMMM YYYY',
//     },
// };

// export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
//     align: 'right',
//     allowNegative: true,
//     decimal: ',',
//     precision: 2,
//     prefix: 'R$ ',
//     suffix: '',
//     thousands: '.'
// };

// @NgModule({
//     declarations: [
//     ],
//     imports: [
//         LocalStorageModule.forRoot({
//             prefix: 'objetos',
//             storageType: 'localStorage'
//         })
//     ],
//     exports: [
//         MatGridListModule,
//         MatRippleModule,
//         CdkTableModule,
//         CurrencyMaskModule,
//         MatSnackBarModule,
//         MatTabsModule,
//         MatCheckboxModule,
//         MatSortModule,
//         MatCardModule,
//         MatPaginatorModule,
//         FormsModule, ReactiveFormsModule,
//         MatInputModule,
//         MatButtonModule,
//         MatMenuModule,
//         MatIconModule,
//         MatSidenavModule,
//         MatStepperModule,
//         MatProgressSpinnerModule,
//         MatDialogModule,
//         MatFormFieldModule,
//         CommonModule,
//         MatTooltipModule,
//         MatListModule,
//         MatSelectModule,
//         MatTableModule,
//         MatProgressBarModule,
//         MatSlideToggleModule,
//         MatAutocompleteModule,
//         MatToolbarModule,
//         MatExpansionModule,
//         MatTreeModule
//     ],
//     providers: [
//         PercentPipe,
//         CurrencyPipe,
//         { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
//         { provide: MatPaginatorIntl, useValue: getBrPaginatorIntl() },
//         { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
//         { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
//     ]
// })
// export class ThirdPartyModule { }
