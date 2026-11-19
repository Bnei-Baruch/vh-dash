import { useEffect } from "react";
import { useSelector } from "react-redux";
import { keycloakData } from "../redux/selectors/user";

const SCRIPT_ID = "crisp-chat-script";
const BOT_SCENARIO_ID = "scenario_afc184dc-350d-400b-97db-c8f851f61a1b";
// The Keycloak user the Crisp session on this browser belongs to.
const OWNER_KEY = "crisp_keycloak_id";

// The logged-in user's details, set by the component's effect. A session
// reset starts a new Crisp session without them, so session:loaded applies
// them again.
let user = null;

const applyUser = () => {
  if (!user) return;
  const { name, email, subject, lang } = user;
  if (name) window.$crisp.push(["set", "user:nickname", [name]]);
  if (email) window.$crisp.push(["set", "user:email", [email]]);
  window.$crisp.push(["set", "session:data", [[["keycloak_id", subject], ["language", lang]]]]);
};

const readOwner = () => {
  try {
    return localStorage.getItem(OWNER_KEY);
  } catch {
    return null;
  }
};

const writeOwner = (subject) => {
  try {
    if (subject) localStorage.setItem(OWNER_KEY, subject);
    else localStorage.removeItem(OWNER_KEY);
  } catch {
    // Without storage the owner check below resets on every load: no leak.
  }
};

// Crisp reads CRISP_RUNTIME_CONFIG once, when l.js loads, so the chat
// locale follows the UI language at first load only.
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
  window.$crisp.push(["on", "session:loaded", applyUser]);
  window.$crisp.push(["on", "chat:opened", () => {
    // Reopening a minimised chat must not restart the bot over a live talk.
    if (window.$crisp.is("session:ongoing")) return;
    const name = window.$crisp.get("user:nickname") || "";
    window.$crisp.push(["do", "bot:scenario:run", [BOT_SCENARIO_ID, { name }]]);
  }]);
};

// Ends this browser's chat session on logout, so the next person to log in
// does not see this user's conversation.
export const resetCrispOnLogout = () => {
  user = null;
  writeOwner(null);
  if (window.$crisp) window.$crisp.push(["do", "session:reset"]);
};

const CrispChat = () => {
  const language = useSelector((state) => state.settingsReducer.language);
  const keycloak = useSelector(keycloakData);
  const websiteId = window.APP_CONFIG.CRISP_WEBSITE_ID;

  const profile = keycloak?.profile;
  const name = [profile?.firstName, profile?.lastName].filter(Boolean).join(" ");
  const email = profile?.email;
  const subject = keycloak?.subject;
  const lang = (language || "en").split("-")[0];

  useEffect(() => {
    // Wait for the user: the session must be checked against them before the
    // chat shows anything.
    if (!websiteId || !subject) return;
    loadCrisp(websiteId, lang);
    // The Crisp cookie outlives logins. Whoever owned it before, if not this
    // user, must not leave their conversation to this one.
    if (readOwner() !== subject) {
      window.$crisp.push(["do", "session:reset"]);
      writeOwner(subject);
    }
    window.$crisp.push(["config", "position:reverse", [lang === "he"]]);
    user = { name, email, subject, lang };
    applyUser();
  }, [websiteId, lang, name, email, subject]);

  return null;
};

export default CrispChat;
