<template>
    <div>
        <nuxt-link to="/create-new-form" > back </nuxt-link>
        <multichoice-question @save="save" v-if="questionType === 'multichoice'" />
    </div>
</template>

<script>
import { mapState } from 'vuex'

import MultichoiceQuestion from '~/components/questions/multichoice'

export default {
    components: {
        MultichoiceQuestion,
    },
    computed: {
        ...mapState({
            questionType: state => state.questionType
        })
    },
    methods: {
        save(question) {
            this.$store.commit('addQuestion', question)
            this.$router.push('/create-new-form')
        }
    }
}
</script>

<style>

</style>
