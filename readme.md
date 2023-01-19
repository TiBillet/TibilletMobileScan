# Tibillet Scan

## cloner le projet

## Votre code vue dans "front-app"
- Modifier votre code   
- Transpiler :
```
npm run build
```

## Tester sur un appareil android
- Dans le dossier "Docker"
- 
- Lancer le conteneur "cordova_dev" et y accéder dans une console.
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
```
re.tibillet.tibilletmobile = widget id du fichier config.xml