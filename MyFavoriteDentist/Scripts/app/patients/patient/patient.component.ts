import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { MyFavoriteDentistService } from '../../services/myfavoritedentist.service';
import { Constants } from '../../shared/constants';
import { Patient } from '../../shared/models/patient';
import { Treatment } from '../../shared/models/treatment';


@Component({
    selector: 'app-patient',
    templateUrl: '../../Scripts/app/patients/patient/patient.component.html',
    styleUrls: ['../../Scripts/app/patients/patient/patient.component.css'],
    providers: [MyFavoriteDentistService]
})
export class PatientComponent implements OnChanges {
    @Input() patientUrl: string;
    @Input() selectedTreatment: Treatment;
    @Output() deletedPatient = new EventEmitter<boolean>();
    patient: Patient;
    requestDone = false;
    editMode = false;
    editUrl;
    deleteUrl;
    editedPatient: Patient;

    constructor(private _myFavDentistService: MyFavoriteDentistService) {}
    
    ngOnChanges() {
        this.selectedTreatment = undefined;
        this.getPatient();
    }

    /*
    * This function gets a specific patient
    */
    getPatient() {
        this._myFavDentistService.getPatient(this.patientUrl).subscribe(
            response => this.buildData(response),
            err => console.log(err)
        );
    }

    /*
    * This function sets the data for the patient
    */
    buildData(response) {
        let p = response.data;
        this.patient = this.createPatientInstance(p);
        this.requestDone = true;
        this.editedPatient = this.createPatientInstance(p);
        this.setLinks();
    }

    /*
    * This function creates instances of the patient model
    */
    createPatientInstance(p) {
        return new Patient(
            p.patientid,
            p.name,
            p.lastname,
            p.age,
            p.phone,
            p.email,
            p.lastvisit,
            p.nextvisit,
            p.treatments,
            p.links
        );
    }

    /*
    * This function is used to set the edit url and the delete url (hateoas)
    */
    setLinks() {
        this.patient.links.map((link) => {
            switch (link.rel) {
                case Constants.REL_EDIT:
                    this.editUrl = link.href;
                    break;
                case Constants.REL_DELETE:
                    this.deleteUrl = link.href;
                    break;
            }
        });
    }

    /*
    * This function requests to edit a patient
    */
    editPatient() {
        console.log(this.editUrl);
        this._myFavDentistService.editPatient(this.editUrl, this.editedPatient).subscribe(
            response => this.editSuccess(response),
            err => console.log(err)
        );
    }

    /*
    * This function is used to update the patient property and to set editMode to false
    */
    editSuccess(response) {
        if (response.status === Constants.OK_STATUS) {
            this.patient = this.editedPatient;
            this.editMode = false;
        }
    }

    /*
    * This function cancels the patient edition
    */
    cancelEdition() {
        this.editedPatient = this.patient;
        this.editMode = false;
    }

    /*
    * This function requests to delete a patient
    */
    deletePatient() {
        if (this.confirmDelete()) {
            this._myFavDentistService.deleteResource(this.deleteUrl).subscribe(
                response => this.deleteSuccess(response),
                err => console.log(err)
            );
        }
    }

    /*
    * This function is used to alert the user of the delete and to emit
    * to the patients component that a delete occurred
    */
    deleteSuccess(response) {
        if (response.status === Constants.OK_STATUS) {
            this.deletedPatient.emit(true);
            alert(Constants.DELETE_SUCCESS_PATIENT);
        }
    }

    /*
    * This function opens a confirm alert
    */
    confirmDelete() {
        return confirm(Constants.DELETE_CONFIRM_PATIENT);
    }
}