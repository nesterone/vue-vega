import assemblePropsToSpec from 'src/components/computed/assemblePropsToSpec'

describe('assemblePropsToSpec', () => {
  let props
  let vegaLiteSpecResult
  let context

  beforeEach(() => {
    props = {
      one: {
        type: String
      },
      two: {
        type: String
      },
      three: {
        type: Object
      },
      data: [1, 2, 3]
    }

    vegaLiteSpecResult = {
      one: {
        type: String
      },
      two: {
        type: String
      },
      three: {
        type: Object
      },
      data: {values: []}
    }

    context = {
      ...props
    }
  })

  it('should combine all props in one spec object', () => {
    const specResult = assemblePropsToSpec.call(context, props)

    expect(specResult).to.deep.equal(vegaLiteSpecResult)
  })

  it('should override data with url if dataUrl available in context', () => {
    const expectedUrl = 'bla/bla'
    context.dataUrl = expectedUrl
    vegaLiteSpecResult.data = {url: expectedUrl}

    const specResult = assemblePropsToSpec.call(context, props)

    expect(specResult).to.deep.equal(vegaLiteSpecResult)
  })
})
