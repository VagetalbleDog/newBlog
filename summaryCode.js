const util = require('util')
const { exec } = require('child_process')
const execPromise = util.promisify(exec)

const summarySrc = execPromise('cloc ./src')
const summaryPublic = execPromise('cloc ./public')
let result = []
const doSummary = () => {
  let p1 = summarySrc.then((res) => {
    const length = res.stdout.split('\n').length
    let regExp = /([\w]+)([\s]+)([\d]+)([\s]+)([\d]+)([\s]+)([\d]+)([\s]+)([\d]+)/
    let arr = res.stdout.split('\n').slice(8, length - 4)
    for (let item of arr) {
      let tempArr = regExp.exec(item)
      result.push({
        name: tempArr[1],
        value: tempArr[9]
      })
    }
    return Promise.resolve(true)
  })
  let p2 = summaryPublic.then((res) => {
    const length = res.stdout.split('\n').length
    let regExp = /([\w]+)([\s]+)([\d]+)([\s]+)([\d]+)([\s]+)([\d]+)([\s]+)([\d]+)/
    let arr = res.stdout.split('\n').slice(8, length - 4)
    for (let item of arr) {
      let tempArr = regExp.exec(item)
      result.push({
        name: tempArr[1],
        value: tempArr[9]
      })
    }
    return Promise.resolve(true)
  })
  let promiseArr = [p1, p2]
  return Promise.all(promiseArr)
}

doSummary().then(() => {
  console.log(result)
})
