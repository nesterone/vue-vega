export default function createVegaView (options, vegaSpec) {
  const parse = options.parse
  const logLevel = options.logLevel
  const View = options.View
  const runtime = parse(vegaSpec)

  return new View(runtime)
    .logLevel(logLevel)
    .renderer('svg')
    .hover()
}
