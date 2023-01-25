<template>
    <v-btn variant="text" icon="mdi-less-than" color="green" class="mr-6" @click="goBack"></v-btn>
</template>

<script>
export default {
    methods: {
        goBack() {
            let goTo = this.$route.fullPath.split('/')
            goTo.pop()
            this.$router.push(goTo.length > 1 ? goTo.join('/') : '/home')
        }
    },
}
</script>

<style lang="scss" scoped>

</style>