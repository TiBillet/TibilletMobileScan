// console.log('-> Simu cordova.js')
let device = {
  uuid: ''
}

nfc = {
  enabled: (c1,c2) => {
    // console.log('-> appel nfc.enabled de monCordova.js !')
    const infos = document.querySelector('#tibillet-simu-infos')

    // cm, client1 client2
    const cm = infos.getAttribute('data-cm')
    const client1 = infos.getAttribute('data-clt1')
    const client2 = infos.getAttribute('data-clt2')

    // maj device uuid
    device.uuid = infos.getAttribute('data-uuid')

    // ajout select avec options cm, client1 et client2
    const bt = document.querySelector('#tibillet-logo-nfc')
    bt.style.boxShadow = "2px 2px 4px blue"
    // fonction onclick
    bt.addEventListener('click', simuScan,false)

    // selection uuid
    const container = document.querySelector('#tibillet-logo-nfc-container')
    const select = `
    <div>
      <span>Choix carte -> </span>
      <select id="tibillet-select">
        <option value="${cm}">primaire</option>
        <option value="${client1}">client 1</option>
        <option value="${client2}">client 2</option>
        <option value="INCONNUE">INCONNUE</option>
      </select>
    </div>`
    container.insertAdjacentHTML('afterbegin', select)
  },
  removeNdefListener: () => {
    console.log('-> simu nfc.removeNdefListener ok !')
  }
}

function simuScan() {
  const simuTagId = document.querySelector('#tibillet-select').value
  console.log('tagId =', simuTagId)
  const monEvenement = new CustomEvent('simu-some-tag-id', {
    detail: simuTagId,
    bubbles: true
  })
  document.body.dispatchEvent(monEvenement)

}

document.addEventListener("DOMContentLoaded", () => {
  // simu "deviceready"
  const monEvenement = new CustomEvent('simuDeviceready', {
    detail: {},
    bubbles: true
  })
  document.body.dispatchEvent(monEvenement)
}, false)
