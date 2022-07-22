import fetch from 'auth/FetchInterceptor'
const agentService = {}
const api = '/agent'

agentService.getAgents = async function () {
    try {
      const res = await fetch({
        url: `${api}/get/all/admin`,
        method: 'get',
      })
      return res.data
    } catch (err) {
      console.log(err, 'show-err')
    }
  }

  agentService.getAgentById = async function (id) {
    try {
      const res = await fetch({
        url: `${api}/${id}/admin`,
        method: 'get',
      })
      return res.data
    } catch (err) {
      console.log(err, 'show-err')
    }
  }
  agentService.createAgent = async function (data) {
    try {
      const res = await fetch({
        url: `${api}/create/admin`,
        method: 'post',
        data: data,
      })
      return res
    } catch (err) {
      console.log(err, 'show-err')
    }
  }
  agentService.editAgent = async function (id, data) {
    try {
      const res = await fetch({
        url: `${api}/${id}/admin`,
        method: 'put',
        data: data,
      })
      return res
    } catch (err) {
      console.log(err, 'show-err')
    }
  }
  agentService.editPassword = async function (id, data) {
    try {
      const res = await fetch({
        url: `${api}/password/${id}/admin`,
        method: 'put',
        data: data,
      })
      return res
    } catch (err) {
      console.log(err, 'show-err')
    }
  }
  export default agentService