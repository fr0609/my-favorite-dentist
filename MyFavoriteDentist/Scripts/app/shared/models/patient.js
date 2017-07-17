"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Patient = (function () {
    function Patient(patientid, name, lastname, age, phone, email, lastvisit, nextvisit, treatments, links) {
        this.patientid = patientid;
        this.name = name;
        this.lastname = lastname;
        this.age = age;
        this.phone = phone;
        this.email = email;
        this.lastvisit = lastvisit;
        this.nextvisit = nextvisit;
        this.treatments = treatments;
        this.links = links;
    }
    return Patient;
}());
exports.Patient = Patient;
//# sourceMappingURL=patient.js.map