import { promisify } from 'util'
import { exec } from 'child_process'
const execPromise = promisify(exec)

const summary = execPromise('cloc ../')

let result = []
const doSummary = () => {
  return summary.then((res) => {
    const length = res.stdout.split('\n').length
    let regExp = /([\w]+)([\s]+)([\d]+)([\s]+)([\d]+)([\s]+)([\d]+)([\s]+)([\d]+)/
    let arr = res.stdout.split('\n').slice(8, length - 4)
    for (let item of arr) {
      let tempArr = regExp.exec(item)
      result.push({
        name: tempArr[1],
        count: tempArr[9]
      })
    }
    console.log(result)
    return Promise.resolve(result)
  })
}
doSummary().then((res) => {
  console.log(res)
})
