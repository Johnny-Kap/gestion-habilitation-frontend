<%@ include file="/META-INF/resources/init.jsp" %>

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
</aui:script>