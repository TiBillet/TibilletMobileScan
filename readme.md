# Tibillet Scan

## cloner le projet
https://github.com/TiBillet/TibilletMobileScan

## Votre code vue/vuetify dans "TibilletMobileScan/front-app" 
- Installer environnement node.js
```
curl https://get.volta.sh | bash
```

- Installer les dépendences
```
npm i
```

- Modifier votre code   
- Transpiler :
```
npm run build
```
- Tester l'app sur un navigateur de bureau (http://localhost/index.html)
```
npm run dev
```

## Tester sur un appareil android dans "TibilletMobileScan/Docker"
- Lancer le conteneur "cordova_dev" et y accéder par une console.
```
docker compose up -d
docker exec -ti  cordova_dev bash
```

- Une fois dans le conteneur, lancer le buil et l'installation de l'application
```
cordova run android
```

- Si erreur de signature
```
  adb uninstall re.tibillet.tibilletmobile
  cordova run android
```
re.tibillet.tibilletmobile = widget id du fichier config.xml
- 
- Si votre mobile n'est pas reconnu :   
. mobile en mode dévellopeur / activer l'usb   
. débrancher/ brancher votre mobile et autoriser l'accès à l'ordi   
. vérifier votre connxion mobile   
```
adb devices
```

## Sécurité (Content Security Policy, tag 'meta' dans index.html)
content:   
- Gère les connexions = "connect-src" autorisées :     
  . localhost   
  . https://filaos.re/api/connect   

- Gère les scriptes = "script-src" autorisés :
  . localhost

- Gère les fontes = "font-src" autorisées :  
  . 'self' = locale   
  . https://fonts.gstatic.com/   

- Gère les feuilles de style = "style-src"   
  . 'self'   
  . https://fonts.googleapis.com/
  . 'unsafe-inline' = le style codé dans une feuille de style chargé

## Divers
### Créer un projet vue avec vite
```
npm create vite@latest front-vue -- --template vue
```

### storybook
#### Installation (zero-config setup)
Dans le dossier root de l'application vue
```
npx sb init
```

#### Démarrage
```
npm run storybook
```