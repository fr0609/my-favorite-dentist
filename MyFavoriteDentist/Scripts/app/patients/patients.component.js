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
var router_1 = require("@angular/router");
var myfavoritedentist_service_1 = require("../services/myfavoritedentist.service");
var constants_1 = require("../shared/constants");
var PatientsComponent = (function () {
    function PatientsComponent(_myFavDentistService, router) {
        this._myFavDentistService = _myFavDentistService;
        this.router = router;
        this.currentPage = 0;
        this.isPatientSelected = false;
    }
    PatientsComponent.prototype.ngOnInit = function () {
        this.getPatients();
    };
    /*
    * This function calculates the page and gets the patients
    */
    PatientsComponent.prototype.getPatients = function (page) {
        var _this = this;
        if (page === void 0) { page = null; }
        switch (page) {
            case 'first':
                this.currentPage = 0;
                break;
            case 'last':
                this.currentPage = Math.floor(this.patientsTotal / constants_1.Constants.PAGE_SIZE);
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
        this._myFavDentistService.getPatients(this.currentPage).subscribe(function (response) { return _this.buildData(response); }, function (err) { return console.log(err); });
    };
    /*
    * This function sets the total of patients and the patients (from the request response)
    */
    PatientsComponent.prototype.buildData = function (response) {
        this.patientsTotal = response.total;
        this.patients = response.data;
    };
    /*
    * This function shows the selected patient
    */
    PatientsComponent.prototype.showPatient = function (index) {
        var _this = this;
        var patientLinks = this.patients[index].links;
        patientLinks.map(function (link) {
            if (link.rel.toLowerCase() === constants_1.Constants.REL_SELF.toLowerCase()) {
                _this.patientUrl = link.href;
                _this.isPatientSelected = true;
            }
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PatientsComponent.prototype, "isPatientSelected", void 0);
    PatientsComponent = __decorate([
        core_1.Component({
            selector: 'app-patients',
            templateUrl: '../../Scripts/app/patients/patients.component.html',
            styleUrls: ['../../Scripts/app/patients/patients.component.css'],
            providers: [myfavoritedentist_service_1.MyFavoriteDentistService]
        }),
        __metadata("design:paramtypes", [myfavoritedentist_service_1.MyFavoriteDentistService,
            router_1.Router])
    ], PatientsComponent);
    return PatientsComponent;
}());
exports.PatientsComponent = PatientsComponent;
//# sourceMappingURL=patients.component.js.map