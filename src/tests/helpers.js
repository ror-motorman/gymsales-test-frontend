export function execNext(func) {
  return Promise.resolve().then(() => {
    setImmediate(func)
  })
}
