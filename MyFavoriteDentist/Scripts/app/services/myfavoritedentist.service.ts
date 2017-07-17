import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Patient } from '../shared/models/patient';
import { Treatment } from '../shared/models/treatment';
import { Constants } from '../shared/constants';

@Injectable()
export class MyFavoriteDentistService {
    constructor(private http: Http) { }

    /*
    * This function builds the request options (content-type and authorization)
    */
    getRequestOptions() {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + btoa(`${Constants.API_USERNAME}:${Constants.API_PASSWORD}`)
        });
        return new RequestOptions({ headers: headers });
    }

    /*
    * This function requests the patients
    */
    getPatients(pageIndex: number): Observable<Patient[]> {
        let getPatientsUrl = `${Constants.PATIENTS_URL}?pageIndex=${pageIndex}&pageSize=${Constants.PAGE_SIZE}`;
        let options = this.getRequestOptions();
        return this.http.get(getPatientsUrl, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    /*
    * This function requests a patient
    */
    getPatient(patientUrl: string): Observable<Patient> {
        let options = this.getRequestOptions();
        return this.http.get(patientUrl, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    /*
    * This function requests to update a patient
    */
    editPatient(editUrl: string, patient: Patient): Observable<any> {
        let options = this.getRequestOptions();
        let body = JSON.stringify(patient);
        return this.http.put(editUrl, body, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    /*
    * This function requests to edit a treatment
    */
    editTreatment(editUrl, treatment: Treatment): Observable<any> {
        let options = this.getRequestOptions();
        let body = JSON.stringify(treatment);
        return this.http.put(editUrl, body, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    /*
    * This function requests to delete a resource
    */
    deleteResource(deleteUrl: string): Observable<any> {
        let options = this.getRequestOptions();
        return this.http.delete(deleteUrl, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

}