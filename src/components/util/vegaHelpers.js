export function createView (options, vegaSpec) {
  const parse = options.parse
  const logLevel = options.logLevel
  const renderType = options.renderType
  const View = options.View
  const runtime = parse(vegaSpec)

  return new View(runtime)
    .logLevel(logLevel)
    .renderer(renderType)
    .hover()
}

export function wrapWithValues (data) {
  let result = data
  if (Array.isArray(data)) {
    result = {values: data}
  }
  return result
}

