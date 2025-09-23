import { Fraismodel } from "./Frais.model";
import { TableaAmortissementmodel } from "./tableaAmortissement.model";

export class Tegmodel {

    id: number;
    utiCalcul: Date = new Date;
    dateCalcul : Date = new Date;
    typeCredit: string = '';
    segment: string = '';
    numeroPret: string = '';
    referenceDossierCredit: string = '';
    periodiciteCredit: number=0;
    baseJour: number=0;
    loanAmount: number= 0;
    chargesAmount: number=0.0;
    valeurSeuil: number=0.0;
    tegProportionnel : number=0.0;
    tegActuarial : number=0.0;
    plafondFrais : number=0.0;
    decision: any;
    debut:  Date
    fin: Date;
    agence: string = '';
    eve: string = ''; 
    ord: string = ''; 
    ave: string = ''; 
    frais:Fraismodel; 
    addfr: boolean;
    taux: number=0;
    situation: string='';
    amortissable : boolean;
    tableaAmortissement: TableaAmortissementmodel;

    

    typf1 :string= '';
    mont1 :number= 0;
    pource1 :number= 0;
    typf2 :string= '';
    mont2 :number= 0;
    pource2 :number= 0;
    typf3 :string= '';
    mont3 :number= 0;
    pource3 :number= 0;
    typf4 :string= '';
    mont4 :number= 0;
    pource4 :number= 0;
    typf5 :string= '';
    mont5 :number= 0;
    pource5 :number= 0;
    typf6 :string= '';
    mont6 :number= 0;
    pource6 :number= 0;


}







