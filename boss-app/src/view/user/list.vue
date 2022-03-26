<template>
    <div>

    </div>
</template>

<script>
    import {user_page} from "../../api/user"

    export default {
        name: "list",
        mounted() {
            user_page()
        }
    }
</script>

<style scoped>

</style>