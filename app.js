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

        // Love Bombing
        if (lower.includes('love bomb') || lower.includes('séduction intense') || lower.includes('trop gentil')) {
            return `### 💣 Love Bombing (Bombardement Amoureux)

Stratégie de séduction **excessive et rapide** pour vous rendre dépendant(e).

**Signes :**
• Déclarations d'amour ultra-rapides ("Tu es l'amour de ma vie" après 2 semaines).
• Avalanche de cadeaux, messages, attention.
• Future-faking : "On va se marier, avoir des enfants..." (promesses irréalistes).

**Pourquoi c'est toxique :**
→ C'est un **investissement pour vous contrôler** plus tard.
→ Crée une dette émotionnelle ("Après tout ce qu'il a fait pour moi...").

**Défense :**
→ **Méfiance si c'est trop beau trop vite.**
→ **Observez les actes sur la durée**, pas les paroles.`;
        }

        // Triangulation
        if (lower.includes('triangul') || lower.includes('jalousie') || lower.includes('compare')) {
            return `### 🔺 Triangulation

Technique pour vous mettre en **compétition** avec une tierce personne (réelle ou imaginaire).

**Exemples :**
• "Mon ex ne m'aurait jamais parlé comme ça."
• "X m'a proposé de sortir, mais j'ai dit non..." (pour te rendre jaloux/se).
• Mettre en avant un(e) ami(e) pour créer de l'insécurité.

**Objectif :**
→ Vous rendre **insécure** et **dépendant(e)** de son approbation.

**Défense :**
→ **Ne jouez pas le jeu.** Refusez la compétition.
→ Réponse : "Je ne vais pas me comparer à qui que ce soit."`;
        }

        // Hoovering
        if (lower.includes('hoover') || lower.includes('aspirateur') || lower.includes('revient') || lower.includes('retour')) {
            return `### 🌪️ Hoovering (Aspiration de Retour)

Tentative de **vous ramener** après une rupture ou un conflit.

**Tactiques :**
• Messages nostalgiques : "Tu me manques, je pense à toi..."
• Fausses excuses : "J'ai changé, je te promets."
• Urgence fabriquée : "J'ai besoin de toi, je vais mal..."
• Contact indirect : Like sur les réseaux, message à un ami commun.

**Défense (si vous voulez le No Contact) :**
→ **Bloquez partout** (téléphone, réseaux, email).
→ **Ne répondez JAMAIS.** Même un "laisse-moi tranquille" = victoire pour lui.

**Important :**
→ Le hoovering arrive souvent **quand vous allez mieux.** C'est intentionnel.`;
        }

        // Trauma Bond / Lien Traumatique
        if (lower.includes('trauma bond') || lower.includes('lien trauma') || lower.includes('attachement')) {
            return `### 🔗 Trauma Bond (Lien Traumatique)

**Attachement pathologique** créé par l'alternance de violence et de gentillesse.

**Pourquoi c'est si puissant :**
• Le cerveau associe la **douleur au soulagement** qui suit.
• Vous espérez constamment **retrouver la version gentille**.
• Créé une dépendance chimique (montées de dopamine).

**Signes que vous êtes trauma-bonded :**
• Vous le détestez ET ne pouvez pas partir.
• Vous le défendez devant les autres.
• Chaque fois qu'il est gentil, vous oubliez le reste.

**Défense (Réveil en Douceur) :**
→ **Notez les mauvais moments** dans un journal (pour contrer l'amnésie).
→ **No Contact** : C'est la SEULE façon de briser le lien.
→ **Patience** : Le sevrage prend du temps (comme une addiction).`;
        }

        // Violence Physique (ALERTE CRITIQUE)
        if (lower.includes('violence') || lower.includes('frappe') || lower.includes('coup') || lower.includes('physique')) {
            return `### 🚨 ALERTE VIOLENCE PHYSIQUE

**IMPORTANT : Votre sécurité est prioritaire.**

**Numéros d'urgence France :**
• **3919** : Violences Femmes Info (gratuit, anonyme, 24h/7j)
• **17** : Police Secours
• **114** : SMS d'urgence (si vous ne pouvez pas parler)

---

**Le Cycle de la Violence (à connaître) :**
1. **Tension** : Atmosphere lourde, marche sur des œufs.
2. **Explosion** : Violence (verbale/physique).
3. **Lune de Miel** : Excuses, promesses, gentillesse.
4. **➰ Répétition** : Le cycle recommence (et s'empire).

**Phrases dangereuses :**
• "Tu m'as poussé à bout."
• "C'était juste une claque, pas de la violence."
• "C'est le stress du travail."

**VÉRITÉ :**
→ **Il n'y a AUCUNE excuse** pour la violence.
→ **Ça ne s'arrête JAMAIS** sans intervention.

**Action immédiate :**
→ **Sortez de la pièce** si possible.
→ **Appelez le 3919** pour un plan de sortie sécurisé.
→ **Main courante** : Allez au commissariat (trace légale sans plainte).`;
        }

        // Legal Warfare / Menaces Juridiques
        if (lower.includes('menace') || lower.includes('avocat') || lower.includes('tribunal') || lower.includes('juridique') || lower.includes('légal')) {
            return `### ⚖️ Legal Warfare (Guerre Juridique / Bluff)

Les manipulateurs utilisent les **menaces légales** pour terroriser.

**Menaces courantes (souvent du BLUFF) :**
• "Je vais te faire perdre la garde des enfants."
• "Mon avocat va te détruire."
• "Je vais bloquer ton compte bancaire."
• "Tu vas payer une pension énorme."

**VÉRITÉ :**
→ **80% de ces menaces sont du bluff.**
→ Un vrai avocat ne menace pas, il agit.

**Défense :**
1. **Ne réagissez pas émotionnellement.**
2. **Consultez un vrai avocat** (gratuit : permanences juridiques).
3. **Documentez tout** : SMS, emails, enregistrements (légaux en France si vous êtes partie prenante).
4. **Réponse type :** "Si tu souhaites des procédures légales, mon avocat te contactera."

**Spécial Parents :**
→ La garde est basée sur **l'intérêt de l'enfant**, pas sur les cris du manipulateur.
→ Un parent qui menace de retirer l'enfant montre son instabilité au juge.`;
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
