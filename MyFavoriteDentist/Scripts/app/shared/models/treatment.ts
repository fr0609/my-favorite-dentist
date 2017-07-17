export class Treatment {
    constructor(
        public treatmentid: number,
        public startdate: Date,
        public enddate: Date,
        public price: number,
        public detail: string,
        public patientid: number,
        public links: [{ verb: string, rel: string, href: string }]
    ) { }
}