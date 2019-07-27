<template>
    <div class="container columns" >
        <div class="column is-5" >
            <h1>Create New Form</h1>
            
            <b-field label="Name" >
                <b-input placeholder="Enter form's name" type="text" v-model="formName" />
            </b-field>

            <h2>Add Questions</h2>

            <b-field label="Select Question Type">
                <b-select v-model="selectedQuestionType" placeholder="Select a type">
                    <option
                        v-for="(option, index) in questionTypes"
                        :value="option"
                        :key="index">
                        {{ option }}
                    </option>
                </b-select>
            </b-field>

            <b-button class="add" type="is-dark" @click.prevent="addNewQuestion" >Add Question +</b-button>
            <br>
            <b-button class="add" type="is-dark" @click.prevent="saveForm" >Save Form</b-button>
            <br>
            <b-message v-if="error" title="Error" type="is-danger" aria-close-label="Close message">
                {{ error }}
            </b-message>

        </div>
        
        <div class="column is-5" >
            <h1>Questions</h1>
            <div v-if="questions && questions.length" >
                <ol class="questions" >
                    <li v-for="(question, index) in questions" :key="index" >
                        <p>{{ question.body.question }}</p>
                        <b-tag>{{ question.question_type }}</b-tag>
                    </li>
                </ol>
            </div>
            <div v-else>-</div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {
            selectedQuestionType: 'multichoice',
            questionTypes: [
                'multichoice'
            ],
            error: null,
        }
    },
    methods: {
        addNewQuestion() {
            this.$store.commit('changeQuestionType', this.selectedQuestionType)
            this.$router.push('/create-new-form/add')
        },
        async saveForm() {
            const questions = this.$store.state.questions
            const form_name = this.formName

            const jwtToken = window.localStorage.getItem('jwt_token')
            
            try {
                const res = await fetch('http://127.0.0.1:3000/api/v1/forms/create', {
                    method: 'POST',
                    body: JSON.stringify({
                        form_name,
                        questions,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': jwtToken,
                    }
                })
                .then(async res => {
                    const response = await res.json()
                    if (res.status >= 400) {
                        throw new Error(response.error_msg)
                    }

                    return response
                })

                this.$router.push('/success')

            } catch (err) {
                this.error = err
            }
        }
    },
    computed: {
        ...mapState({
            questionType: state => state.questionType,
            questions: state => state.questions,
        }),
        formName: {
            get() {
                return this.$store.state.formName
            },
            set(value) {
                this.$store.commit('changeFormName', value)
            }
        }
    }
}
</script>

<style>
    .questions li {
        margin-bottom: 1em;
    }
    .add {
        margin-bottom: 2em;    
    }
</style>
