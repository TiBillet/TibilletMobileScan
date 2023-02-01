const tradData = {
  fr: [
    {"Scan your primary card.": "Scanner votre carte primaire."},
    {"Welcome to": "Bienvenue chez"},
    {hello: "hello"},
    {close: "fermer"},
    {"Create a new member.": "Créer un nouveau membre."},
    {"Scan a booking or membership.": "Scanner une réservation ou une adhésion."},
    {"Sales points": "Points de ventes"},
    {"Reload cashless card.": "Recharge carte cashless"},
    {"Qrcode Ticket Scanner.": "Scanner Qrcode du billet."},
    {"Scanner nfc card.": "Scanner carte nfc."},
    {"Return": "Retour"},
    {"New scan": "Nouveau scanne"}
  ],
  de: [
    {"Scan your primary card.": "Scannen Sie Ihre primäre Karte."},
    {"Welcome to": "Willkommen bei"},
    {hello: "hello"},
    {close: "schließen"},
    {"Create a new member.": "Erstellen Sie ein neues Mitglied."},
    {"Scan a booking or membership.": "Scannen einer Buchung oder Mitgliedschaft."},
    {"Sales points": "Verkaufsstellen"},
    {"Reload cashless card.": "Bargeldlose Karte neu laden."},
    {"Qrcode Ticket Scanner.": "Qrcode Ticket Scanner"},
    {"Scanner nfc card.": "Scanner nfc card."},
    {"Return": "zurück"},
    {"New scan": "Neuen Scan"}
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
}

export const trad = (index) => {
  // console.log('2 - tradOptions =', tradOptions)
  if (tradOptions.activation === true) {
    try {
      const data = tradData[tradOptions.language]
      const resultat = data.find(obj => Object.keys(obj)[0] === index)
      return Object.values(resultat)[0]
    } catch (e) {
      return index
    }
  } else {
    return index
  }
}
