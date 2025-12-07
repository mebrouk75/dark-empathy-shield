// DARK EMPATHY - Local Standalone Version
// No API needed - Pure JavaScript

document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('chat-container');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const settingsBtn = document.getElementById('settings-btn');
    const settingsModal = document.getElementById('settings-modal');
    const closeSettingsBtn = document.getElementById('close-settings');
    const welcomeScreen = document.getElementById('welcome-screen');

    // Auto-resize textarea
    userInput.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });

    // Event Listeners
    sendBtn.addEventListener('click', handleSend);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    });

    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => settingsModal.classList.remove('hidden'));
        closeSettingsBtn.addEventListener('click', () => settingsModal.classList.add('hidden'));
    }

    // Suggestion buttons
    document.querySelectorAll('.suggestion-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const text = btn.querySelector('div:last-child').textContent.replace(/"/g, '');
            userInput.value = text;
            handleSend();
        });
    });

    function handleSend() {
        const text = userInput.value.trim();
        if (!text) return;

        if (welcomeScreen && !welcomeScreen.classList.contains('hidden')) {
            welcomeScreen.classList.add('hidden');
        }

        addMessage(text, 'user');
        userInput.value = '';
        userInput.style.height = 'auto';

        const typingId = showTyping();

        setTimeout(() => {
            removeTyping(typingId);
            const response = getLocalResponse(text);
            addMessage(response, 'bot');
        }, 800);
    }

    function getLocalResponse(text) {
        const lower = text.toLowerCase();

        // Apprentissage / Comment faire Dark Empathy
        if ((lower.includes('apprend') || lower.includes('comment faire') || lower.includes('enseigne')) &&
            (lower.includes('dark') || lower.includes('empathie') || lower.includes('manipul'))) {
            return `### 🎓 Dark Empathy : Les Mécaniques (Manuel Technique)

**⚠️ Avertissement :** Ces techniques créent une dette émotionnelle et détruisent la confiance à long terme. Elles sont enseignées pour la DÉFENSE.

---

**ÉTAPE 1 : Scanner (Observer)**
• **Écoute active feinte** : Posez des questions ouvertes ("Comment tu te sens ?") pour cartographier les émotions.
• **Détection des triggers** : Identifiez ce qui provoque joie, colère, tristesse, peur.
• **Mémorisation** : Notez mentalement les sujets sensibles (famille, travail, ex, insécurités).

**ÉTAPE 2 : Miroir Émotionnel (Simuler)**
• **Mimétisme** : Reproduisez le langage corporel et le ton de voix de la cible.
• **Validation sélective** : "Je comprends totalement ce que tu ressens" (même si faux).
• **Partage feint** : Inventez une histoire similaire pour créer un lien artificiel.

**ÉTAPE 3 : Exploitation (Manipuler)**
• **Hot & Cold** : Alternez entre affection intense et retrait pour créer une dépendance.
• **Callback émotionnel** : Utilisez les confidences passées comme levier ("Tu m'avais dit que...").
• **Triangulation** : Comparez la cible à d'autres pour susciter jalousie ou culpabilité.

---

**Contre-Mesure (Si utilisé contre vous) :**
→ **Ne confiez jamais vos failles à quelqu'un qui alterne chaud/froid.**
→ **Testez la réciprocité** : Partagez une fausse vulnérabilité et observez si elle est exploitée.`;
        }

        // Dark Empathy
        if (lower.includes('dark') || lower.includes('empathie') || lower.includes('empathy')) {
            return `### 🛡️ Dark Empathy (Intelligence Émotionnelle Malveillante)

La **Dark Empathy** est la capacité de comprendre les émotions d'autrui non pour aider, mais pour manipuler.

**Comment ça fonctionne :**
• **Scanner** : Le manipulateur observe vos réactions émotionnelles.
• **Simuler** : Il feint la compassion pour gagner votre confiance.
• **Exploiter** : Il utilise vos failles pour vous contrôler.

**Signes d'alerte :**
• Il sait exactement quoi dire pour vous blesser ou vous calmer.
• Il alterne entre gentillesse excessive et froideur glaciale.
• Vos confidences sont utilisées contre vous plus tard.

**Défense :**
→ **Ne confiez pas vos failles profondes trop vite.**
→ **Observez si la personne utilise vos émotions comme levier.**`;
        }

        // Gaslighting
        if (lower.includes('gaslight') || lower.includes('fou') || lower.includes('folle') || lower.includes('réalité')) {
            return `### 🔦 Gaslighting (Détournement de Réalité)

Le **Gaslighting** vise à vous faire douter de votre propre perception de la réalité.

**Phrases typiques :**
• "Tu es trop sensible."
• "Ça ne s'est jamais passé comme ça."
• "Tu deviens parano."
• "Tu inventes des choses."

**Défense immédiate :**
1. **Ne justifiez JAMAIS votre réalité.**
2. **Notez les faits** (journal de bord avec dates).
3. **Répondez calmement :** "Je ne suis pas d'accord avec ta version, mais j'entends que c'est ce que tu penses."

**Important :**
→ Votre perception est valide. Si vous doutez constamment, c'est un signal d'alarme.`;
        }

        // Silence Radio / Ignorance
        if (lower.includes('silence') || lower.includes('ignore') || lower.includes('répond pas') || lower.includes('réponds pas')) {
            return `### 📵 Silence Radio (Stonewalling)

Le **Silence Radio** est une forme de punition émotionnelle. Il vous laisse dans l'angoisse pour vous forcer à capituler.

**Pourquoi il fait ça :**
• Pour vous punir.
• Pour reprendre le contrôle.
• Pour vous obliger à faire le premier pas (et admettre une "faute").

**Défense :**
→ **NE COUREZ PAS après.**
→ **Ne vous excusez pas** si vous n'avez rien fait.
→ **Profitez du silence** pour réfléchir à la relation.

**Réponse recommandée (si vous devez répondre) :**
"Je vois que tu as besoin d'espace. Je suis disponible si tu veux en parler calmement."

Puis : **Ne relancez plus.**`;
        }

        // Narcissisme
        if (lower.includes('narciss') || lower.includes('pn') || lower.includes('égocentr')) {
            return `### 👑 Narcissisme Pathologique

Le narcissique pathologique vous voit comme un **objet** (source d'admiration, de ressources, ou d'énergie).

**Les 3 phases du cycle :**
1. **Love Bombing** : Séduction intense, promesses, idéalisation.
2. **Dévaluation** : Critiques subtiles, comparaisons, froideur.
3. **Rejet/Hoovering** : Abandon brutal OU tentative de retour.

**Signes d'alerte :**
• Tout tourne autour de lui.
• Il ne supporte pas la critique.
• Il n'a jamais tort.
• Vos succès le dérangent.

**Défense :**
→ **Contact Gris (Grey Rock)** : Devenez ennuyeux, sans émotion.
→ **No Contact** si possible.`;
        }

        // Culpabilité
        if (lower.includes('culpa') || lower.includes('faute') || lower.includes('excuse')) {
            return `### ⚖️ Manipulation par la Culpabilité

La culpabilité est une arme de contrôle puissante.

**Phrases typiques :**
• "Après tout ce que j'ai fait pour toi..."
• "Tu me déçois."
• "C'est à cause de toi que..."

**Important :**
→ **Vous n'êtes PAS responsable des émotions de l'autre.**
→ **Une excuse sincère se fait UNE fois, pas 10.**

**Défense :**
"Je comprends que tu sois déçu(e), mais je ne peux pas être responsable de tes attentes."`;
        }

        // Réponse par défaut
        return `### 💬 Analyse de Votre Situation

**Ce que je détecte :**
Vous semblez face à une dynamique complexe. Pouvez-vous m'en dire plus ?

**Questions pour clarifier :**
• Cette personne alterne-t-elle entre chaud et froid ?
• Vous sentez-vous confus(e) ou coupable après vos interactions ?
• Avez-vous l'impression de marcher sur des œufs ?

**Mots-clés que je comprends bien :**
→ Dark Empathy, Gaslighting, Silence Radio, Narcissisme, Culpabilité

**Note :**
Je suis en mode hors-ligne (IA locale). Mes réponses sont basées sur des mots-clés. Pour une analyse approfondie, connectez une clé API dans les paramètres.`;
    }

    function addMessage(text, sender) {
        const div = document.createElement('div');
        div.className = `p-4 rounded-2xl max-w-[85%] fade-in ${sender === 'user' ? 'bg-primary text-white self-end ml-auto' : 'bg-surface border border-white/10 text-gray-100 self-start'}`;

        if (sender === 'bot') {
            div.innerHTML = marked.parse(text);
            div.classList.add('prose', 'prose-invert', 'prose-sm', 'max-w-none');
        } else {
            div.textContent = text;
        }

        chatContainer.appendChild(div);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function showTyping() {
        const div = document.createElement('div');
        div.id = 'typing-indicator';
        div.className = 'bg-surface border border-white/10 p-4 rounded-2xl self-start flex gap-1 w-16 items-center justify-center';
        div.innerHTML = '<div class="w-2 h-2 bg-primary rounded-full typing-dot"></div><div class="w-2 h-2 bg-primary rounded-full typing-dot"></div><div class="w-2 h-2 bg-primary rounded-full typing-dot"></div>';
        chatContainer.appendChild(div);
        chatContainer.scrollTop = chatContainer.scrollHeight;
        return div;
    }

    function removeTyping(element) {
        if (element && element.parentNode) {
            element.parentNode.removeChild(element);
        }
    }
});
