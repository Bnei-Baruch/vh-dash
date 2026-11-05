import { useEffect } from "react";
import { useSelector } from "react-redux";
import { keycloakData } from "../redux/selectors/user";

const SCRIPT_ID = "crisp-chat-script";
const BOT_SCENARIO_ID = "scenario_afc184dc-350d-400b-97db-c8f851f61a1b";

// Read by the chat:opened handler, which is registered once per page load.
let currentName = "";

// Crisp reads CRISP_RUNTIME_CONFIG once, when l.js loads, so the chat
// locale follows the UI language at first render only.
const loadCrisp = (websiteId, locale) => {
  if (document.getElementById(SCRIPT_ID)) return;
  window.$crisp = window.$crisp || [];
  window.CRISP_WEBSITE_ID = websiteId;
  window.CRISP_RUNTIME_CONFIG = { locale };
  const s = document.createElement("script");
  s.id = SCRIPT_ID;
  s.src = "https://client.crisp.chat/l.js";
  s.async = true;
  document.head.appendChild(s);
  window.$crisp.push(["on", "chat:opened", () => {
    window.$crisp.push(["do", "bot:scenario:run", [BOT_SCENARIO_ID, { name: currentName }]]);
  }]);
};

const CrispChat = () => {
  const language = useSelector((state) => state.settingsReducer.language);
  const keycloak = useSelector(keycloakData);
  const websiteId = window.APP_CONFIG.CRISP_WEBSITE_ID;

  useEffect(() => {
    if (!websiteId) return;
    loadCrisp(websiteId, language || "en");
    window.$crisp.push(["config", "position:reverse", [language === "he"]]);
  }, [websiteId, language]);

  const profile = keycloak?.profile;
  const name = [profile?.firstName, profile?.lastName].filter(Boolean).join(" ");
  const email = profile?.email;
  const subject = keycloak?.subject;

  currentName = name;

  useEffect(() => {
    if (!websiteId) return;
    if (name) window.$crisp.push(["set", "user:nickname", [name]]);
    if (email) window.$crisp.push(["set", "user:email", [email]]);
    if (subject) window.$crisp.push(["set", "session:data", [[["keycloak_id", subject]]]]);
  }, [websiteId, name, email, subject]);

  return null;
};

export default CrispChat;
