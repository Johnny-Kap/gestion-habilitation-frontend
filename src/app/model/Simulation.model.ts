export class Simulationmodel {

    id: number;
    utiCalcul: Date = new Date;
    dateCalcul : Date = new Date;
    typeCredit: string = '';
    segment: string = '';
    numeroPret: string = '';
    referenceDossierCredit: string = '';
    periodiciteCredit: number=0;
    baseJour: number=0;
    chargesAmount: number=0.0;
    valeurSeuil: number=0.0;
    resultat: number=0.0;
    loanAmount: number= 0.0;
    decision: any;
    debut:  Date
    fin: Date;
    agence : string = '';
    eve: string = '';
    ave: string = '';
    frais: string = '';

}







