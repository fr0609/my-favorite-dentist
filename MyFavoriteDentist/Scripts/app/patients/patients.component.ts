import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MyFavoriteDentistService } from '../services/myfavoritedentist.service';
import { Constants } from '../shared/constants';
import { Patient } from '../shared/models/patient';


@Component({
    selector: 'app-patients',
    templateUrl: '../../Scripts/app/patients/patients.component.html',
    styleUrls: ['../../Scripts/app/patients/patients.component.css'],
    providers: [MyFavoriteDentistService]
})
export class PatientsComponent implements OnInit {
    patients: Patient[];
    patientsTotal;
    currentPage = 0;
    @Input() isPatientSelected = false;
    patientUrl;

    constructor(private _myFavDentistService: MyFavoriteDentistService,
        private router: Router) { }

    ngOnInit() {
        this.getPatients();
    }

    /*
    * This function calculates the page and gets the patients
    */
    getPatients(page: string = null) {
        switch (page) {
            case 'first':
                this.currentPage = 0;
                break;
            case 'last':
                this.currentPage = Math.floor(this.patientsTotal / Constants.PAGE_SIZE);
                break;
            case 'previous':
                if (this.currentPage > 0) {
                    this.currentPage--;
                }
                break;
            case 'next':
                if (this.currentPage < this.patientsTotal) {
                    this.currentPage++;
                }
        }

        this._myFavDentistService.getPatients(this.currentPage).subscribe(
            response => this.buildData(response),
            err => console.log(err)
        );
    }

    /*
    * This function sets the total of patients and the patients (from the request response)
    */
    buildData(response) {
        this.patientsTotal = response.total;
        this.patients = response.data;
    }

    /*
    * This function shows the selected patient
    */
    showPatient(index: number) {
        let patientLinks = this.patients[index].links;
        patientLinks.map((link) => {
            if (link.rel.toLowerCase() === Constants.REL_SELF.toLowerCase()) {
                this.patientUrl = link.href;
                this.isPatientSelected = true;
            }
        });
    }
}