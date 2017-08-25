import vegaLiteProps from 'src/components/props/vegaLiteProps'

describe('Vega Lite Props', () => {
  it('can have description as string', () => {
    expect(vegaLiteProps.description.type).to.equal(String)
  })

  it('can have mark as string', () => {
    expect(vegaLiteProps.mark.type).to.equal(String)
  })

  it('can have encoding as Object', () => {
    expect(vegaLiteProps.encoding.type).to.equal(Object)
  })

  it('can have data which might be Object or Array', () => {
    expect(vegaLiteProps.data).to.deep.equal([Object, Array])
  })

  it('can have schema as string', () => {
    expect(vegaLiteProps.schema.type).to.equal(String)
  })

  it('should have default schema', () => {
    const schema = 'https://vega.github.io/schema/vega-lite/v2.json'
    expect(vegaLiteProps.schema.default).to.equal(schema)
  })
})
