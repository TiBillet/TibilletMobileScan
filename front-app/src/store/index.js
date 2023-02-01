import {defineStore} from 'pinia'

export const useLocalStore = defineStore('localStore', {
  state: () => ({
    loading: false,
    language: 'fr',
    dialog: {
      activation: false,
      message: '',
      color: 'primary',
      title: 'Information'
    }
  }),
  getters: {
    getLanguage (state) {
      return state.language
    }
  },
  actions: {
    dialogActivationFalse() {
      this.dialog.activation = false
    },
    async connection(tagId, uuid, env) {
      const urlBase = env.VITE_API_URL_BASE
      const user = env.VITE_USER
      const password = env.VITE_PASSWORD
      const body = JSON.stringify({tagId, uuid, user, password})

      const options = {
        method: 'post',
        body,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
      const response = await fetch(urlBase + '/api/connect', options)
      const retour = await response.json()
      console.log('retour =', retour)

      if (response.status === 200) {
        // console.log("C'est une carte primaire !")
        this.router.push('/menu')
      } else {
        let message = ''
        for (let i = 0; i < retour.msg.length; i++) {
          message += '<div>' + retour.msg[i] + '</div>'
        }
        this.dialog = {
          activation: true,
          message,
          color: 'warning',
          title: 'Attention !'
        }
      }
    }
  },
  persist: {
    key: 'TibilletMobileScan',
    storage: window.localStorage
  }
})
