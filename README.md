# Développement embryonnaire - L3 Génétique

Site web éducatif pour le cours de développement embryonnaire destiné aux étudiants de L3 en génétique.

## 🧬 Contenu du cours

### Chapitres disponibles

1. **Embryogenèse comparée** - Étude comparative du développement précoce chez trois modèles biologiques
2. **Morphogènes maternels** - Contrôle génétique par les gradients de morphogènes
3. **Gènes de segmentation zygotiques** - Cascade génétique de la segmentation

### Fonctionnalités

- **Navigation fluide** entre les chapitres avec ancres
- **Cours en direct** avec support WebRTC pour la visioconférence
- **Quiz interactif** avec 8 questions sur l'embryologie
- **Design responsive** adapté aux mobiles et tablettes
- **Animations CSS** pour une expérience utilisateur moderne

## 🚀 Installation et utilisation

### Prérequis

- Navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Serveur web local (optionnel, pour éviter les restrictions CORS)

### Lancement rapide

1. **Clonez ou téléchargez** les fichiers du projet
2. **Ouvrez** `index.html` dans votre navigateur
3. **Ou servez** le site via un serveur local :

```bash
# Avec Python
python3 -m http.server 8000

# Avec Node.js
npx serve .

# Avec PHP
php -S localhost:8000
```

4. **Accédez** au site sur `http://localhost:8000`

## 📁 Structure du projet

```
.
├── index.html              # Page principale
├── css/
│   └── style.css          # Styles CSS modernes
├── js/
│   ├── main.js            # JavaScript principal
│   ├── webrtc.js          # Module de visioconférence
│   └── quiz.js            # Module de quiz interactif
├── assets/
│   ├── img/
│   │   ├── amphibiens.jpg     # Image des amphibiens
│   │   ├── echinodermes.jpg   # Image des échinodermes
│   │   ├── arthropodes.jpg    # Image des arthropodes
│   │   └── morphogene.svg     # Diagramme des morphogènes
│   └── videos/
│       └── segmentation.mp4   # Vidéo de segmentation
└── README.md              # Ce fichier
```

## 🎯 Fonctionnalités détaillées

### Navigation

- **Scroll fluide** entre les sections
- **Navigation clavier** avec les flèches haut/bas
- **Indicateur de progression** visuel
- **Menu sticky** qui reste visible en haut

### Cours en direct

- **WebRTC natif** pour la vidéo en temps réel
- **Gestion des permissions** caméra/microphone
- **Interface intuitive** avec boutons start/stop
- **Indicateurs de connexion** en temps réel

### Quiz interactif

- **8 questions** sur l'embryologie
- **Progression en temps réel** avec barre de progression
- **Correction détaillée** avec explications
- **Système de notation** avec commentaires personnalisés
- **Possibilité de recommencer** le quiz

### Design

- **Thème moderne** avec dégradés et glassmorphism
- **Animations fluides** et transitions
- **Responsive design** pour tous les écrans
- **Accessibilité** avec support clavier et contrastes

## 🔧 Personnalisation

### Modifier le contenu

1. **Textes** : Éditez directement dans `index.html`
2. **Styles** : Modifiez `css/style.css`
3. **Questions du quiz** : Éditez le tableau `questions` dans `js/quiz.js`

### Ajouter des médias

1. **Images** : Placez vos fichiers dans `assets/img/`
2. **Vidéos** : Placez vos fichiers dans `assets/videos/`
3. **Mettez à jour** les références dans `index.html`

### Couleurs du thème

Les couleurs principales sont définies dans `css/style.css` :
- **Primaire** : `#667eea` (bleu)
- **Secondaire** : `#764ba2` (violet)
- **Succès** : `#2ecc71` (vert)
- **Erreur** : `#e74c3c` (rouge)

## 🎓 Utilisation pédagogique

### Pour les enseignants

- **Cours magistraux** avec support visuel moderne
- **Évaluation continue** via le quiz intégré
- **Interaction directe** avec les étudiants via WebRTC
- **Suivi des progrès** avec les résultats détaillés

### Pour les étudiants

- **Apprentissage autonome** avec navigation libre
- **Auto-évaluation** via le quiz interactif
- **Révisions ciblées** grâce aux explications détaillées
- **Accès mobile** pour étudier partout

## 🔒 Sécurité et vie privée

- **Aucune donnée** n'est envoyée vers des serveurs externes
- **WebRTC local** sans serveur de signalisation
- **Stockage local** des résultats de quiz
- **Respect RGPD** par conception

## 🐛 Résolution de problèmes

### La caméra ne fonctionne pas

1. **Vérifiez les permissions** du navigateur
2. **Utilisez HTTPS** ou localhost
3. **Testez avec un autre navigateur**

### Les images ne s'affichent pas

1. **Vérifiez les chemins** des fichiers
2. **Utilisez un serveur local** pour éviter les restrictions
3. **Consultez la console** pour les erreurs

### Le quiz ne fonctionne pas

1. **Activez JavaScript** dans votre navigateur
2. **Rechargez la page** complètement
3. **Vérifiez la console** pour les erreurs

## 📱 Compatibilité

### Navigateurs supportés

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

### Appareils

- ✅ Desktop (Windows, macOS, Linux)
- ✅ Tablettes (iPad, Android)
- ✅ Smartphones (iOS, Android)

## 🤝 Contribution

Pour contribuer au projet :

1. **Fork** le repository
2. **Créez** une branche pour votre fonctionnalité
3. **Testez** vos modifications
4. **Soumettez** une pull request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Auteurs

- **Université XYZ** - Département de Biologie
- **Master L3 Génétique** - 2025

---

**Note** : Ce site est conçu à des fins éducatives. Les images et vidéos utilisées sont des placeholders qui doivent être remplacés par du contenu scientifique approprié dans un contexte réel d'enseignement.
