import Http from '@/utils/request/Http'

export default {
  async register(userObject) {
    return await Http.post('/user/register', userObject)
  },
  async login(userObject) {
    return await Http.post('/user/login', userObject)
  },
  async getById(id) {
    return await Http.get(`/user/${id}`)
  }
}
