<template>
    <form class="container column is-5" >
        <h1>Sign Up</h1>
        <b-field label="Email">
            <b-input type="email" v-model="email" />
        </b-field>
        <b-field label="Password">
            <b-input type="password" v-model="password" />
        </b-field>
        <b-button type="is-dark" @click.prevent="submitForm" >Submit</b-button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        async submitForm() {
            const { email, password } = this
            const response = await fetch('http://127.0.0.1:3000/api/v1/users/signup', {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())

            console.log(response)
        }
    }
}
</script>

<style>

</style>
