const {validateIsFileMd, mdlinks} = require('./index')
const stats = (route,value) => {
  // mdlinks(route,value)
  // .then (data => console.log(data.href))
  // console.table(result + 'ok')
  return mdlinks(route,value).length
}

module.exports = {stats}
