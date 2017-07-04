<script>

    import * as vega from 'vega';
    import * as vl from 'vega-lite';

    var spec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
        "description": "A simple bar chart with embedded data.",
        "data": {
            "values": [
                {"a": "A","b": 28}, {"a": "B","b": 55}, {"a": "C","b": 43},
                {"a": "D","b": 91}, {"a": "E","b": 81}, {"a": "F","b": 53},
                {"a": "G","b": 19}, {"a": "H","b": 87}, {"a": "I","b": 52}
            ]
        },
        "mark": "bar",
        "encoding": {
            "x": {"field": "a", "type": "ordinal"},
            "y": {"field": "b", "type": "quantitative"}
        }
    };

    export default {

        template: `<div></div>`,

        created(){
            console.log("created")
        },

        mounted(){

            var vegaSpec = vl.compile(spec).spec;

            var runtime = vega.parse(vegaSpec);

            this.$vg = new vega.View(runtime)
                .logLevel(vega.Debug)
                .initialize(this.$el)
                .renderer("svg")
                .hover()
                .run();
        },

        data () {
            return {
                values: [
                    {"a": "A","b": 28}, {"a": "B","b": 55}, {"a": "C","b": 43},
                    {"a": "D","b": 91}, {"a": "E","b": 81}, {"a": "F","b": 53},
                    {"a": "G","b": 19}, {"a": "H","b": 87}, {"a": "I","b": 52}
                ]
            }
        }

    }
</script>

