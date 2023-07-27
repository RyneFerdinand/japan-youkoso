import Http from '@/utils/request/Http'

export default {
  async create(stepObject) {
    return await Http.post('/step', stepObject)
  },
  async getById(id) {
    return await Http.get(`/step/${id}`)
  },
  async getAll(page) {
    return await Http.get(`/step?page=${page}`)
  },
  async approve(id) {
    return await Http.post(`/step/${id}/approve`)
  },
  async getAllActiveSteps(page) {
    return await Http.get(`/step?approve=1&page=${page}`)
  },
  async getAllWeightedActiveSteps(page) {
    return await Http.get(`/step?approve=1&page=${page}&weight=true`)
  },
  async getAllInactiveSteps(page) {
    return await Http.get(`/step?approve=0&page=${page}`)
  },
  async getCommentById(id) {
    return await Http.get(`/step/${id}/comment`)
  },
  async voteByUserId(id, voteObject) {
    return await Http.post(`/step/${id}/vote`, voteObject)
  },
  async getVotesById(id) {
    return await Http.get(`/step/${id}/vote`);
  },
  async skipStep(id, userId) {
    return await Http.post(`/step/${id}/user/${userId}/skip`);
  },
  async doneStep(id, userId) {
    return await Http.post(`/step/${id}/user/${userId}/done`);
  },
  async getUserSelection(userId) {
    return await Http.get(`/step/user/${userId}`);
  },
}