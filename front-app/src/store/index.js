import {defineStore} from 'pinia'

export const useLocalStore = defineStore('local-store', {
  state: () => {
    return {
      loading: false
    }
  },
  getters: {},
  actions: {
    connection: async (tagId, uuid, urlBase) => {
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
      // router.push('/menu')

    }
  },
  persist: {
    key: 'TibilletMobileScan',
    storage: window.localStorage
  }
})
