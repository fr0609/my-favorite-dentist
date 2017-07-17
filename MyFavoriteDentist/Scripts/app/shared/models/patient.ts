export class Patient {
    constructor(
        public patientid: number,
        public name: string,
        public lastname: string,
        public age: number,
        public phone: string,
        public email: string,
        public lastvisit: Date,
        public nextvisit: Date,
        public treatments: [{startdate: Date, enddate: Date, price: number, detail: string, patientid: number}],
        public links: [{verb: string, rel: string, href: string}]
    ) { }
}