import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientsComponent } from './patients/patients.component';
import { PatientComponent } from './patients/patient/patient.component';

const appRoutes: Routes = [
    { path: '', component: PatientsComponent },
    { path: 'patient/', component: PatientComponent },
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);