const tradData = {
  fr: [
    {"Scan your primary card.": "Scanner votre carte primaire."},
    {"Welcome to": "Bienvenue chez"},
    {hello: "hello"},
    {close: "fermer"}
  ],
  de: [
    {"Scan your primary card.": "Scannen Sie Ihre primäre Karte."},
    {"Welcome to": "Willkommen bei"},
    {hello: "hello"},
    {close: "schließen"}
  ]
}

let tradOptions = {
  activation: true,
  language: 'fr'
}

export const tradConfig = (options) => {
  if (options === undefined) {
    options = {}
  }
  tradOptions.activation = options.activation === undefined ? true : options.activation
  tradOptions.language = options.language === undefined ? 'fr' : options.language
  console.log('1 - tradOptions =', tradOptions)
}

export const trad = (index) => {
  console.log('2 - tradOptions =', tradOptions)
  if (tradOptions.activation === true) {
    try {
      const data = tradData[tradOptions.language]
      const resultat = data.find(obj => Object.keys(obj)[0] === index)
      console.log('resultat =', resultat)
      return Object.values(resultat)[0]
    } catch (e) {
      return index
    }
  } else {
    return index
  }
}
