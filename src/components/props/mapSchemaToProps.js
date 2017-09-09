import { mapValues, reduce } from 'lodash-es'

export default function mapSchemaToProps (vegaLiteSchema) {
  const {
   definitions: {
     TopLevelFacetedUnitSpec: {
       properties
     }
   }
  } = vegaLiteSchema

  return mapValues(properties, (schemaPropValue) => {
    let type = mapSchemaTypeToEsType(schemaPropValue.type)

    if (!type) {
      if (schemaPropValue.anyOf) {
        type = reduce(schemaPropValue.anyOf, (memo, { type }) => {
          let esType = mapSchemaTypeToEsType(type)
          if (esType) {
            if (Array.isArray(esType)) {
              memo = memo.concat(esType)
            } else {
              memo.push(esType)
            }
          }
          return memo
        }, [])
      } else {
        type = mapSchemaRefToEsType(schemaPropValue.$ref)
      }
    }

    return {
      type
    }
  })
}

function mapSchemaRefToEsType (ref) {
  switch (ref) {
    case '#/definitions/Data':
      return [Object, Array]
    case '#/definitions/EncodingWithFacet':
      return Object
    case '#/definitions/AnyMark':
      return String
    case '#/definitions/SelectionDef':
      return Object
    case '#/definitions/Config':
      return Object
    case '#/definitions/Padding':
      return [Number, Object]
  }
}

function mapSchemaTypeToEsType (schemaType) {
  if (!schemaType) {
    return
  }

  switch (schemaType) {
    case 'string':
      return String
    case 'number':
      return Number
    case 'array':
      return Array
    case 'boolean':
      return Boolean
    case 'object':
      return Object
  }
}
