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
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var constants_1 = require("../shared/constants");
var MyFavoriteDentistService = (function () {
    function MyFavoriteDentistService(http) {
        this.http = http;
    }
    /*
    * This function builds the request options (content-type and authorization)
    */
    MyFavoriteDentistService.prototype.getRequestOptions = function () {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + btoa(constants_1.Constants.API_USERNAME + ":" + constants_1.Constants.API_PASSWORD)
        });
        return new http_1.RequestOptions({ headers: headers });
    };
    /*
    * This function requests the patients
    */
    MyFavoriteDentistService.prototype.getPatients = function (pageIndex) {
        var getPatientsUrl = constants_1.Constants.PATIENTS_URL + "?pageIndex=" + pageIndex + "&pageSize=" + constants_1.Constants.PAGE_SIZE;
        var options = this.getRequestOptions();
        return this.http.get(getPatientsUrl, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    /*
    * This function requests a patient
    */
    MyFavoriteDentistService.prototype.getPatient = function (patientUrl) {
        var options = this.getRequestOptions();
        return this.http.get(patientUrl, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    /*
    * This function requests to update a patient
    */
    MyFavoriteDentistService.prototype.editPatient = function (editUrl, patient) {
        var options = this.getRequestOptions();
        var body = JSON.stringify(patient);
        return this.http.put(editUrl, body, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    /*
    * This function requests to edit a treatment
    */
    MyFavoriteDentistService.prototype.editTreatment = function (editUrl, treatment) {
        var options = this.getRequestOptions();
        var body = JSON.stringify(treatment);
        return this.http.put(editUrl, body, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    /*
    * This function requests to delete a resource
    */
    MyFavoriteDentistService.prototype.deleteResource = function (deleteUrl) {
        var options = this.getRequestOptions();
        return this.http.delete(deleteUrl, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    MyFavoriteDentistService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], MyFavoriteDentistService);
    return MyFavoriteDentistService;
}());
exports.MyFavoriteDentistService = MyFavoriteDentistService;
//# sourceMappingURL=myfavoritedentist.service.js.map