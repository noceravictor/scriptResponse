const fs = require('fs')
const jsonexport = require('jsonexport/dist')
const { promisify } = require('util')
const path = require('path')

// const readFilePromise = promisify(readFile)
// const writeFilePromise = promisify(writeFile)

const file = 'backupProducao0904.json'

const readFileData = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.resolve(__dirname, '..', 'arquivos', file),
      'utf8',
      function(err, data) {
        if (err) {
          return console.log('Erro ao ler aquivo')
        }
        resolve(JSON.parse(data))
      } // module.exports = {
      //   readJson
      // }
    )
  })
}

const manipulateValues = values => {
  let response
  if (typeof values == 'string') {
    response = values.toLowerCase().includes('site')
  } else {
    response = values.find(value => value.toLowerCase().includes('site'))
  }
  return response ? response : null
}

const manipulateData = data => {
  const response = []
  // const value = [values]
  data.dialog_nodes.forEach(dialog => {
    if (
      (dialog.context &&
        dialog.context.link_info &&
        dialog.context.link_info.link_text &&
        dialog.context.link_info.link_text.toLowerCase().includes('site')) ||
      (dialog.output &&
        dialog.output.text &&
        dialog.output.text.values &&
        manipulateValues(dialog.output.text.values))
    ) {
      response.push({
        title: dialog.title,
        parent: dialog.parent,
        dialog_node: dialog.dialog_node,
        jump: dialog.next_step ? dialog.next_step.dialog_node : null,
        text: dialog.output.text ? dialog.output.text.values : null
      })
    }
  })
  return response
}

const parseCvs = async data => {
  jsonexport(data, function(err, csv) {
    if (err) return console.log(err)
    fs.writeFileSync('teste.csv', csv)
  })
}

const init = async () => {
  const data = await readFileData()
  const response = await manipulateData(data)
  parseCvs(response)
  console.log(response)
}

module.exports = {
  response
}

init()
