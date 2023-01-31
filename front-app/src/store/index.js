import {defineStore} from 'pinia'

export const useLocalStore = defineStore('localStore', {
  state: () => ({
    loading: false,
    dialog: {
      activation: false,
      message: '',
      color: 'primary',
      title: 'Information'
    }
  }),
  getters: {},
  actions: {
    async connection(tagId, uuid, urlBase) {
      const body = JSON.stringify({tagId, uuid})
      const options = {
        method: 'post',
        body,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
      console.log('options =', options)
      console.log('urlBase =', urlBase)
      const response = await fetch(urlBase + '/api/connect', options)
      const retour = await response.json()
      console.log('retour =', retour)

      if (response.status === 200) {
        console.log("C'est une carte primaire !")
      } else {
        let message = ''
        for (let i = 0; i < retour.msg.length; i++) {
          message += '<div>'+retour.msg[i] + '</div>'
        }
        this.dialog.activation = true
        this.dialog.message = message
        this.dialog.color = 'warning'
      }
      // router.push('/menu')

    }
  },
  persist: {
    key: 'TibilletMobileScan',
    storage: window.localStorage
  }
})
