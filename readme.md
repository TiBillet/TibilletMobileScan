# Tibillet Scan

## cloner le projet
https://github.com/TiBillet/TibilletMobileScan

## Votre code vue dans "front-app"
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

## Tester sur un appareil android
- Dans le dossier "Docker"
- Lancer le conteneur "cordova_dev" et y accéder par une console.
```
docker compose up -d
docker exec -ti  cordova_dev bash
```

- Une fois dans le conteneur, lancer le buil et l'installation de l'application
```
./runAndroid
```

- Si erreur de signature
```
  adb uninstall re.tibillet.tibilletmobile
  cordova run android
```
re.tibillet.tibilletmobile = widget id du fichier config.xml

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
