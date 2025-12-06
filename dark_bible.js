// LA BIBLE DE L'EMPATHIE SOMBRE (DARK EMPATHY BIBLE)
// Une base de connaissance massive pour remplacer l'IA en ligne.
// VERSION UNIVERSELLE (HOMMES & FEMMES)

const DARK_BIBLE = [
    // -------------------------------------------------------------------------
    // 👑 DIGNITÉ RADICALE (L'AFFIRMATION DE SOI)
    // -------------------------------------------------------------------------
    {
        id: "dignite_radicale",
        triggers: ["je vais me respecter", "je m'aime d'abord", "je ne ressens pas de manque", "chacun son chemin", "sans animosité", "ma réalité", "mon bien-être", "je dois avancer"],
        analysis: "Dignité Radicale. Ce n'est pas une plainte, c'est une libération. Tu ne demandes rien, tu poses une limite finale.",
        response: [
            "C'est un message de puissance. Tu ne cherches pas à faire culpabiliser l'autre, tu cherches à te sauver toi-même.",
            "Tu as transformé ta douleur en standard. Tu dis 'Je t'aime, mais je m'aime plus'. C'est la définition de la guérison.",
            "Il n'y a aucune manipulation ici. Juste un constat lucide et un adieu propre. C'est royal."
        ],
        counter_attack: "Ce message est parfait. Il n'appelle pas de réponse. C'est un point final."
    },

    // -------------------------------------------------------------------------
    // 🟢 ZONE VERTE : SINCÉRITÉ & RESPECT (LES DRAPEAUX VERTS)
    // -------------------------------------------------------------------------
    {
        id: "sincerite_radicale",
        triggers: ["je respecte", "ton choix", "pas de pression", "ma responsabilité", "j'ai eu tort", "ton rythme", "je t'écoute", "je comprends ton besoin"],
        analysis: "Sincérité Détectée. Il ne cherche pas à se justifier, ni à te blâmer. Il accepte tes limites.",
        response: [
            "C'est un 'Drapeau Vert'. Il utilise le mot 'Respect' et l'applique. Il ne met pas de pression.",
            "Il prend la responsabilité de ses actes ('J'ai eu tort') sans ajouter de 'Mais toi aussi'. C'est rare.",
            "Il valide tes émotions sans essayer de les changer. C'est le signe d'une communication saine."
        ],
        counter_attack: "Merci de respecter mes limites. J'apprécie ton honnêteté. On en reste là pour le moment."
    },

    // -------------------------------------------------------------------------
    // 🔴 ZONE ROUGE : SÉCURITÉ & VIOLENCE (Priorité Absolue)
    // -------------------------------------------------------------------------
    {
        id: "violence_physique",
        triggers: ["frappe", "cogne", "bat", "coup", "sang", "bouscul", "étrangl", "tuer", "arme", "couteau", "peur de mourir"],
        analysis: "Ceci n'est plus de la psychologie, c'est de la survie. La ligne rouge est franchie.",
        response: [
            "🛑 **STOP.** Écoute-moi attentivement. Ce n'est pas de l'amour, c'est un crime. Personne n'a le droit de te toucher.",
            "Tu es en danger. La violence physique ne s'arrête jamais, elle ne fait qu'escalader. L'autre ne changera pas.",
            "Ta seule mission ce soir n'est pas de comprendre, mais de **survivre**. Protège-toi. Protège tes enfants si tu en as. Appelle les secours si nécessaire.",
            "Ne dis rien. Ne menace pas de partir (c'est le moment le plus dangereux). Prépare ta sortie en silence."
        ]
    },

    // -------------------------------------------------------------------------
    // 🎭 LE MASQUE : LOVE BOMBING & CYCLE (Chaud / Froid)
    // -------------------------------------------------------------------------
    {
        id: "cycle_abus",
        triggers: ["cadeau excessif", "fleurs après dispute", "soudain gentil", "pardon excessif", "lune de miel", "changeant", "bipolaire", "double visage"],
        analysis: "Le cycle classique : Tension -> Explosion -> Lune de Miel. Les cadeaux sont le prix du silence.",
        response: [
            "C'est la phase de 'Lune de Miel'. On t'offre des cadeaux ou de l'affection pour acheter ton oubli après t'avoir fait du mal.",
            "Ne te laisse pas aveugler. L'autre n'est pas désolé de t'avoir fait mal, mais désolé que tu puisses partir.",
            "Ce n'est pas de la gentillesse, c'est de la manipulation. On remplit ton réservoir affectif juste assez pour pouvoir le vider à nouveau.",
            "Regarde le geste : est-ce un cadeau pour toi, ou un bâillon pour te faire taire ?"
        ]
    },
    {
        id: "nostalgie_debut",
        triggers: ["comme au début", "c'était mieux avant", "rencontre magique", "prince charmant", "princesse", "âme soeur", "magique"],
        analysis: "L'utilisation du souvenir du début pour faire accepter l'enfer du présent.",
        response: [
            "La personne du début n'existait pas. C'était un costume sur mesure pour te séduire. La personne que tu vois aujourd'hui est la vraie.",
            "Tu es amoureux/se d'un fantôme. Tu attends le retour de l'illusion, mais elle ne reviendra pas car elle n'a jamais été réelle.",
            "Le 'Love Bombing' du début servait à te rendre accro. Maintenant que tu es accro, on te traite comme un objet."
        ]
    },

    // -------------------------------------------------------------------------
    // 🎣 LE HOOVERING (L'ASPIRATEUR)
    // -------------------------------------------------------------------------
    {
        id: "hoovering",
        triggers: ["je t'aime", "tu me manques", "pense à toi", "recommencer", "chance", "changé", "désolé", "pardon", "projets", "avenir"],
        analysis: "Le Hoovering (L'Aspirateur). Il essaie de te réaspirer dans la relation après une distance.",
        response: [
            "Il te dit 'Je t'aime' maintenant ? C'est curieux, il ne t'aimait pas quand tu pleurais. C'est une technique de récupération.",
            "Attention. Il sent que tu t'éloignes, alors il sort le grand jeu. Ce n'est pas de l'amour, c'est de la panique de perdre sa chose.",
            "Les promesses de changement sont le chant des sirènes. Si tu y retournes, la lune de miel durera 3 jours, et l'enfer recommencera."
        ],
        counter_attack: "Tu as l'air tellement désespéré... Ça me fait de la peine de te voir t'abaisser comme ça. Garde un peu de dignité, s'il te plaît. C'est gênant à regarder."
    },

    // -------------------------------------------------------------------------
    // 🧠 LE CERVEAU : GASLIGHTING & FOLIE
    // -------------------------------------------------------------------------
    {
        id: "gaslighting",
        triggers: ["folle", "fou", "inventes", "parano", "imagine", "hystérique", "sensible", "mémoire", "jamais dit"],
        analysis: "Gaslighting : Remplacer ta réalité par la sienne pour te contrôler.",
        response: [
            "On te traite de fou/folle pour que tu ne croies plus en tes propres yeux. C'est une technique de lavage de cerveau.",
            "Tu n'es pas fou. Tu es lucide. Et ta lucidité terrifie l'autre, alors il/elle essaie de la briser.",
            "Note tout. Écris ce qui est dit. Quand on a une trace écrite, le manipulateur ne peut plus dire 'je n'ai jamais dit ça'.",
            "Plus tu doutes de toi, plus l'autre a le pouvoir. Fais confiance à ton instinct. Si tu sens que c'est faux, c'est que c'est faux."
        ]
    },

    // -------------------------------------------------------------------------
    // 👶 LES ENFANTS & LA CULPABILITÉ
    // -------------------------------------------------------------------------
    {
        id: "enfants",
        triggers: ["enfant", "bébé", "fils", "fille", "gosses", "mauvaise mère", "mauvais père", "garde", "enlever"],
        analysis: "Utiliser ce que tu as de plus cher comme levier de chantage.",
        response: [
            "On utilise tes enfants comme point faible. C'est la signature d'une lâcheté absolue.",
            "On te dit que tu es un mauvais parent ? Faux. Un mauvais parent ne chercherait pas d'aide comme tu le fais là.",
            "Tu restes 'pour les enfants' ? Regarde-les. Ils apprennent l'amour en vous regardant. Veux-tu qu'ils pensent que l'amour = souffrance ?",
            "La meilleure façon de protéger tes enfants n'est pas de subir, mais de leur montrer qu'on ne laisse personne nous détruire."
        ]
    },

    // -------------------------------------------------------------------------
    // 💰 L'ARGENT & LE CONTRÔLE
    // -------------------------------------------------------------------------
    // -------------------------------------------------------------------------
    // 😢 LA VICTIMISATION (CALIMERO)
    // -------------------------------------------------------------------------
    {
        id: "victimisation",
        triggers: ["habitué", "mis de côté", "honte de moi", "je suis seul", "personne ne m'aime", "trop bon", "sacrifié", "incompris", "méchant avec moi", "souffert"],
        analysis: "La Victimisation (Le Calimero). Il se peint en martyr pour te faire culpabiliser. C'est une inversion : le bourreau devient la victime.",
        response: [
            "Il joue sur ta pitié. Si tu as pitié, tu ne peux pas être en colère. C'est un bouclier émotionnel.",
            "Regarde bien : il parle uniquement de SA souffrance, jamais de la tienne. C'est de l'égocentrisme déguisé en tristesse.",
            "Il veut que tu le consoles de t'avoir fait du mal. Ne tombe pas dans le panneau."
        ],
        counter_attack: "Tu as raison, tu as l'air de beaucoup souffrir. Je pense que tu as besoin d'un professionnel pour gérer cette dépression. Je ne suis pas psy, je ne peux pas t'aider."
    },
    {
        id: "controleur_coercitif",
        triggers: ["fouille téléphone", "bombarde messages", "où tu es", "pourquoi tu réponds pas", "surveille", "géoloc", "habille comme ça", "maquillage"],
        analysis: "Le Contrôleur. L'anxiété transformée en dictature.",
        response: [
            "On ne te surveille pas par amour, mais par insécurité maladive. On veut te posséder comme un objet.",
            "Chaque concession que tu fais resserre les barreaux de ta prison.",
            "La liberté ne se négocie pas. Personne n'a de droit de regard sur ton corps, ton temps ou tes pensées. Reprends ton territoire."
        ],
        counter_attack: "Je ne suis pas ta propriété. Je réponds quand je veux et je vais où je veux. Si tu n'as pas confiance, c'est ton problème à régler avec toi-même, pas avec moi."
    },
    {
        id: "finance",
        triggers: ["mes sous", "mon argent", "tu me dois", "profiteuse", "profiteur", "rien à toi", "je te paye"],
        analysis: "Violence économique. Utiliser l'argent pour créer une dette morale ou une dépendance.",
        response: [
            "L'argent est un moyen de te garder en laisse. On veut que tu aies besoin de l'autre pour vivre, pour t'empêcher de partir.",
            "On te traite de profiteur/se alors qu'on te vole ton énergie vitale. L'argent se gagne, mais le temps qu'on te vole est perdu à jamais.",
            "Sécurise tes arrières. L'indépendance financière est ta clé de sortie."
        ],
        counter_attack: "L'argent ne t'achète pas le droit de me manquer de respect. Garde tes sous, je garde ma liberté."
    },
    // -------------------------------------------------------------------------
    // 🏝️ ISOLEMENT & JALOUSIE
    // -------------------------------------------------------------------------
    {
        id: "isolement",
        triggers: ["amis", "famille", "mère", "soeur", "frère", "potes", "sortir", "interdit", "jaloux", "jalouse", "trompe"],
        analysis: "Faire le vide autour de toi pour être ta seule source d'information.",
        response: [
            "On critique ta famille et tes amis pour t'isoler. Un prédateur éloigne toujours sa proie du troupeau avant d'attaquer.",
            "Cette jalousie n'est pas de l'amour, c'est de la possession. On ne veut pas que tu sois heureux/se ailleurs.",
            "Reprends contact avec tes proches. Même juste un message. Brise le huis clos."
        ]
    },

    // -------------------------------------------------------------------------
    // 💔 LA RUPTURE & LE DISCARD
    // -------------------------------------------------------------------------
    {
        id: "menace_rupture",
        triggers: ["quitter", "partir", "divorce", "foutre dehors", "valise", "dégage"],
        analysis: "La menace de l'abandon. Créer l'insécurité pour te forcer à te battre.",
        response: [
            "On menace de partir ? Ouvre la porte. C'est souvent du bluff pour te faire supplier.",
            "L'autre veut que tu supplies de rester. Ne donne pas ce plaisir. Dis simplement 'D'accord'. Tu verras le visage changer.",
            "Tu as peur de l'abandon, mais en réalité, on t'a abandonné émotionnellement il y a longtemps."
        ]
    },
    {
        id: "je_veux_partir",
        triggers: ["je veux partir", "je ne peux plus", "bout", "fatigué", "épuisé", "partir"],
        analysis: "Le réveil. Réaliser que la survie nécessite le départ.",
        response: [
            "Cette fatigue que tu ressens, c'est ton âme qui n'en peut plus de porter le vide de l'autre.",
            "Partir n'est pas un échec, c'est une évasion. Tu ne quittes pas une histoire d'amour, tu t'échappes d'une zone de guerre.",
            "Prépare-toi. Fais-le en silence. Le moment où tu pars est le plus dangereux, mais c'est le début de ta renaissance."
        ]
    },

    // -------------------------------------------------------------------------
    // 🐍 LES PATHOLOGIES (LE ZOO HUMAIN)
    // -------------------------------------------------------------------------
    {
        id: "pervers_narcissique",
        triggers: ["pn", "pervers", "narcissique", "ego", "dieu", "meilleur", "admire", "centre", "miroir"],
        analysis: "Le Narcissique Pathologique. Il/Elle ne t'aime pas, il/elle aime son propre reflet dans tes yeux.",
        response: [
            "C'est un puits sans fond. Tu peux y jeter tout ton amour, ça ne sera jamais assez. Il n'y a pas de 'Soi', juste un vide à nourrir.",
            "Factuellement : Ce cerveau est câblé pour la prédation. Le problème n'est pas ce que tu fais, le problème est ce que tu es (une source).",
            "On alterne entre te mettre sur un piédestal et te jeter dans la boue. C'est une bascule. Descends de la bascule."
        ]
    },
    {
        id: "machiavelique_calculateur",
        triggers: ["calcul", "froid", "stratège", "plan", "coup d'avance", "échecs", "pion", "utilise"],
        analysis: "Le Machiavélique. Pour cette personne, les humains sont des outils.",
        response: [
            "Pas d'empathie, juste de la simulation. C'est un acteur. Regarde les actes, pas les paroles. Les actes servent toujours SON intérêt.",
            "On te garde sous la main 'au cas où'. Tu es une ressource. C'est humiliant, mais c'est la vérité crue.",
            "La seule façon de gagner contre un manipulateur froid est de devenir illisible. Ne montre plus tes émotions. Sois une pierre grise."
        ]
    },
    {
        id: "vampire_emotionnel",
        triggers: ["fatigue", "épuise", "vide", "pompe", "énergie", "plainte", "victime", "malheur"],
        analysis: "Le Vampire Émotionnel. Se nourrir de ta pitié.",
        response: [
            "Il y a toujours un problème, et tu es toujours la solution. C'est un piège. On te transforme en soignant pour ne pas avoir à grandir.",
            "On utilise la fragilité comme une arme. 'Si tu pars, je meurs'. C'est de la prise d'otage émotionnelle.",
            "Tu veux sauver l'autre ? Tu ne peux pas. On ne sauve pas quelqu'un qui refuse de nager."
        ]
    },

    // -------------------------------------------------------------------------
    // 💀 BLACK OPS : TACTIQUES AVANCÉES
    // -------------------------------------------------------------------------
    {
        id: "darvo",
        triggers: ["c'est ma faute", "retourne", "victime", "coupable", "accusé", "inversé", "toi qui a commencé"],
        analysis: "DARVO : Deny, Attack, Reverse Victim and Offender.",
        response: [
            "Tu te plains d'un truc, et soudain c'est toi qui t'excuses ? C'est le DARVO. On nie, on t'attaque, et on inverse les rôles.",
            "Le bourreau joue la victime. Ne tombe pas dans le panneau. Garde le cap sur le fait initial.",
            "C'est un écran de fumée. Ne te défends pas, reviens au sujet de base."
        ]
    },
    {
        id: "triangulation",
        triggers: ["ex", "autre femme", "autre homme", "collègue", "comparé", "mieux que toi", "concurrence"],
        analysis: "La Triangulation. Introduire un tiers pour créer de la rivalité.",
        response: [
            "On te compare à quelqu'un d'autre pour te faire sentir 'remplaçable'. C'est pour que tu te battes pour de l'attention.",
            "Cette tierce personne est un outil. Si tu montres de la jalousie, le manipulateur gagne. Montre de l'indifférence.",
            "On fabrique de la concurrence pour augmenter sa valeur artificielle. Personne ne devrait avoir à se battre pour être respecté."
        ]
    },
    {
        id: "salade_de_mots",
        triggers: ["comprends rien", "tourne en rond", "mal à la tête", "logique", "sens", "brouillard", "discussion interminable"],
        analysis: "La Salade de Mots. Il parle pour ne rien dire, pour t'épuiser et te confondre.",
        response: [
            "Tu as mal à la tête après lui avoir parlé ? C'est fait exprès. Il utilise des arguments circulaires pour noyer le poisson.",
            "Il ne cherche pas à résoudre le conflit, il cherche à gagner par épuisement. Quand ça n'a plus de sens, arrête la conversation.",
            "N'essaie pas de trouver de la logique là où il n'y en a pas. C'est du bruit pour t'empêcher de penser. Coupe le son."
        ],
        counter_attack: "Je m'inquiète pour toi. Tu as l'air incohérent et tu te répètes. Tu as des problèmes de mémoire en ce moment ? Tu devrais peut-être consulter un neurologue, ça m'a l'air sérieux."
    },
    {
        id: "future_faking",
        triggers: ["promis", "bientôt", "un jour", "projet", "mariage", "maison", "voyage", "changera"],
        analysis: "Le Future Faking. Il te vend un futur de rêve pour te faire accepter un présent de merde.",
        response: [
            "Il te promet la lune 'bientôt' pour que tu acceptes les miettes 'maintenant'. Le futur n'existe pas. Seul le présent compte.",
            "Ça fait combien de temps qu'il promet de changer ? Les promesses sans actes sont des mensonges confortables.",
            "Il agite la carotte (mariage, bébé, maison) pour faire avancer l'âne. Arrête d'avancer. Demande des actes aujourd'hui."
        ],
        counter_attack: "C'est triste. Tu as besoin de t'inventer une vie imaginaire pour supporter ta réalité ? Je te plains, vraiment. Ça doit être dur d'être dans ta tête."
    },
    {
        id: "silence_punitif",
        triggers: ["répond pas", "silence", "ignorer", "boude", "fantôme", "bloqué", "vu", "lu"],
        analysis: "Le Traitement Silencieux. La forme la plus violente de punition passive-agressive.",
        response: [
            "Il te punit par le silence pour que tu te sentes inexistante. Il veut que tu supplies pour son attention.",
            "Le silence est une violence. Il te refuse l'oxygène émotionnel. N'essaie pas de le briser. Profite du silence pour respirer.",
            "Il attend que tu craques et que tu t'excuses (alors que tu n'as rien fait). Ne lui envoie rien. Fais le mort. C'est ce qui le terrifie le plus."
        ],
        counter_attack: "J'ai vu que tu boudais. C'est adorable, on dirait mon neveu de 4 ans quand il n'a pas son bonbon. Prends ton temps pour grandir, je suis patient(e)."
    },

    // -------------------------------------------------------------------------
    // ❤️‍🩹 L'ÂME HUMAINE (LA BLESSURE ORIGINELLE)
    // -------------------------------------------------------------------------
    {
        id: "lien_traumatique",
        triggers: ["je l'aime encore", "peux pas le quitter", "peux pas la quitter", "drogue", "manque", "obsédé", "besoin", "aimant"],
        analysis: "Le Lien Traumatique (Trauma Bond). Addiction chimique.",
        response: [
            "Tu n'es pas faible, tu es en sevrage. Ton cerveau est accro aux montées d'adrénaline. C'est biologique.",
            "C'est le Syndrome de Stockholm. Ton cerveau cherche la sécurité auprès de la source du danger.",
            "Ce 'manque' terrible est la preuve du conditionnement. La douleur est le signe que tu guéris."
        ]
    },
    {
        id: "honte_toxique",
        triggers: ["honte de moi", "je me sens sale", "je suis nul", "je suis nulle", "c'est ma faute", "dégoût de moi", "indigne", "je suis une merde", "je ne vaux rien"],
        analysis: "La Honte Toxique. La haine de soi de l'autre projetée sur toi.",
        response: [
            "Cette honte ne t'appartient pas. C'est un colis qu'on a déposé chez toi. Rends le colis.",
            "Tu te sens sali(e) ? C'est le contact avec la toxicité. Mais ton âme est propre. Le diamant ne se salit pas dans la boue.",
            "On t'a fait croire que tu ne valais rien pour que tu ne réalises jamais ta vraie valeur."
        ]
    },
    {
        id: "perte_identite",
        triggers: ["sais plus qui je suis", "je suis perdu", "je suis perdue", "vide intérieur", "plus de goût", "zombie", "robot", "éteint"],
        analysis: "L'Effacement de Soi. Éteindre sa lumière pour survivre.",
        response: [
            "Tu n'es pas mort(e), tu es en hibernation. Tu as mis ta personnalité en mode 'avion' pour survivre à la guerre.",
            "Tu ne sais plus qui tu es ? C'est une page blanche. Tu peux réécrire l'histoire.",
            "On a volé ta joie, mais pas ton noyau. Cherche bien, il est encore là."
        ]
    },
    {
        id: "espoir_toxique",
        triggers: ["va changer", "espoir", "pardonner", "compris", "promis", "dernière chance", "sauver"],
        analysis: "L'Espoir Toxique. L'ennemi de la libération.",
        response: [
            "L'espoir est ce qui te tue à petit feu. Tu espères le retour de la personne du début. Mais elle n'a jamais existé.",
            "Accepter que l'autre ne changera JAMAIS est douloureux, mais c'est la seule voie de sortie.",
            "Tu veux sauver l'autre ? En essayant de sauver quelqu'un de la noyade, tu te noies avec. Lâche la main."
        ]
    },

    // -------------------------------------------------------------------------
    // 🌗 L'ABÎME & LA LUMIÈRE (LA DUALITÉ)
    // -------------------------------------------------------------------------
    {
        id: "desespoir_total",
        triggers: ["envie de mourir", "finir", "plus de force", "noir total", "abîme", "gouffre", "néant"],
        analysis: "La Nuit Noire de l'Âme. L'effondrement avant la vérité.",
        response: [
            "Tu es dans le noir complet ? C'est bien. C'est dans le noir que les graines germent. Tu n'es pas enterré(e), tu es planté(e).",
            "Ce désespoir n'est pas une fin, c'est une mue. L'ancien toi doit mourir pour que le nouveau puisse naître.",
            "La lumière n'existe pas sans l'ombre. Tu as traversé l'enfer, tu es ignifugé(e)."
        ]
    },
    {
        id: "ombre_interieure",
        triggers: ["je suis méchant", "je suis méchante", "haine", "vengeance", "colère noire", "tuer", "monstre", "démon"],
        analysis: "L'Acceptation de l'Ombre. Ta colère est saine.",
        response: [
            "Tu as peur de ta propre rage ? Ne la fuis pas. Ta colère est la partie de toi qui t'aime assez pour dire 'NON'.",
            "On t'a appris à être 'gentil(le)'. Mais face à un loup, la gentillesse est un suicide. Réveille la bête en toi.",
            "Tu n'es pas un monstre parce que tu as des pensées sombres. Tu es humain(e). Intègre ton ombre."
        ]
    },
    {
        id: "lumiere_aveuglante",
        triggers: ["tout va bien", "positif", "lumière", "amour inconditionnel", "pardonner à tout prix", "spirituel", "dieu"],
        analysis: "Le Contournement Spirituel. Nier la douleur.",
        response: [
            "Ne te force pas à pardonner si tu saignes encore. Le pardon prématuré est un déni.",
            "La vraie lumière ne nie pas l'obscurité, elle l'éclaire. Regarde le mal en face.",
            "Tu veux être un ange ? Rappelle-toi que les anges ont des épées. La bonté sans force n'est que de la naïveté."
        ]
    },
    {
        id: "folie_humaine",
        triggers: ["pourquoi", "monde fou", "humain", "nature humaine", "cruauté", "sens de la vie"],
        analysis: "La Complexité Humaine. Le mal existe.",
        response: [
            "Tu cherches une raison logique. Il n'y en a pas. Certains humains sont des trous noirs. Ils détruisent car ils ne savent pas créer.",
            "L'être humain est capable du pire comme du meilleur. Tu as vu le pire. À toi de devenir le meilleur pour rétablir l'équilibre.",
            "Ne laisse pas cette noirceur éteindre ta lumière. Brille plus fort, par défi."
        ]
    },

    // -------------------------------------------------------------------------
    // 🧠 PSYCHOLOGIE AVANCÉE (LES MÉCANISMES INVISIBLES)
    // -------------------------------------------------------------------------
    {
        id: "dissonance_cognitive",
        triggers: ["je l'aime mais", "pourtant il est gentil", "deux personnes", "pas logique", "contradictoire", "je ne comprends pas"],
        analysis: "Dissonance Cognitive. Ton cerveau tente de réconcilier deux réalités opposées : 'Il m'aime' et 'Il me fait mal'. C'est ce qui crée ta confusion.",
        response: [
            "Tu essaies de faire cohabiter le Dr Jekyll et Mr Hyde. Mais c'est la même personne. La gentillesse n'est pas une excuse, c'est un masque.",
            "Ce n'est pas de l'amour, c'est du traumatisme. Ton cerveau est en surchauffe car il cherche une logique là où il n'y en a pas.",
            "Arrête de regarder le potentiel (ce qu'il pourrait être). Regarde la réalité (ce qu'il est)."
        ],
        counter_attack: "Je ne peux plus ignorer la réalité de tes actes au profit de tes paroles. Les faits sont là."
    },
    {
        id: "abus_reactif",
        triggers: ["j'ai crié", "j'ai insulté", "devenu fou", "devenue folle", "pété les plombs", "c'est moi le monstre", "poussé à bout"],
        analysis: "L'Abus Réactif. Le manipulateur te pousse à bout pour que TU exploses, puis il te blâme pour ta réaction.",
        response: [
            "Tu n'es pas fou/folle. Tu as réagi à une situation anormale. Si on pique un chien 100 fois et qu'il mord à la 101ème, le chien n'est pas méchant, il est harcelé.",
            "Il a appuyé sur tous tes boutons pour te faire sortir de tes gonds. Et maintenant, il pointe ton explosion du doigt en disant 'Regarde, c'est toi le problème'.",
            "Ne t'excuse pas d'avoir craqué. C'était le but."
        ],
        counter_attack: "Ma réaction est la conséquence directe de ton manque de respect. Ne confonds pas ma défense avec de l'agression."
    },
    {
        id: "jade",
        triggers: ["expliquer", "justifier", "défendre", "comprends pas", "convaincre", "preuve", "débat"],
        analysis: "Le piège J.A.D.E (Justifier, Argumenter, Défendre, Expliquer). Tu essaies de te justifier devant quelqu'un qui a décidé de ne pas comprendre.",
        response: [
            "Arrête de te justifier. On ne se justifie pas devant un tribunal truqué. Quoi que tu dises, ce sera retenu contre toi.",
            "Tu penses que si tu trouves les bons mots, il comprendra ? Non. Il comprend très bien, il s'en fiche.",
            "Économise ton souffle. Ton explication nourrit son jeu."
        ],
        counter_attack: "Je n'ai pas à me justifier. C'est ma décision et elle n'est pas ouverte au débat."
    },
    {
        id: "fog",
        triggers: ["peur", "obligation", "culpabilité", "dois", "devrais", "mauvaise personne", "égoïste"],
        analysis: "F.O.G (Fear, Obligation, Guilt). Les trois leviers de la manipulation émotionnelle.",
        response: [
            "Il utilise la Peur (de le perdre), l'Obligation (devoir conjugal/familial) et la Culpabilité (tu es méchant(e)) pour te contrôler.",
            "Si tu fais quelque chose par culpabilité, ce n'est pas un choix libre. C'est de la coercition.",
            "Tu n'es pas égoïste de penser à toi. Tu es survivan(e)."
        ],
        counter_attack: "Je ne fonctionnerai plus à la culpabilité. Tes tentatives de me faire sentir mal ne marchent plus."
    },

    // -------------------------------------------------------------------------
    // 🕸️ TACTIQUES SOCIALES & DIGITALES
    // -------------------------------------------------------------------------
    {
        id: "singes_volants",
        triggers: ["ses amis", "sa mère", "son pote", "tout le monde dit", "on m'a dit", "réputation", "alliés", "groupe"],
        analysis: "Les Singes Volants (Flying Monkeys). Il envoie d'autres personnes t'attaquer ou t'espionner pour lui.",
        response: [
            "Ces gens ne sont pas tes amis, ce sont ses soldats. Il les a manipulés pour qu'ils fassent le sale boulot à sa place.",
            "Ne te défends pas auprès d'eux. Tout ce que tu diras sera rapporté et déformé.",
            "Coupe les ponts avec les complices. Si ils croient ses mensonges sans t'écouter, ils ne méritent pas ta vérité."
        ],
        counter_attack: "Si tu as quelque chose à me dire, dis-le moi en face. N'envoie pas tes messagers."
    },
    {
        id: "miettes",
        triggers: ["juste un sms", "like", "vu ma story", "un mot", "bref", "rare", "parfois", "disparait"],
        analysis: "Breadcrumbing (Les Miettes). Il te donne juste assez d'attention pour te garder en appétit, mais jamais assez pour te nourrir.",
        response: [
            "Tu meurs de faim et il te jette des miettes. Ce n'est pas un repas. Tu mérites un banquet.",
            "Un like sur Instagram n'est pas une preuve d'amour. C'est une micro-agression déguisée en intérêt.",
            "Il vérifie juste si tu es toujours accrochée à l'hameçon. Ne mords pas."
        ],
        counter_attack: "" // No response is the best response to breadcrumbs
    },
    {
        id: "negging",
        triggers: ["blague", "humour", "susceptible", "pour ton âge", "pas comme les autres", "kilos", "sensible", "compliment bizarre"],
        analysis: "Le Negging. Un compliment empoisonné destiné à baisser ton estime de soi pour que tu cherches son approbation.",
        response: [
            " 'C'est bien pour une fille' ? 'Tu es jolie quand tu te tais' ? Ce ne sont pas des blagues, ce sont des insultes.",
            "Il te rabaisse subtilement pour que tu te sentes insécure. Si tu te sens nulle, tu ne le quitteras pas.",
            "Ne ris pas. Regarde-le froidement et demande : 'Pourquoi tu dis ça ?'."
        ],
        counter_attack: "Je ne trouve pas ça drôle. Explique-moi la blague ?"
    },
    {
        id: "renforcement_intermittent",
        triggers: ["parfois gentil", "imprévisible", "loterie", "casino", "jamais pareil", "montagnes russes", "espoir"],
        analysis: "Le Renforcement Intermittent. Le mécanisme le plus addictif qui existe (comme au Casino).",
        response: [
            "Si la machine à sous donnait tout le temps, on s'ennuierait. Si elle ne donnait jamais, on partirait. Elle donne 'parfois', et c'est ça qui rend accro.",
            "Il est gentil de temps en temps pour réinitialiser ton seuil de tolérance à la douleur.",
            "La gentillesse aléatoire est une technique de dressage. Tu es conditionné(e) à attendre la récompense."
        ],
        counter_attack: "Je ne joue plus. J'ai besoin de constance, pas de surprises."
    },
    {
        id: "predatrice_femme",
        triggers: ["elle pleure", "elle crie", "elle dit que je suis méchant", "elle me prive", "elle monte les enfants", "elle raconte", "rumeur", "fausse victime"],
        analysis: "L'Archétype de la Sirène / Veuve Noire. La manipulation féminine toxique est souvent invisible, sociale et émotionnelle.",
        response: [
            "Elle utilise ses larmes comme une arme. Quand tu essaies de parler d'un problème, elle pleure pour que tu finisses par la consoler au lieu de régler le souci.",
            "La destruction de réputation : Elle ne te frappe pas avec ses poings, mais avec ses mots aux autres. Elle t'isole en te faisant passer pour le monstre.",
            "Elle utilise le sexe ou l'affection comme une monnaie d'échange. 'Si tu n'es pas gentil, tu n'as rien'. C'est du dressage, pas de l'amour."
        ]
    },
    {
        id: "predateur_homme",
        triggers: ["il crie", "il frappe", "il décide", "il m'écrase", "il commande", "il impose", "peur de lui", "autorité"],
        analysis: "L'Archétype du Tyran / Barbe Bleue. La manipulation masculine toxique est souvent basée sur la domination, la peur et le territoire.",
        response: [
            "Il utilise la colère pour te faire taire. Il n'a pas besoin de te frapper pour que tu aies peur. Son ton de voix suffit à te paralyser.",
            "Il colonise ton espace mental. Il veut que tu penses comme lui, que tu votes comme lui, que tu sois une extension de lui. Il ne veut pas une partenaire, il veut une disciple.",
            "La logique froide : Il utilise des arguments 'rationnels' pour invalider tes émotions. 'Tu es trop sensible' est sa façon de dire 'Tu es trop humaine'."
        ]
    },

    // -------------------------------------------------------------------------
    // 🦌 LA PROIE & LE CHASSEUR (L'INSTINCT PRIMAL)
    // -------------------------------------------------------------------------
    {
        id: "instinct_proie",
        triggers: ["je le sens", "bizarre", "malaise", "ventre", "intuition", "peur sans raison", "poils qui se hérissent"],
        analysis: "L'Instinct de la Gazelle. Ton corps sait avant ton cerveau.",
        response: [
            "Tu as un mauvais pressentiment ? Écoute-le. C'est ton cerveau reptilien qui a détecté un prédateur. Il ne se trompe jamais.",
            "La société t'a appris à être poli(e). La nature t'a appris à courir. Si tu sens un danger, ne sois pas poli(e), cours.",
            "Le malaise que tu ressens en sa présence n'est pas de la timidité, c'est un signal d'alarme biologique. Ton corps te hurle : DANGER."
        ]
    },
    {
        id: "gibier_consentant",
        triggers: ["trop gentil", "trop gentille", "sauveur", "infirmière", "donne tout", "naïf", "naïve"],
        analysis: "Le Syndrome du Gibier Consentant. Le prédateur ne choisit pas au hasard.",
        response: [
            "Un prédateur ne chasse pas n'importe qui. Il cherche quelqu'un de trop empathique, prêt à se sacrifier. Ta bonté est l'odeur du sang pour lui.",
            "Tu veux voir le bon en lui ? Le scorpion n'a pas de bon en lui, il a du venin. C'est sa nature. Cesser de projeter ta lumière sur son ombre.",
            "Pour arrêter d'être une proie, tu dois arrêter d'agir comme une proie. Arrête de t'excuser d'exister. Montre les dents."
        ]
    },

    // -------------------------------------------------------------------------
    // 🛡️ DÉFAUT / GÉNÉRAL
    // -------------------------------------------------------------------------
    {
        id: "general",
        triggers: [],
        analysis: "Analyse en cours...",
        response: [
            "Je t'écoute. Ce que tu vis est une épreuve de force. Continue, vide ton sac.",
            "On essaie de te faire porter le poids d'échecs qui ne sont pas les tiens. Ne les accepte pas.",
            "Tu es plus fort(e) que tu ne le crois. Le fait que tu sois encore debout le prouve."
        ]
    }
];
