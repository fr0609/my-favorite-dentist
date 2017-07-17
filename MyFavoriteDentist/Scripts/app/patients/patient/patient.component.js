"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var myfavoritedentist_service_1 = require("../../services/myfavoritedentist.service");
var constants_1 = require("../../shared/constants");
var patient_1 = require("../../shared/models/patient");
var treatment_1 = require("../../shared/models/treatment");
var PatientComponent = (function () {
    function PatientComponent(_myFavDentistService) {
        this._myFavDentistService = _myFavDentistService;
        this.deletedPatient = new core_1.EventEmitter();
        this.requestDone = false;
        this.editMode = false;
    }
    PatientComponent.prototype.ngOnChanges = function () {
        this.selectedTreatment = undefined;
        this.getPatient();
    };
    /*
    * This function gets a specific patient
    */
    PatientComponent.prototype.getPatient = function () {
        var _this = this;
        this._myFavDentistService.getPatient(this.patientUrl).subscribe(function (response) { return _this.buildData(response); }, function (err) { return console.log(err); });
    };
    /*
    * This function sets the data for the patient
    */
    PatientComponent.prototype.buildData = function (response) {
        var p = response.data;
        this.patient = this.createPatientInstance(p);
        this.requestDone = true;
        this.editedPatient = this.createPatientInstance(p);
        this.setLinks();
    };
    /*
    * This function creates instances of the patient model
    */
    PatientComponent.prototype.createPatientInstance = function (p) {
        return new patient_1.Patient(p.patientid, p.name, p.lastname, p.age, p.phone, p.email, p.lastvisit, p.nextvisit, p.treatments, p.links);
    };
    /*
    * This function is used to set the edit url and the delete url (hateoas)
    */
    PatientComponent.prototype.setLinks = function () {
        var _this = this;
        this.patient.links.map(function (link) {
            switch (link.rel) {
                case constants_1.Constants.REL_EDIT:
                    _this.editUrl = link.href;
                    break;
                case constants_1.Constants.REL_DELETE:
                    _this.deleteUrl = link.href;
                    break;
            }
        });
    };
    /*
    * This function requests to edit a patient
    */
    PatientComponent.prototype.editPatient = function () {
        var _this = this;
        console.log(this.editUrl);
        this._myFavDentistService.editPatient(this.editUrl, this.editedPatient).subscribe(function (response) { return _this.editSuccess(response); }, function (err) { return console.log(err); });
    };
    /*
    * This function is used to update the patient property and to set editMode to false
    */
    PatientComponent.prototype.editSuccess = function (response) {
        if (response.status === constants_1.Constants.OK_STATUS) {
            this.patient = this.editedPatient;
            this.editMode = false;
        }
    };
    /*
    * This function cancels the patient edition
    */
    PatientComponent.prototype.cancelEdition = function () {
        this.editedPatient = this.patient;
        this.editMode = false;
    };
    /*
    * This function requests to delete a patient
    */
    PatientComponent.prototype.deletePatient = function () {
        var _this = this;
        if (this.confirmDelete()) {
            this._myFavDentistService.deleteResource(this.deleteUrl).subscribe(function (response) { return _this.deleteSuccess(response); }, function (err) { return console.log(err); });
        }
    };
    /*
    * This function is used to alert the user of the delete and to emit
    * to the patients component that a delete occurred
    */
    PatientComponent.prototype.deleteSuccess = function (response) {
        if (response.status === constants_1.Constants.OK_STATUS) {
            this.deletedPatient.emit(true);
            alert(constants_1.Constants.DELETE_SUCCESS_PATIENT);
        }
    };
    /*
    * This function opens a confirm alert
    */
    PatientComponent.prototype.confirmDelete = function () {
        return confirm(constants_1.Constants.DELETE_CONFIRM_PATIENT);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PatientComponent.prototype, "patientUrl", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", treatment_1.Treatment)
    ], PatientComponent.prototype, "selectedTreatment", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], PatientComponent.prototype, "deletedPatient", void 0);
    PatientComponent = __decorate([
        core_1.Component({
            selector: 'app-patient',
            templateUrl: '../../Scripts/app/patients/patient/patient.component.html',
            styleUrls: ['../../Scripts/app/patients/patient/patient.component.css'],
            providers: [myfavoritedentist_service_1.MyFavoriteDentistService]
        }),
        __metadata("design:paramtypes", [myfavoritedentist_service_1.MyFavoriteDentistService])
    ], PatientComponent);
    return PatientComponent;
}());
exports.PatientComponent = PatientComponent;
//# sourceMappingURL=patient.component.js.map