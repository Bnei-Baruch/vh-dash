import { useSelector } from "react-redux";
import { keycloakData } from "../redux/selectors/user";

const LanguageSnippetIDs = {
    en: 'ghWBmYzjwrVn1Y5AKnTp',
    ru: 'jTNzP5mlFzSYSzyPjTfu',
    he: 'DDVQxtBS6TvczAMxRiR9',
    es: 'ByIkSpWg6CCvZEHMrErv',
}

const GlassixWidget = () => {
    const language = useSelector((state) => state.settingsReducer.language);
    const keycloak = useSelector(keycloakData);

    var widgetOptions = {
        apiKey: window.APP_CONFIG.GLASSIX_API_KEY,
        snippetId: LanguageSnippetIDs[language] || LanguageSnippetIDs['en'],
        uniqueIdentifier: keycloak?.subject,
        participantName: keycloak?.profile?.firstName + " " + keycloak?.profile?.lastName,
        participantMailAddress: keycloak?.profile?.email
    };

    if (GlassixWidgetClient && typeof GlassixWidgetClient == "function") { // eslint-disable-line
        window.widgetClient && window.widgetClient.destroy();
        window.widgetClient = new GlassixWidgetClient(widgetOptions); // eslint-disable-line
        window.widgetClient.attach();
        window.glassixWidgetScriptLoaded && window.glassixWidgetScriptLoaded();
    }

    return null;

}

export default GlassixWidget;
