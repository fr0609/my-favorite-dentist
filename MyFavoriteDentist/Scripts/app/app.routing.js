"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var patients_component_1 = require("./patients/patients.component");
var patient_component_1 = require("./patients/patient/patient.component");
var appRoutes = [
    { path: '', component: patients_component_1.PatientsComponent },
    { path: 'patient/', component: patient_component_1.PatientComponent },
];
exports.Routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map