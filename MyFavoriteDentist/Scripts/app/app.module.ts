import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routing } from './app.routing';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PatientsComponent } from './patients/patients.component';
import { PatientComponent } from './patients/patient/patient.component';
import { TreatmentComponent } from './treatment/treatment.component';


@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        Routing
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        PatientsComponent,
        PatientComponent,
        TreatmentComponent
    ],
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
    bootstrap: [AppComponent]
})

export class AppModule { }