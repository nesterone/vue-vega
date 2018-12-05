import {Warn} from 'vega-util'
import {RenderType} from 'vega-scenegraph'

export const LOG_LEVEL = Warn
export const RENDER_TYPE = RenderType.SVG
export const COMPONENT_TEMPLATE = '<div></div>'
export const VEGA_LITE_COMPONENT_NAME = 'vega-lite'
export const DEFAULT_DATA_SOURCE_NAME = 'source_0'
export const SIGNAL_EVENT_PREFIX = 'signal'
export const VEGA_LITE_SCHEMA_URL = 'https://vega.github.io/schema/vega-lite/v2.6.0.json'
export const EVENTS_TO_DELEGATE = [
  'keydown',
  'keypress',
  'keyup',
  'dragenter',
  'dragleave',
  'dragover',
  'mousedown',
  'mouseup',
  'mousemove',
  'mouseout',
  'mouseover',
  'click',
  'dblclick',
  'wheel',
  'mousewheel',
  'touchstart',
  'touchmove',
  'touchend'
]
