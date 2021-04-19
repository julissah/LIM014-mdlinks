/* eslint-disable prefer-destructuring */
const stats = (links) => {
  const total = links.length;
  const path = [...new Set(links.map(data => data.pathName))]
  const pathName = path[0]
  const unique = new Set(links.map(data => data.href)).size;
  return {
    pathName,
    total,
    unique
  }
}

const statsValidate = (links) => {
  const broken = (links.filter(data => data.status >=404)).length;
  return broken;
}

const statsValidateDet = (links) => {
  const detail = links.map(data => {
    const array = {
    ...stats(data),
    "broken": statsValidate(data)
  }
  return array
  })
  return detail
}
module.exports = {
  stats,
  statsValidate,
  statsValidateDet
}

