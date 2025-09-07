export interface Application {
    id?: number;
    nom: string;
    description?: string;
    version?: string;
    url?: string;
    icone?: string;
    statut?: string;
    actif?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    nombreProfils?: number;
  }
  
  export interface ApplicationRequest {
    nom: string;
    description?: string;
    version?: string;
    url?: string;
    icone?: string;
    statut?: string;
    actif?: boolean;
  }