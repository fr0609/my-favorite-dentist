"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Treatment = (function () {
    function Treatment(treatmentid, startdate, enddate, price, detail, patientid, links) {
        this.treatmentid = treatmentid;
        this.startdate = startdate;
        this.enddate = enddate;
        this.price = price;
        this.detail = detail;
        this.patientid = patientid;
        this.links = links;
    }
    return Treatment;
}());
exports.Treatment = Treatment;
//# sourceMappingURL=treatment.js.map