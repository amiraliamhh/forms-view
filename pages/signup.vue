<template>
    <form class="container column is-5" >
        <h1>Sign Up</h1>
        <b-field label="Email">
            <b-input type="email" v-model="email" />
        </b-field>
        <b-field label="Password">
            <b-input type="password" v-model="password" />
        </b-field>
        <b-message v-if="error" title="Error" type="is-danger" aria-close-label="Close message">
            {{ error }}
        </b-message>
        <b-button type="is-dark" @click.prevent="submitForm" >Submit</b-button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            error: null,
        }
    },
    methods: {
        async submitForm() {
            const { email, password } = this

            try {
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
                .then(async res => {
                    const jsonResponse = await res.json()
                    if (res.status >= 400) {
                        throw new Error(jsonResponse.error_msg)
                    }
                    return jsonResponse
                })

                window.localStorage.setItem('jwt_token', response.data.token)
                this.$router.push('/welcome')

            } catch (err) {
                this.error = err
            }
        }
    }
}
</script>

<style>

</style>
