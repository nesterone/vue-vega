import mapSchemaToProps from 'src/components/props/mapSchemaToProps'
import vegaLiteSchema from 'schema/vega-lite-schema.json'

console.log(vegaLiteSchema)

describe('Map Vega Lite Schema to Vue Props', () => {
  it('can have description as string', () => {
    const props = mapSchemaToProps(vegaLiteSchema)

    expect(props).to.deep.equal({
      $schema: {
        type: String
      },
      autoResize: {
        type: Boolean
      },
      background: {
        type: String
      },
      padding: {
        type: [Number, Object]
      },
      config: {
        type: Object
      },
      data: {
        type: [Object, Array]
      },
      description: {
        type: String
      },
      encoding: {
        type: Object
      },
      height: {
        type: Number
      },
      mark: {
        type: String
      },
      name: {
        type: String
      },
      selection: {
        type: Object
      },
      title: {
        type: [String]
      },
      transform: {
        type: Array
      },
      width: {
        type: Number
      }
    })
  })
})
