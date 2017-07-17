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
var myfavoritedentist_service_1 = require("../services/myfavoritedentist.service");
var constants_1 = require("../shared/constants");
var treatment_1 = require("../shared/models/treatment");
var TreatmentComponent = (function () {
    function TreatmentComponent(_myFavDentistService) {
        this._myFavDentistService = _myFavDentistService;
        this.deletedTreatment = new core_1.EventEmitter();
        this.editMode = false;
    }
    TreatmentComponent.prototype.ngOnChanges = function () {
        this.treatment = this.selectedTreatment;
        this.editedTreatment = this.createTreatmentInstance(this.treatment);
        this.setLinks();
    };
    /*
    * This function creates instances of the treatment model
    */
    TreatmentComponent.prototype.createTreatmentInstance = function (t) {
        return new treatment_1.Treatment(t.treatmentid, t.startdate, t.enddate, t.price, t.detail, t.patientid, t.links);
    };
    /*
    * This function is used to set the edit url and the delete url (hateoas)
    */
    TreatmentComponent.prototype.setLinks = function () {
        var _this = this;
        this.treatment.links.map(function (link) {
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
    * This function requests to edit a treatment
    */
    TreatmentComponent.prototype.editTreatment = function () {
        var _this = this;
        this._myFavDentistService.editTreatment(this.editUrl, this.editedTreatment).subscribe(function (response) { return _this.editSuccess(response); }, function (err) { return console.log(err); });
    };
    /*
    * This function is used to update the treatment property and to set editMode to false
    */
    TreatmentComponent.prototype.editSuccess = function (response) {
        if (response.status === constants_1.Constants.OK_STATUS) {
            this.treatment = this.editedTreatment;
            this.editMode = false;
        }
    };
    /*
    * This function cancels the treatment edition
    */
    TreatmentComponent.prototype.cancelEdition = function () {
        this.editedTreatment = this.treatment;
        this.editMode = false;
    };
    /*
    * This function requests to delete a treatment
    */
    TreatmentComponent.prototype.deleteTreatment = function () {
        var _this = this;
        if (this.confirmDelete()) {
            this._myFavDentistService.deleteResource(this.deleteUrl).subscribe(function (response) { return _this.deleteSuccess(response); }, function (err) { return console.log(err); });
        }
    };
    /*
    * This function is used to alert the user of the delete and to emit
    * to the patient component that a delete occurred
    */
    TreatmentComponent.prototype.deleteSuccess = function (response) {
        if (response.status === constants_1.Constants.OK_STATUS) {
            this.deletedTreatment.emit(true);
            alert(constants_1.Constants.DELETE_SUCCESS_TREATMENT);
        }
    };
    /*
    * This function opens a confirm alert
    */
    TreatmentComponent.prototype.confirmDelete = function () {
        return confirm(constants_1.Constants.DELETE_CONFIRM_TREATMENT);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", treatment_1.Treatment)
    ], TreatmentComponent.prototype, "selectedTreatment", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], TreatmentComponent.prototype, "deletedTreatment", void 0);
    TreatmentComponent = __decorate([
        core_1.Component({
            selector: 'app-treatment',
            templateUrl: '../../Scripts/app/treatment/treatment.component.html',
            styleUrls: ['../../Scripts/app/treatment/treatment.component.css']
        }),
        __metadata("design:paramtypes", [myfavoritedentist_service_1.MyFavoriteDentistService])
    ], TreatmentComponent);
    return TreatmentComponent;
}());
exports.TreatmentComponent = TreatmentComponent;
//# sourceMappingURL=treatment.component.js.map