import Http from '@/utils/request/Http'

export default {
    async create(commentObject) {
        return await Http.post('/comment', commentObject)
    },
    async voteByUserId(id, voteObject) {
        return await Http.post(`/comment/${id}/vote`, voteObject)
    },
    async getVotesById(id) {
        return await Http.get(`/comment/${id}/vote`);
    }
}