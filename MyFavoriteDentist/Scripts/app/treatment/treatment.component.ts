import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MyFavoriteDentistService } from '../services/myfavoritedentist.service';
import { Constants } from '../shared/constants';
import { Treatment } from '../shared/models/treatment';

@Component({
    selector: 'app-treatment',
    templateUrl: '../../Scripts/app/treatment/treatment.component.html',
    styleUrls: ['../../Scripts/app/treatment/treatment.component.css']
})
export class TreatmentComponent {
    @Input() selectedTreatment: Treatment;
    @Output() deletedTreatment = new EventEmitter<boolean>();
    treatment;
    editMode = false;
    editUrl;
    deleteUrl;
    editedTreatment: Treatment;

    constructor(private _myFavDentistService: MyFavoriteDentistService) { }

    ngOnChanges() {
        this.treatment = this.selectedTreatment;
        this.editedTreatment = this.createTreatmentInstance(this.treatment);
        this.setLinks();
    }

    /*
    * This function creates instances of the treatment model
    */
    createTreatmentInstance(t) {
        return new Treatment(
            t.treatmentid,
            t.startdate,
            t.enddate,
            t.price,
            t.detail,
            t.patientid,
            t.links
        );
    }

    /*
    * This function is used to set the edit url and the delete url (hateoas)
    */
    setLinks() {
        this.treatment.links.map((link) => {
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
    * This function requests to edit a treatment
    */
    editTreatment() {
        this._myFavDentistService.editTreatment(this.editUrl, this.editedTreatment).subscribe(
            response => this.editSuccess(response),
            err => console.log(err)
        );
    }

    /*
    * This function is used to update the treatment property and to set editMode to false
    */
    editSuccess(response) {
        if (response.status === Constants.OK_STATUS) {
            this.treatment = this.editedTreatment;
            this.editMode = false;
        }
    }

    /*
    * This function cancels the treatment edition
    */
    cancelEdition() {
        this.editedTreatment = this.treatment;
        this.editMode = false;
    }

    /*
    * This function requests to delete a treatment
    */
    deleteTreatment() {
        if (this.confirmDelete()) {
            this._myFavDentistService.deleteResource(this.deleteUrl).subscribe(
                response => this.deleteSuccess(response),
                err => console.log(err)
            );
        }
    }

    /*
    * This function is used to alert the user of the delete and to emit
    * to the patient component that a delete occurred
    */
    deleteSuccess(response) {
        if (response.status === Constants.OK_STATUS) {
            this.deletedTreatment.emit(true);
            alert(Constants.DELETE_SUCCESS_TREATMENT);
        }
    }

    /*
    * This function opens a confirm alert
    */
    confirmDelete() {
        return confirm(Constants.DELETE_CONFIRM_TREATMENT);
    }
}