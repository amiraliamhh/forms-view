<template>
    <form>
        <h3>Add Multichoice Question</h3>
        <b-field label="Question">
            <b-input type="text" v-model="question" />
        </b-field>
        
        <b-button class="add" type="is-dark" @click.prevent="addNewQuestion" >Add choice +</b-button>

        <b-field v-for="(choice, index) in choices" :key="index" >
            <b-input placeholder="write choice here" type="text" v-model="choices[index]" />
            <b-button class="remove-choice" type="is-dark" @click.prevent="() => removeChoice(index)">X</b-button>
        </b-field>

        <br>
        <b-button
        :disabled="saveIsDisabled"
        class="add"
        type="is-dark"
        @click.prevent="saveQuestion" >Save Question</b-button>
    </form>
</template>

<script>
export default {
    name: 'multichoice-question',
    data() {
        return {
            question: '',
            choices: []
        }
    },
    methods: {
        addNewQuestion() {
            this.choices.push(null)
        },
        removeChoice(index) {
            this.choices.splice(index, 1)
        },
        saveQuestion() {
            const questionJSON = {
			    question_type: "multichoice",
			    body: {
			    	question: this.question,
			    	choices: this.choices,
			    }
            }
            
            this.$emit('save', questionJSON)
        }
    },
    computed: {
        saveIsDisabled() {
            if (!this.choices.length || !this.question) {
                return true
            }

            for (const choice of this.choices) {
                if (!choice) {
                    return true
                }
            }

            return false
        }
    }
}
</script>

<style>
    .add {
        margin-bottom: 2em;    
    }
    .remove-choice {
        margin-left: 1em;
    }
</style>
