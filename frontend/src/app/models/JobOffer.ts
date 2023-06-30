/**
 *    Modelo / Entidad Category que mapea la tabla de 'job_offers'
 * @author Marek Kubicki
 * @version 1.0.0
 */
export class JobOffer
{
    constructor(
        public id: number,
        public user_id: number,
        public category_id: number,
        public title: string,
        public content: string,
        public image: string,
        public salary: number,
        public type: number,
        public status_id: number,
        public createdAt: any
    ){}
}