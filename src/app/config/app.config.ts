import { environment } from '../../environments/environment';

export interface AppConfig {
    keycloak: {
        url: string;
        realm: string;
        clientId: string;
    };
    api: {
        baseUrl: string;
    };
}

export class ConfigService {
    static getConfig(): AppConfig {
        // En mode développement, utiliser environment directement
        // En production Docker, les valeurs seront injectées via script
        const config: AppConfig = {
            keycloak: {
                url: (window as any).__env__?.KEYCLOAK_URL || environment.keycloak.url,
                realm: (window as any).__env__?.KEYCLOAK_REALM || environment.keycloak.realm,
                clientId: (window as any).__env__?.KEYCLOAK_CLIENT_ID || environment.keycloak.clientId
            },
            api: {
                baseUrl: (window as any).__env__?.API_BASE_URL || environment.api.baseUrl
            }
        };

        console.log('Configuration Keycloak chargée:', config.keycloak);
        console.log('Configuration API chargée:', config.api);

        return config;
    }
}