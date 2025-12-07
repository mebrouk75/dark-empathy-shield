// DARK EMPATHY - ASTRAL PRO (Hybrid Version)

document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('chat-container');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const settingsBtn = document.getElementById('settings-btn');
    const settingsModal = document.getElementById('settings-modal');
    const closeSettingsBtn = document.getElementById('close-settings');
    const saveSettingsBtn = document.getElementById('save-settings');
    const apiKeyInput = document.getElementById('api-key-input');
    const welcomeScreen = document.getElementById('welcome-screen');
    const toastContainer = document.getElementById('toast-container');

    // Load saved API key
    // Load saved API key or use Default
    const DEFAULT_API_KEY = 'AIzaSyBtzgUyJ3uLH7G5UII5hX5iTwwZmu1viy4';
    const savedKey = localStorage.getItem('gemini_api_key_v3');
    if (savedKey && apiKeyInput) {
        apiKeyInput.value = savedKey;
    }

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

        saveSettingsBtn.addEventListener('click', () => {
            const key = apiKeyInput.value.trim();
            if (key) {
                localStorage.setItem('gemini_api_key', key);
                showToast('Clé API sauvegardée', 'success');
                settingsModal.classList.add('hidden');
            }
        });
    }

    // Suggestion buttons
    document.querySelectorAll('.suggestion-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const text = btn.querySelector('.text-sm').textContent.replace(/"/g, '');
            userInput.value = text;
            handleSend();
        });
    });

    // Version Check
    console.log("Dark Empathy Shield v3.0 (Astral Pro) Loaded");

    // Freemium Logic
    const MAX_FREE_MESSAGES = 3;
    let messageCount = parseInt(localStorage.getItem('dark_empathy_msg_count') || '0');
    let isPremium = localStorage.getItem('dark_empathy_premium') === 'true'; // Check permanent flag first

    // Check Premium Status & Expiry
    const premiumExpiry = localStorage.getItem('dark_empathy_premium_expiry');
    if (premiumExpiry && Date.now() < parseInt(premiumExpiry)) {
        isPremium = true;
    } else if (premiumExpiry) {
        // Expired
        localStorage.removeItem('dark_empathy_premium_expiry');
        isPremium = false;
    }

    async function handleSend() {
        const text = userInput.value.trim();
        if (!text) return;

        // Check Paywall
        if (!isPremium && messageCount >= MAX_FREE_MESSAGES) {
            showPaywall();
            return;
        }

        if (welcomeScreen && !welcomeScreen.classList.contains('hidden')) {
            welcomeScreen.classList.add('hidden');
        }

        addMessage(text, 'user');
        userInput.value = '';
        userInput.style.height = 'auto';

        // Increment Count
        if (!isPremium) {
            messageCount++;
            localStorage.setItem('dark_empathy_msg_count', messageCount.toString());
        }

        const typingId = showTyping();

        // Try API first (User key OR Default key)
        const apiKey = localStorage.getItem('gemini_api_key_v3') || DEFAULT_API_KEY;

        if (apiKey) {
            try {
                // Basic validation
                if (!apiKey.startsWith('AIza')) {
                    throw new Error('Clé API invalide');
                }

                const apiResponse = await callAI(text, apiKey);
                removeTyping(typingId);
                addMessage(apiResponse, 'bot');
                return;
            } catch (error) {
                console.error("API Error, falling back to local:", error);
                showToast("Mode hors-ligne activé (Erreur API)", "warning");
                // Fallback silently to local
            }
        }

        // Local Fallback
        setTimeout(() => {
            removeTyping(typingId);
            const response = getLocalResponse(text);
            addMessage(response, 'bot');
        }, 800);
    }

    function showPaywall(message = null) {
        const modal = document.getElementById('paywall-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');

            // Setup Unlock Logic
            const codeInput = document.getElementById('access-code-input');
            const submitBtn = document.getElementById('submit-code-btn');
            const errorMsg = document.getElementById('code-error');

            if (submitBtn) {
                submitBtn.onclick = () => {
                    const code = codeInput.value.trim().toUpperCase();
                    // HARDCODED CODES (To be replaced by real backend later)
                    const validCodes = ['DARK30', 'VIP2025', 'ASTRAL'];
                    const adminCodes = ['MEHDI_BOSS', 'ADMIN'];

                    if (adminCodes.includes(code)) {
                        // ADMIN UNLOCK (PERMANENT)
                        localStorage.setItem('dark_empathy_premium', 'true'); // Permanent flag
                        localStorage.removeItem('dark_empathy_premium_expiry'); // Remove timer
                        isPremium = true;

                        modal.classList.add('hidden');
                        modal.classList.remove('flex');
                        showToast("Mode Admin Activé 👑", "success");
                    } else if (validCodes.includes(code)) {
                        // UNLOCK FOR 30 MINUTES
                        const expiry = Date.now() + (30 * 60 * 1000); // 30 mins
                        localStorage.setItem('dark_empathy_premium_expiry', expiry.toString());
                        isPremium = true;

                        modal.classList.add('hidden');
                        modal.classList.remove('flex');
                        showToast("Accès Pro activé (30 min)", "success");
                    } else {
                        errorMsg.classList.remove('hidden');
                        setTimeout(() => errorMsg.classList.add('hidden'), 2000);
                    }
                };
            }
        }
    }

    async function callAI(prompt, apiKey) {
        const systemPrompt = `Tu es DARK EMPATHY, un expert en psychologie et défense contre la manipulation.
        TON RÔLE : Analyser les messages, détecter la toxicité, et donner des conseils de défense concrets.
        TON STYLE : Professionnel, direct, empathique mais ferme. Pas de moralisation.
        FORMAT : Utilise le Markdown. Sois concis.`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: systemPrompt + "\n\nUSER: " + prompt }]
                }]
            })
        });

        if (!response.ok) {
            throw new Error('API Request Failed');
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    }

    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        const colors = {
            success: 'bg-emerald-500/20 border-emerald-500/50 text-emerald-200',
            warning: 'bg-amber-500/20 border-amber-500/50 text-amber-200',
            error: 'bg-primary/20 border-primary/50 text-primary-200',
            info: 'bg-primary/20 border-primary/50 text-primary-200'
        };

        toast.className = `px-4 py-3 rounded-xl border backdrop-blur-md text-sm font-medium shadow-lg transform transition-all duration-300 translate-y-10 opacity-0 ${colors[type] || colors.info}`;
        toast.textContent = message;

        toastContainer.appendChild(toast);

        // Animate in
        requestAnimationFrame(() => {
            toast.classList.remove('translate-y-10', 'opacity-0');
        });

        // Remove after 3s
        setTimeout(() => {
            toast.classList.add('translate-y-10', 'opacity-0');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    function getLocalResponse(text) {
        const lower = text.toLowerCase();

        // Analyse de MESSAGE LONG (SMS/Email à analyser)
        if (text.length > 100) {
            const suspiciousPatterns = [
                { pattern: /inqui[èe]te|peur (que|pour)|crainte|souci/i, score: 2, type: "faux_souci" },
                { pattern: /sensible|fragile|pas pr[êe]t|pas les [ée]paules|trop|[ée]puis[ée]|repose-toi|fatig/i, score: 3, type: "infantilisation" },
                { pattern: /comme d.habitude|toujours l[àa]|encore une fois|je serai l[àa]|pas besoin de (me )?remerci/i, score: 3, type: "dette" },
                { pattern: /pression|trop (grand|gros)|[ée]chec|craquer|tomb/i, score: 2, type: "sabotage" },
                { pattern: /je te connais|je sais (que|comment)|[àa] quel point/i, score: 2, type: "intimite_feinte" },
                { pattern: /prot[ée]ger|[ée]viter|te couvrir|m.occup/i, score: 2, type: "paternalisme" },
                { pattern: /j.ai corrig[ée]|version finale.*mienne|j.ai envoy[ée].*boss|petites erreurs/i, score: 4, type: "sabotage_pro" },
                { pattern: /bravo.{1,100}(mais|quelques|petite)/i, score: 2, type: "compliment_sandwich" }
            ];

            let totalScore = 0;
            let detectedTypes = [];

            suspiciousPatterns.forEach(p => {
                if (p.pattern.test(text)) {
                    totalScore += p.score;
                    if (!detectedTypes.includes(p.type)) detectedTypes.push(p.type);
                }
            });

            if (totalScore >= 6) {
                return `### 🚨 ALERTE : MESSAGE MANIPULATEUR DÉTECTÉ

**Analyse du message que vous avez reçu :**

---

**TECHNIQUES UTILISÉES :**

${detectedTypes.includes('faux_souci') ? `• **Faux Souci** : "J'ai peur pour toi", "ça m'inquiète"\n→ Il fait semblant de s'inquiéter pour **saboter votre succès**.\n` : ''}${detectedTypes.includes('infantilisation') ? `• **Infantilisation** : "Tu es sensible", "tu n'as pas les épaules"\n→ Il vous traite comme un **enfant incapable** de décider.\n` : ''}${detectedTypes.includes('sabotage') ? `• **Sabotage de Succès** : "Pression monstre", "si ça craque"\n→ Au lieu de vous encourager, il **amplifie les risques**.\n` : ''}${detectedTypes.includes('dette') ? `• **Dette Émotionnelle** : "Je serai là pour ramasser les morceaux **comme d'habitude**"\n→ Il vous rappelle que vous lui **devez** quelque chose.\n` : ''}${detectedTypes.includes('intimite_feinte') ? `• **Fausse Intimité** : "Je te connais par cœur"\n→ Il utilise la proximité pour **justifier son contrôle**.\n` : ''}${detectedTypes.includes('paternalisme') ? `• **Paternalisme** : "Je veux te protéger"\n→ Il se place en **parent**, pas en partenaire égal.\n` : ''}${detectedTypes.includes('sabotage_pro') ? `• **Sabotage Professionnel** : "J'ai corrigé", "version finale (la mienne)"\n→ Il **vole votre crédit** et vous **infantilise**.\n` : ''}${detectedTypes.includes('compliment_sandwich') ? `• **Compliment Sandwich** : "Bravo MAIS..."\n→ Le compliment sert juste à faire passer la critique.\n` : ''}

---

**RÉPONSE RECOMMANDÉE :**

**Option 1 (Ferme)** :
"Merci pour ton inquiétude, mais j'ai confiance en moi."

**Option 2 (Frontale)** :
"J'ai besoin de soutien, pas de doutes."`;
            }
        }

        // Apprentissage / Comment faire Dark Empathy
        if (lower.includes('apprend') || lower.includes('enseigne') || lower.includes('montre') ||
            lower.includes('comment faire') || lower.includes('comment ça marche')) {
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

        // Demande de précision / détails (version ultra-détaillée)
        if (lower.includes('précis') || lower.includes('preci') || lower.includes('détail') || lower.includes('detail') ||
            (lower.includes('exemple') && lower.includes('concret'))) {
            return `### 🎓 Dark Empathy : MANUEL ULTRA-DÉTAILLÉ (Exemples Concrets)

---

## ÉTAPE 1 : SCANNER (Observer les Failles)

**Objectif** : Cartographier la psyché de la cible.

**TECHNIQUES CONCRÈTES :**

### 1A. Écoute Active Feinte
**Action** : Posez des questions ouvertes avec un air concerné.
**Exemples de phrases** :
- "Comment tu te sens vraiment ?"
- "Qu'est-ce qui te fait le plus peur dans la vie ?"
- "Parle-moi de ta famille..."

**Ce que vous cherchez** :
- **Insécurités** : "Je me trouve trop..." → Vous savez sur quoi appuyer.
- **Besoins non comblés** : "Personne ne m'écoute jamais" → Vous devenez "celui qui écoute".
- **Traumas passés** : "Mon ex m'a trompé(e)" → Vous savez quelle blessure réactiver.

### 1B. Test des Réactions Émotionnelles
**Action** : Racontez une histoire triste/joyeuse et observez.
**Exemple** :
- "Mon chien est mort quand j'avais 10 ans..."
- **Si la cible pleure** → Empathie forte (exploitable).
- **Si elle change de sujet** → Empathie faible (plus difficile).

### 1C. Identification des Triggers
**Action** : Notez ce qui provoque une réaction forte.
**Exemple** :
- Mentionnez un ex → Elle devient tendue → **Trigger = Jalousie.**
- Mentionnez sa famille → Elle se ferme → **Trigger = Conflit familial.**

**MÉMORISATION** : Créez un fichier mental (ou réel) :
- Peurs : Abandon, rejet, échec
- Désirs : Reconnaissance, amour, sécurité
- Traumas : Divorce des parents, trahison, violence

---

## ÉTAPE 2 : SIMULER (Miroir Émotionnel)

**Objectif** : Créer un lien artificiel de "soulmate".

**TECHNIQUES CONCRÈTES :**

### 2A. Mimétisme (Mirroring)
**Action** : Copiez le langage corporel, le rythme de parole, les expressions.
**Exemple** :
- Elle croise les bras → Vous croisez les bras 2 secondes après.
- Elle parle lentement → Vous ralentissez votre débit.
- Elle utilise "genre" → Vous utilisez "genre".

**Effet** : Le cerveau inconscient détecte la similarité → Confort → Confiance.

### 2B. Validation Sélective
**Action** : Validez TOUT ce qu'elle dit, même si vous n'y croyez pas.
**Exemple** :
- **Elle** : "Je me sens invisible au travail."
- **Vous** : "Je comprends TOTALEMENT. C'est fou comme les gens ne voient pas les vraies perles."

**Attention** : Ne validez que ce qui renforce la dépendance. Si elle dit "Je veux partir", vous validez l'émotion mais redirigez.

### 2C. Partage Feint (Fausse Vulnérabilité)
**Action** : Inventez une histoire qui "résonne" avec la sienne.
**Exemple** :
- **Elle** : "Mon père ne m'a jamais dit qu'il m'aimait."
- **Vous** : "Putain, pareil... Mon père était toujours froid. On a grandi pareil toi et moi." (même si faux)

**Effet** : "On se comprend comme personne." → Lien unique artificiel.

---

## ÉTAPE 3 : EXPLOITER (Manipuler)

**Objectif** : Utiliser les failles pour contrôler.

**TECHNIQUES CONCRÈTES :**

### 3A. Hot & Cold (Chaud/Froid)
**MÉTHODE** :
1. **Phase HOT (1-2 semaines)** : Soyez parfait.
   - Messages toutes les heures : "Je pense à toi ❤️"
   - Cadeaux, sorties, compliments.
   - Sexe/Affection intense.
   
2. **Phase COLD (3-5 jours)** : Disparaissez.
   - Ne répondez plus aux messages (ou réponses sèches : "Ok").
   - Prétexte vague : "Grosse semaine au travail."
   - Annulez un rendez-vous au dernier moment.

3. **Retour HOT** : Revenez comme si de rien n'était.
   - "Désolé(e), j'étais débordé(e). Tu m'as trop manqué."
   - **Si elle se plaint** : "T'es trop sensible, c'était juste 3 jours."

**Effet** : Son cerveau entre en mode "slot machine". Elle ne sait jamais quand vous serez gentil → Elle vous chasse.

### 3B. Callback Émotionnel (Utiliser les Confidences)
**Action** : Utilisez ce qu'elle vous a confié CONTRE elle.
**Exemple** :
- **Elle vous a dit** : "J'ai peur que personne ne m'aime vraiment."
- **Vous utilisez** (en conflit) : "Personne ne te supportera si tu continues comme ça. Tu vois pourquoi tu es seule ?"

**Effet** : Double coup → Elle se sent trahie ET confirmée dans sa peur.

### 3C. Triangulation (Créer la Jalousie)
**Action** : Introduisez une "menace" (réelle ou fictive).
**Exemple** :
- "Ah, Sophie m'a encore envoyé un message... Elle est relou."
- Likez les photos d'un(e) ex.
- Comparez : "Mon ex cuisinait hyper bien, elle."

**Effet** : Insécurité → Elle va se battre pour vous garder → Vous contrôlez.

---

## CONTRE-MESURES (Si Utilisé Contre Vous)

### TEST DE RÉCIPROCITÉ
**Action** : Partagez une FAUSSE vulnérabilité mineure et observez.
**Exemple** :
- "Je stresse un peu pour mon examen demain." (alors que vous n'en avez pas vraiment peur)
- **Si utilisé contre vous plus tard** : "T'es toujours stressé(e) pour rien !" → RED FLAG.

### RÈGLE D'OR
→ **Si quelqu'un alterne chaud/froid régulièrement, c'est INTENTIONNEL.**
→ **Ne confiez JAMAIS vos traumas réels à quelqu'un qui vous teste.**`;
        }

        // Créer le Manque / Intermittent Reinforcement
        if ((lower.includes('manque') || lower.includes('dépend') || lower.includes('accro')) &&
            (lower.includes('créer') || lower.includes('comment') || lower.includes('faire'))) {
            return `### 🎰 Créer le Manque (Intermittent Reinforcement)

**Principe :** Rendre quelqu'un **dépendant** de votre attention en la rendant **imprévisible**.

---

**MÉTHODE (Hot & Cold Avancé) :**

**Phase 1 : Saturation (Love Bombing)**
• Soyez **omniprésent** pendant 1-2 semaines.
• Messages constants, appels, sorties, cadeaux.
• **Objectif** : Habituer la personne à votre présence.

**Phase 2 : Retrait Brutal (Withdrawal)**
• **Disparaissez** sans explication (ou prétexte vague).
• Ne répondez plus aux messages (ou réponses froides/courtes).
• **Durée** : 2-5 jours minimum.
• **Effet** : Anxiété, confusion, besoin de comprendre.

**Phase 3 : Retour en Force (Reward)**
• **Revenez** comme si de rien n'était.
• Soyez à nouveau hyper-affectueux.
• Si la personne se plaint : "T'es trop sensible" ou "J'étais occupé(e)".
• **Effet** : Soulagement intense = montée de dopamine.

**Phase 4 : Répétition (Addiction)**
• **Alternez** les phases 2 et 3 de façon **imprévisible**.
• Le cerveau de la cible entre en mode **slot machine**.
• Elle ne sait jamais quand vous serez gentil(le) → elle vous **chasse**.

---

**POURQUOI C'EST EFFICACE :**
→ **Renforcement intermittent** : C'est la technique des casinos.
→ Le cerveau devient **accro à l'incertitude**.
→ La cible vous donne toute son énergie pour "retrouver" la version gentille.

---

**CONTRE-MESURE (Si utilisé contre vous) :**
→ **Identifiez le pattern** : Si quelqu'un alterne chaud/froid, c'est intentionnel.
→ **Ne courez PAS après.**
→ **Exigez de la cohérence** : "Je veux une relation stable, pas des montagnes russes."
→ **Partez** si ça continue (c'est une manipulation, pas de l'amour).`;
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

        // DARVO (Deny, Attack, Reverse Victim & Offender)
        if (lower.includes('darvo') || (lower.includes('inverse') && lower.includes('victime'))) {
            return `### 🔄 DARVO (Inversion Victime/Agresseur)

**D**eny (Nier) → **A**ttack (Attaquer) → **R**everse **V**ictim & **O**ffender (Inverser les rôles)

**Exemple concret :**
1. **Vous** : "Tu m'as crié dessus hier."
2. **Lui (Deny)** : "Ça ne s'est pas passé comme ça."
3. **Lui (Attack)** : "Tu es trop sensible, tu inventes des choses."
4. **Lui (Reverse)** : "C'est TOI qui m'agresses en me reprochant ça constamment."

**Résultat :** Vous vous excusez alors que VOUS êtes la victime.

**Défense :**
→ **Ne justifiez pas.** Si vous savez ce qui s'est passé, tenez bon.
→ **Réponse** : "Je ne vais pas débattre de ma réalité."`;
        }

        // Future Faking (Promesses fantômes)
        if (lower.includes('future fak') || lower.includes('promesse') || lower.includes('futur')) {
            return `### 🔮 Future Faking (Promesses Fantômes)

Promettre un **futur idéalisé** qui n'arrivera jamais.

**Exemples :**
• "On va se marier l'année prochaine."
• "Je vais changer, je te promets."
• "On fera ce voyage dont tu rêves."
• "Bientôt je quitterai ma femme/mon mari."

**Mais... rien ne se concrétise jamais.**

**Objectif :**
→ Vous garder **accroché(e)** à un espoir.
→ Reporter vos attentes à l'infini.

**Défense :**
→ **Exigez des actes, pas des paroles.**
→ **Deadline** : "Si rien ne bouge d'ici X mois, je pars."`;
        }

        // Breadcrumbing (Miettes)
        if (lower.includes('breadcrumb') || lower.includes('miette')) {
            return `### 🍞 Breadcrumbing (Miettes d'Attention)

Donner **juste assez** d'attention pour vous garder intéressé(e), mais **jamais assez** pour vous satisfaire.

**Signes :**
• Messages sporadiques : "Coucou, tu me manques" (puis silence pendant 1 semaine).
• Projets vagues : "On devrait se voir un jour."
• Refus d'engagement concret.

**Objectif :**
→ Vous garder en **option** sans effort.

**Défense :**
→ **Exigez de la cohérence.**
→ "Je ne suis pas une option, je veux une relation claire."`;
        }

        // Negging (Compliments empoisonnés)
        if (lower.includes('negging') || (lower.includes('compliment') && lower.includes('insult'))) {
            return `### 💀 Negging (Compliments Empoisonnés)

**Backhanded compliment** : Compliment qui cache une insulte.

**Exemples :**
• "T'es jolie pour une fille de ta taille."
• "T'es intelligent(e) pour quelqu'un qui n'a pas fait d'études."
• "J'aime que tu sois naturelle (= tu ne fais pas d'efforts)."
• "T'es courageuse de porter ça."

**Objectif :**
→ Baisser votre **estime de vous** tout en semblant gentil.
→ Créer de l'insécurité pour vous contrôler.

**Défense :**
→ **Appelez-le** : "Qu'est-ce que tu veux dire exactement ?"
→ **Partez** si c'est récurrent.`;
        }

        // Flying Monkeys (Alliés recrutés)
        if (lower.includes('flying monk') || lower.includes('alli') || lower.includes('entourage')) {
            return `### 🐵 Flying Monkeys (Alliés Manipulés)

**Personnes recrutées** par le manipulateur pour vous harceler/surveiller.

**Qui ce peut être :**
• Famille
• Amis communs
• Nouveaux partenaires
• Thérapeutes mal informés

**Comment ils agissent :**
• "Il/Elle m'a dit que tu lui faisais du mal..."
• "Tu devrais lui pardonner, il/elle a changé."
• Espionnage : Rapportent vos faits et gestes au manipulateur.

**Défense :**
→ **Information limitée** : Ne partagez rien de sensible avec l'entourage commun.
→ **Bloc ferme** : "Je ne veux pas en discuter."
→ **Grey Rock** : Soyez ennuyeux, ne donnez pas de matière.`;
        }

        // Smear Campaign (Diffamation)
        if (lower.includes('smear') || lower.includes('diffam') || lower.includes('réputation')) {
            return `### 📣 Smear Campaign (Campagne de Diffamation)

Le manipulateur **détruit votre réputation** avant que vous ne parliez.

**Tactiques :**
• Raconter SA version à tout le monde en premier.
• Vous peindre comme "fou/folle", "agressif/ve", "menteur/se".
• Utiliser des demi-vérités déformées.

**Objectif :**
→ **Isoler** : Personne ne vous croira.
→ **Contrôler le récit**.

**Défense :**
→ **Ne vous défendez pas publiquement** (ça confirme son récit).
→ **Vos vrais amis** verront la vérité avec le temps.
→ **Documentez tout** (pour preuve si nécessaire).`;
        }

        // Projection
        if (lower.includes('projection') || (lower.includes('accuse') && lower.includes('fait'))) {
            return `### 🪞 Projection

**T'accuser de ce qu'il fait lui-même.**

**Exemples :**
• Il vous trompe → "Je suis sûr(e) que TU me trompes."
• Il ment → "Tu mens tout le temps."
• Il est toxique → "Tu es toxique."

**Objectif :**
→ **Dévier l'attention** de ses actes.
→ Vous mettre sur la défensive.

**Défense :**
→ **N'entrez pas dans le débat.**
→ "Je ne vais pas me défendre d'accusations sans fondement."`;
        }

        // Word Salad (Confusion verbale)
        if (lower.includes('word salad') || lower.includes('confus') || lower.includes('incompréhensible')) {
            return `### 🥗 Word Salad (Salade de Mots)

Discours **volontairement confus** pour vous déstabiliser.

**Signes :**
• Change de sujet constamment.
• Phrases contradictoires.
• Utilise votre confusion comme preuve que vous "ne comprenez rien".

**Objectif :**
→ **Épuisement mental**.
→ Vous faire abandonner la conversation.

**Défense :**
→ **Recentrez** : "Revenons au sujet initial."
→ **Écrit** : Exigez les discussions importantes par écrit (email/SMS).`;
        }

        // Baiting (Provocation)
        if (lower.includes('bait') || lower.includes('provoc')) {
            return `### 🎣 Baiting (Provocation)

**Vous pousser à bout** pour ensuite vous accuser d'être "fou/folle" ou "agressif/ve".

**Exemples :**
• Répéter la même phrase en boucle.
• Toucher des sujets sensibles délibérément.
• Nier des faits évidents jusqu'à ce que vous explosiez.

**Objectif** : **Reactive Abuse** (voir ci-dessous).

**Défense :**
→ **Ne mordez pas à l'hameçon.**
→ **Sortez de la pièce** avant d'exploser.`;
        }

        // Reactive Abuse
        if (lower.includes('reactive') || (lower.includes('réact') && lower.includes('abuse'))) {
            return `### 💥 Reactive Abuse (Abus Réactif)

**Vous pousser à réagir violemment** pour ensuite vous pointer du doigt.

**Scénario typique :**
1. Il vous **provoque** (baiting) pendant des heures.
2. Vous **explosez** (cris, pleurs, geste brusque).
3. Il devient **calme** : "Tu vois ? TU es la personne violente."
4. Il **utilise** cet incident contre vous (devant famille, tribunal, thérapeute).

**Défense :**
→ **Identifiez le pattern** : Si vous êtes "poussé(e) à bout" régulièrement, c'est volontaire.
→ **Partez avant d'exploser.**
→ **Enregistrez** (si légal) les provocations.`;
        }

        // Medical/Psychiatric Gaslighting
        if (lower.includes('medical gaslight') || lower.includes('psy') || lower.includes('fou') || lower.includes('folle')) {
            return `### 🩺 Medical Gaslighting (Psychiatrisation Abusive)

**Vous faire passer pour mentalement instable.**

**Phrases :**
• "Tu es bipolaire."
• "Tu devrais consulter un psy."
• "Ta famille dit que tu es instable."
• "C'est tes médicaments qui te rendent parano."

**En réalité :** Vos réactions sont **NORMALES** face à de l'abus.

**Défense :**
→ **Consultez VOTRE psy** (pas celui qu'il suggère).
→ Un bon thérapeute détectera la manipulation.`;
        }

        // Financial Abuse
        if (lower.includes('financ') || lower.includes('argent') || (lower.includes('contrôle') && lower.includes('banque'))) {
            return `### 💰 Financial Abuse (Contrôle Financier)

**Vous rendre financièrement dépendant(e).**

**Tactiques :**
• Vous empêcher de travailler.
• Contrôler tous les comptes bancaires.
• Vous forcer à demander de l'argent pour tout.
• Cacher vos ressources.

**Objectif :**
→ **Vous piéger** : "Sans argent, tu ne peux pas partir."

**Défense (Préparation) :**
→ **Compte secret** si possible.
→ **Documents cachés** (papiers d'identité, relevés).
→ **Aide juridique** : Associations spécialisées (3919).`;
        }

        // Isolation
        if (lower.includes('isol') || (lower.includes('coupé') && (lower.includes('ami') || lower.includes('famille')))) {
            return `### 🏝️ Isolation (Couper les Liens)

**Vous séparer** de votre réseau de soutien.

**Méthodes :**
• "Ta famille te manipule."
• "Tes amis sont toxiques."
• Crises chaque fois que vous voyez quelqu'un.
• Déménagement loin de votre entourage.

**Objectif :**
→ **Vous affaiblir** : Sans soutien, plus facile à contrôler.

**Défense :**
→ **Maintenez le contact** coûte que coûte (même en secret).
→ **Signal d'alarme** : Si une relation vous isole, c'est toxique.`;
        }

        // Double Bind (Double contrainte)
        if (lower.includes('double bind') || lower.includes('double contrainte') || lower.includes('piège')) {
            return `### ⚖️ Double Bind (Double Contrainte / Piège Lose-Lose)

**Vous mettre dans une situation où vous avez tort quoi que vous fassiez.**

**Exemples :**
• "Pourquoi tu ne me parles plus ?" → Vous parlez → "Arrête de me harceler !"
• "Sois spontané(e) !" (ordre paradoxal : si vous obéissez, ce n'est plus spontané).
• "Pourquoi tu ne me fais jamais confiance ?" (alors qu'il ment constamment).

**Objectif :**
→ **Confusion et impuissance.**

**Défense :**
→ **Nommez-le** : "C'est un piège. Quoi que je fasse, j'ai tort."
→ **Refusez de jouer** : "Je ne vais pas entrer dans cette logique."`;
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
        div.className = `p-4 rounded-2xl max-w-[85%] fade-in ${sender === 'user' ? 'bg-primary text-white self-end ml-auto shadow-lg shadow-primary/20' : 'glass text-gray-100 self-start'}`;

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
        div.className = 'glass p-4 rounded-2xl self-start flex gap-1 w-16 items-center justify-center';
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
// Force redeploy Mon Dec  8 00:20:25 CET 2025
