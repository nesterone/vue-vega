<template>
    <g class="mark-rect role-bar marks">
        <svg-rect v-for="(value, index) in encode" :x="index | indexToXCoordiantes" :height="value[y.field]" :width="width"></svg-rect>
    </g>
</template>

<script>
    import SvgRect from "./SvgRect.vue";

    var RECT_WIDTH = 21;

    export default {

        props: ["encode", "height", "x", "y"],

        components: {
            SvgRect
        },

        computed: {
            width(){
                return RECT_WIDTH
            }
        },

        filters: {
            indexToXCoordiantes(index){
                var xPosition = 1;
                if (index > 0){
                    xPosition = RECT_WIDTH * index + 1;
                }
                return xPosition;
            }
        }

    }
</script>

