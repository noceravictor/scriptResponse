const jsonexport = require('jsonexport/dist')
const fs = require('fs')
const path = require('path')
const { init } = require('./readJson')

const parseCvs = () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.resolve(init), function(err, data) {
      if (err) {
        return console.log('Ocorreu um erro ao ler')
      }
    })
    resolve(fs.createWriteStream(teste.csv))

    reader.pipe(jsonexport().pipe.writer)
  })
}
