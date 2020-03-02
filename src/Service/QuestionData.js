import axios from 'axios';

const url = "https://immense-everglades-72777.herokuapp.com/api"


class QuestionData {
    getAllQuestions() {
        return axios.get(`${url}/question/list`);
    }

    deleteQuestionById(id) {
        return axios.delete(`${url}/question/${id}`);
    }

    getQuestionById(id) {
        return axios.get(`${url}/question/${id}`);
    }

    updateQuestionById(id, question) {
        return axios.put(`${url}/question/${id}`, question);
    }

    createQuestion(question) {
        return axios.post(`${url}/question`, question);
    }

}

export default new QuestionData();
