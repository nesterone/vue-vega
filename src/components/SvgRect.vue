<template>
   <path :d="pathDefinition" style="fill: rgb(76, 120, 168);"></path>
</template>

<script>
    export default {
        props: ["height", "x", "width"],

        computed: {
            pathDefinition() {
                return `M${this.x},${this.height}h19v56h-19Z`
            }
        }
    }
</script>

