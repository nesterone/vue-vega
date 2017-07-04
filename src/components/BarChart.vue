<script>
    import * as vega from 'vega';
    import * as vl from 'vega-lite';

    const specTemplate = {
        "$schema": "https://vega.github.io/schema/vega-lite/v2.json"
    };

    export default {

        template: `<div></div>`,

        props: {
            description: {
                type: String
            }
        },

        beforeCreate(){
            console.log("before created");

            this.$spec = Object.assign({}, specTemplate);

            this.$spec.data = this.$options.__proto__.data();

            const mark = this.$options.__proto__.mark;

            if (!mark) {
                throw new Error("Can't build visualization without mark type");
            }

            this.$spec.mark = mark;

            const encoding = this.$options.__proto__.encoding;

            if (!encoding) {
                throw new Error("Can't build visualization data encoding");
            }

            this.$spec.encoding = encoding;
        },

        created(){

            if (this.description) {
                this.$spec.description = this.description;
            }

            const vegaSpec = vl.compile(this.$spec).spec;
            const runtime = vega.parse(vegaSpec);

            this.$vg = new vega.View(runtime)
                .logLevel(vega.Debug)
                .renderer("svg")
                .hover()
        },

        mounted(){
            this.$vg
                .initialize(this.$el)
                .run();
        },

        destroyed(){
            this.$vg.finalize();
        },

        data () {
            return {
                values: [
                    {"a": "A", "b": 28}, {"a": "B", "b": 55}, {"a": "C", "b": 43},
                    {"a": "D", "b": 91}, {"a": "E", "b": 81}, {"a": "F", "b": 53},
                    {"a": "G", "b": 19}, {"a": "H", "b": 87}, {"a": "I", "b": 52}
                ]
            }
        },

        mark: "bar",

        encoding: {
            x: {field: "a", type: "ordinal"},
            y: {field: "b", type: "quantitative"}
        }
    }
</script>

