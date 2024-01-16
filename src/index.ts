export const pythonizeKey = (key: string) => {
  const accents: Record<string, RegExp> = {
    a: /[àáâãäå]/g,
    ae: /æ/g,
    c: /ç/g,
    e: /[èéêë]/g,
    i: /[ìíîï]/g,
    n: /ñ/g,
    o: /[òóôõö]/g,
    oe: /œ/g,
    u: /[ùúûü]/g,
    y: /[ýÿ]/g,
  }

  let _key = Object.keys(accents)
    .reduce((all, k) => all.replace(accents[k], k), key)
    .replace(/[^A-Za-z0-9_]/g, ' ')
    .replace(/[A-Z]/g, match => ` ${match}`)
    .trim()
    .replace(/ /g, '_')
    .toLowerCase()

  while (_key.includes('__')) _key = _key.replace(/__/g, '_')

  return _key
}

export const pythonizeObject = (object: any): any =>
  typeof object === 'object'
    ? Array.isArray(object)
      ? [...new Set(object)].sort()
      : Object.keys(object)
          .sort()
          .reduce(
            (all, key) => ({
              ...all,
              [pythonizeKey(key)]: pythonizeObject(object[key]),
            }),
            {} as any,
          )
    : object

const a = pythonizeKey('Um ninho de MalfagáfosÇomSeteMALFAGAFINHOS')

console.log(a)
