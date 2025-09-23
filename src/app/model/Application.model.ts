import { Administratormodel } from './Administrator.model';
import { Modulemodel } from './Module.model';

export class Applicationmodel {

    appId: number;
    appNom: string = '';
    admin: Administratormodel[];
    modules: Modulemodel[]; 
}
