import { compile } from 'vega-lite'
import vegaDelegate from './vegaDelegate'

export default Object.assign({
  compileVegaLite: compile
}, vegaDelegate)
