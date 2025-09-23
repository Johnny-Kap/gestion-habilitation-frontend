#!/usr/bin/env node

/**
 * Script de build personnalisé pour Liferay 7.2.10 compatible Angular 20
 * Génère un JAR OSGi Bundle pour déploiement
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

console.log('🚀 Build Liferay JAR 7.2.10 pour Angular 20');
console.log('===============================================');

try {
  // 1. Build Angular en mode production
  console.log('📦 Building Angular application...');
  execSync('ng build', { stdio: 'inherit' });

  // 2. Vérifier que le build a réussi
  const distPath = path.join(process.cwd(), 'dist', 'gestionhabilitation');
  if (!fs.existsSync(distPath)) {
    throw new Error('Le build Angular a échoué - dossier dist introuvable');
  }

  console.log('✅ Build Angular réussi !');

  // 3. Créer le structure OSGi Bundle pour JAR
  console.log('📦 Création du bundle OSGi...');

  const buildPath = path.join(process.cwd(), 'build');
  const resourcesPath = path.join(buildPath, 'META-INF', 'resources');
  const servicesPath = path.join(buildPath, 'OSGI-INF');

  // Créer les dossiers nécessaires
  if (fs.existsSync(buildPath)) {
    fs.rmSync(buildPath, { recursive: true, force: true });
  }
  fs.mkdirSync(resourcesPath, { recursive: true });
  fs.mkdirSync(servicesPath, { recursive: true });

  // Copier les fichiers Angular vers la structure Liferay
  console.log('📁 Copie des assets Angular...');
  execSync(`cp -r "${distPath}"/* "${resourcesPath}/"`, { stdio: 'inherit' });

  // 4. Créer le fichier MANIFEST.MF pour OSGi Bundle
  console.log('📄 Création du MANIFEST.MF...');
  const manifestDir = path.join(buildPath, 'META-INF');
  fs.mkdirSync(manifestDir, { recursive: true });

  const manifestContent = `Manifest-Version: 1.0
Bnd-LastModified: ${Date.now()}
Bundle-ManifestVersion: 2
Bundle-Name: Gestion Habilitation Angular Portlet
Bundle-SymbolicName: com.yourcompany.gestion.habilitation
Bundle-Version: 1.0.0.${Date.now()}
Bundle-Vendor: Your Company
Bundle-DocURL: https://www.liferay.com
Bundle-License: https://opensource.org/licenses/MIT
Bundle-RequiredExecutionEnvironment: JavaSE-1.8
Created-By: Apache Maven Bundle Plugin
Import-Package: \\
 javax.servlet;version="[2.5,4)",\\
 javax.servlet.http;version="[2.5,4)",\\
 org.osgi.service.component.annotations;version="[1.3.0,2.0.0)"
Provide-Capability: \\
 liferay.resource.bundle;resource.bundle.base.name="content.Language"
Service-Component: \\
 OSGI-INF/com.yourcompany.gestion.habilitation.resources.xml
Web-ContextPath: /gestionhabilitation
-metatype: *
-sources: true
`;

  fs.writeFileSync(path.join(manifestDir, 'MANIFEST.MF'), manifestContent);

  // 5. Créer le Component XML pour le portlet (configuration minimale)
  console.log('📄 Création du component OSGi minimal...');

  const componentXml = `<?xml version="1.0" encoding="UTF-8"?>
<scr:component xmlns:scr="http://www.osgi.org/xmlns/scr/v1.3.0"
    name="com.yourcompany.gestion.habilitation.resources"
    immediate="true">

    <!-- Pas d'implémentation Java, juste déclaration des propriétés portlet -->
    <property name="com.liferay.portlet.display-category" value="category.sample"/>
    <property name="com.liferay.portlet.header-portlet-css" value="/META-INF/resources/styles.css"/>
    <property name="com.liferay.portlet.instanceable" value="false"/>
    <property name="javax.portlet.display-name" value="Gestion Habilitation"/>
    <property name="javax.portlet.init-param.template-path" value="/META-INF/resources/"/>
    <property name="javax.portlet.init-param.view-template" value="/META-INF/resources/index.html"/>
    <property name="javax.portlet.name" value="gestion_habilitation"/>
    <property name="javax.portlet.resource-bundle" value="content.Language"/>
    <property name="javax.portlet.supports.mime-type" value="text/html"/>

</scr:component>`;

  fs.writeFileSync(
    path.join(servicesPath, 'com.yourcompany.gestion.habilitation.resources.xml'),
    componentXml
  );

  // 6. Supprimer les classes Java simulées (causent des erreurs de déploiement)
  console.log('📄 Configuration portlet sans classes Java (front-end uniquement)...');

  // 7. Créer les fichiers JSP
  console.log('📄 Création des vues JSP...');
  
  // Créer init.jsp (compatible Liferay 7.2.10)
  const initJsp = `<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>
<%@ taglib uri="http://liferay.com/tld/aui" prefix="aui" %>
<%@ taglib uri="http://liferay.com/tld/frontend" prefix="liferay-frontend" %>
<%@ taglib uri="http://liferay.com/tld/portlet" prefix="liferay-portlet" %>
<%@ taglib uri="http://liferay.com/tld/theme" prefix="liferay-theme" %>
<%@ taglib uri="http://liferay.com/tld/ui" prefix="liferay-ui" %>
<%@ taglib uri="http://liferay.com/tld/util" prefix="liferay-util" %>

<liferay-frontend:defineObjects />
<liferay-theme:defineObjects />
<portlet:defineObjects />`;

  fs.writeFileSync(path.join(resourcesPath, 'init.jsp'), initJsp);

  // Créer view.jsp
  const viewJsp = `<%@ include file="/META-INF/resources/init.jsp" %>

<div class="gestion-habilitation-portlet">
    <div id="gestion-habilitation-<portlet:namespace />">
        <!-- L'application Angular sera montée ici -->
        <app-root>
            <div class="loading-container">
                <liferay-ui:icon iconCssClass="icon-loading-animator" />
                <span>Chargement de l'application...</span>
            </div>
        </app-root>
    </div>
</div>

<aui:script use="liferay-portlet-base">
    // Configuration spécifique au portlet
    window.Liferay = window.Liferay || {};
    window.Liferay.Portlet = window.Liferay.Portlet || {};
    window.Liferay.Portlet.GestionHabilitation = {
        portletNamespace: '<portlet:namespace />',
        portletId: '<%= portletDisplay.getId() %>',
        userId: '<%= user.getUserId() %>',
        companyId: '<%= company.getCompanyId() %>'
    };

    // Démarrer l'application Angular une fois le DOM chargé
    AUI().ready('liferay-portlet-base', function(A) {
        console.log('Gestion Habilitation Portlet initialized');
        
        // Hook pour Angular si nécessaire
        if (window.ng && window.ng.platformBrowserDynamic) {
            console.log('Angular platform detected');
        }
    });
</aui:script>`;

  fs.writeFileSync(path.join(resourcesPath, 'view.jsp'), viewJsp);

  // 8. Créer le fichier de configuration des ressources
  const languagePropertiesPath = path.join(buildPath, 'content');
  fs.mkdirSync(languagePropertiesPath, { recursive: true });
  
  const languageProperties = `javax.portlet.title.gestion_habilitation=Gestion Habilitation
gestion-habilitation.caption=Gestion des Habilitations
gestion-habilitation.portlet.title=Gestion Habilitation`;

  fs.writeFileSync(
    path.join(languagePropertiesPath, 'Language.properties'), 
    languageProperties
  );

  // 9. Créer le package.json pour les ressources npm
  const packageJsonContent = {
    "name": "gestionhabilitation",
    "version": "1.0.0",
    "description": "Portlet Gestion Habilitation avec Angular 20",
    "main": "index.html",
    "scripts": {},
    "dependencies": {},
    "liferayNpmBundler": {
      "preset": "liferay-npm-bundler-preset-standard"
    }
  };

  fs.writeFileSync(
    path.join(buildPath, 'package.json'),
    JSON.stringify(packageJsonContent, null, 2)
  );

  // 10. Créer le fichier JAR
  console.log('📦 Génération du fichier JAR OSGi...');

  const outputPath = path.join(process.cwd(), 'dist');
  const jarPath = path.join(outputPath, 'Gestion-habilitation.jar');

  createJar(buildPath, jarPath).then(() => {
    console.log('✅ Build Liferay JAR terminé avec succès !');
    console.log(`📁 Assets Angular dans: ${resourcesPath}`);
    console.log(`📦 JAR OSGi créé: ${jarPath}`);
    console.log(`📋 Pour déployer:`);
    console.log(`   cp "${jarPath}" $LIFERAY_HOME/deploy/`);
    console.log(`📋 Ou via Gogo Shell:`);
    console.log(`   install file:${jarPath}`);
    console.log(`   start <bundle-id>`);
    
    // Instructions de debug
    console.log(`\n🔍 Pour débugger si nécessaire:`);
    console.log(`   tail -f $LIFERAY_HOME/logs/liferay.log | grep -i "gestion\\|habilitation"`);
    console.log(`   lb | grep habilitation  # Dans Gogo Shell`);
    
  }).catch(error => {
    console.error('❌ Erreur lors de la création du JAR:', error.message);
    process.exit(1);
  });

} catch (error) {
  console.error('❌ Erreur lors du build:', error.message);
  console.error(error.stack);
  process.exit(1);
}

function createJar(sourceDir, outputPath) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outputPath);
    const archive = archiver('zip', { 
      zlib: { level: 9 },
      forceLocalTime: true,
      store: false
    });

    output.on('close', () => {
      console.log(`📦 JAR OSGi Bundle créé: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`);
      resolve();
    });

    archive.on('error', (err) => {
      reject(err);
    });

    archive.pipe(output);
    
    // CRITIQUE: Ajouter META-INF/MANIFEST.MF en PREMIER (ordre obligatoire pour OSGi)
    const manifestPath = path.join(sourceDir, 'META-INF', 'MANIFEST.MF');
    if (fs.existsSync(manifestPath)) {
      console.log('📄 Ajout de META-INF/MANIFEST.MF en premier...');
      // Ajouter le dossier META-INF explicitement AVANT le fichier MANIFEST.MF
      archive.append('', { name: 'META-INF/' });
      archive.file(manifestPath, { name: 'META-INF/MANIFEST.MF' });
    } else {
      reject(new Error('MANIFEST.MF introuvable !'));
      return;
    }

    // Ajouter les autres fichiers META-INF (sauf MANIFEST.MF déjà ajouté)
    const metaInfDir = path.join(sourceDir, 'META-INF');
    if (fs.existsSync(metaInfDir)) {
      fs.readdirSync(metaInfDir).forEach(file => {
        if (file !== 'MANIFEST.MF') {
          const filePath = path.join(metaInfDir, file);
          const stat = fs.statSync(filePath);

          if (stat.isDirectory()) {
            archive.directory(filePath, `META-INF/${file}`);
          } else {
            archive.file(filePath, { name: `META-INF/${file}` });
          }
        }
      });
    }
    
    // Ajouter tous les autres fichiers/dossiers SAUF META-INF
    fs.readdirSync(sourceDir).forEach(item => {
      if (item !== 'META-INF') {
        const fullPath = path.join(sourceDir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          archive.directory(fullPath, item);
        } else {
          archive.file(fullPath, { name: item });
        }
      }
    });
    
    // Finaliser l'archive
    archive.finalize();
  });
}