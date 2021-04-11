const stats = (links) => {
  const total = links.length;
  const unique = new Set(links.map(data => data.href)).size;
  return {
    total,
    unique
  }
}

const statsValidate = (links) => {
  const broken = (links.filter(data => data.status >=404)).length;

  return broken;
}
module.exports = {
  stats,
  statsValidate
}
