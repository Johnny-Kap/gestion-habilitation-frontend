import { Application } from './application.model';

export interface Profil {
  id?: number;
  nom: string;
  description?: string;
  typeProfil?: string;
  actif?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  applications?: Application[];
  nombreApplications?: number;
}

export interface ProfilRequest {
  nom: string;
  description?: string;
  typeProfil?: string;
  actif?: boolean;
  applicationIds?: number[];
}

export interface ProfilSimpleResponse {
  id: number;
  nom: string;
  description?: string;
  typeProfil?: string;
  actif: boolean;
  nombreApplications: number;
}