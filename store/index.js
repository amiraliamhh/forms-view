export const state = () => ({
    questionType: null,
    questions: [],
    formName: ''
})

export const mutations = {
    changeQuestionType(state, questionType) {
        state.questionType = questionType
    },
    addQuestion(state, question) {
        state.questions.push(question)
    },
    changeFormName(state, name) {
        state.formName = name
    }
}
