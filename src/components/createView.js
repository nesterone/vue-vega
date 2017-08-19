export default function createView (options, vegaSpec) {
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
