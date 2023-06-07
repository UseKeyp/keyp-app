export const getMethodDisplayName = ({ name, inputs }) => {
  // Convert a function entity to a human-friendly string
  const inputTypesText = inputs.map((input) => input.type)
  return `${name}${inputs.length > 0 ? ` (${inputTypesText})` : ''}`
}

const sortNested = (a, b) => {
  var textA = a.name.toUpperCase()
  var textB = b.name.toUpperCase()
  return textA < textB ? -1 : textA > textB ? 1 : 0
}

export const filterEvents = (abi) => {
  try {
    return abi.filter((method) => method.type === 'function')
  } catch (e) {
    return []
  }
}

export const getViewMethods = (abi) => {
  try {
    return filterEvents(abi)
      .filter((method) => method.stateMutability === 'view')
      .sort(sortNested)
  } catch (e) {
    return []
  }
}

export const getWriteMethods = (abi) => {
  try {
    return filterEvents(abi)
      .filter((method) => method.stateMutability !== 'view')
      .sort(sortNested)
  } catch (e) {
    return []
  }
}

const PLACEHOLDER_BASE_TYPE = {
  int: '255',
  bool: 'true',
  address: '0x261b45d85ccfeabb11f022eba346ee8d1cd488c0',
  string: 'example text',
  byte: '01',
}

export const getArgumentsFromMethod = (method) => {
  const args = method.inputs.map((input) => input.type)
  return args.map((arg, index) => {
    const baseType = arg
      .replace(/(uint|int)[0-9]*/, 'int')
      .replace(/(byte|bytes)[0-9]*/, 'byte')
      .replace(/\[\]/, '')
    let placeholder = PLACEHOLDER_BASE_TYPE[baseType]
    const isArray = /\[\]/.test(arg)
    if (isArray) placeholder = `${placeholder}, ${placeholder}`
    return {
      type: isArray ? 'textarea' : 'textfield',
      description: method.inputs[index].name || arg,
      placeholder: `i.e. ${placeholder}`,
    }
  })
}

export const formatContractArgs = (args) => {
  if (!args) return null
  return args.map((arg) => {
    if (/,/.test(arg)) {
      // Array value

      return arg.split(',')
    }
    return `${arg}`
  })
}

export const getContractFriendlyArguments = (argumentList, abi, argOffset) => {
  /* eslint-disable-next-line no-unused-vars*/
  let list = argumentList
  const traceArgs = list.splice(0, argOffset) // remove trace arguments (if any)
  let [address, _, methodId, ...methodSpecificArgs] = list
  if (!methodId || !abi) return list
  const [methodName, argTypes] = methodId.split('-')
  const typesList = argTypes ? argTypes.split(',') : []
  // Pick out the relevant function fragment
  // const abiFragment = [getFragmentFromMethodId(abi, methodId)]
  let args = [address, methodName]
  if (argTypes) args.push(...formatContractArgs(methodSpecificArgs, typesList))
  return traceArgs.concat(args) // add back trace arguments
}

export const getCodeSampleFriendlyArguments = (
  argumentList,
  abi,
  argOffset
) => {
  let list = argumentList
  const traceArgs = list.splice(0, argOffset) // remove trace arguments (if any)
  const [contract, cleanAbi, methodId, ...methodSpecificArgs] =
    getContractFriendlyArguments(list, abi)
  let abiObj = cleanAbi
  try {
    abiObj = JSON.parse(cleanAbi)
  } catch (e) {
    // do nothing
  }
  let codeFriendlyArguments = [
    contract,
    abiObj,
    methodId,
    JSON.stringify(methodSpecificArgs).replace(/^\[/, '').replace(/\]$/, ''),
  ]
  if (traceArgs) codeFriendlyArguments.splice(0, 0, ...traceArgs)
  return codeFriendlyArguments
}

export const getFormInputsFromMethod = (
  abi,
  methodId,
  formInputs,
  argOffset
) => {
  return [...formInputs.slice(0, 3 + argOffset)]
}
