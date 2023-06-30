/**
 *    Modelo / Entidad que mapea la tabla de 'users'
 * @author Marek Kubicki
 * @version 1.0.1
 */
export class User
{
    constructor(
        public sub: number,
        public name: string,
        public surname: string,
        public role_id: number,
        public email: string,
        public password: string,
        public description: string,
        public image: string,
        public curriculo: string
    ){}
}