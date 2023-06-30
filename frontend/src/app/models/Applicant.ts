/**
 *    Modelo / Entidad Category que mapea la tabla de 'applicants'
 * @author Marek Kubicki
 * @version 1.0.2
 */
export class applicant{

    constructor(
        public id: number,
        public jobOffer_id: number,
        public user_id: number,

        //  Campos de la tabla users con la que se hace consulta JOIN,
        // a los que quiero tener acceso desde el objeto applicant.
        public name: string,
        public surname: string, 
        public curriculo: string,
        public image: string,
        public email: string,

        //  Campos de la tabla job_offers con la que se hace consulta JOIN,
        // a los que quiero tener acceso desde el objeto applicant.
        public title: string,
        public salary: number,
        public type: string,
        public status_id: number,       
    ){}
}