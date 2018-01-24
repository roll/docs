const fs = require('fs')
const yaml = require('js-yaml')
const axios = require('axios')


// Main

async function main() {
  const sources = yaml.safeLoad(fs.readFileSync('remote.yml', 'utf8'))
  for (const source of sources) {
    const url = `https://raw.githubusercontent.com/frictionlessdata/tabulator-py/master/README.md`
    const doc = (await axios.get(url)).data
    fs.writeFileSync(`sources/${source}.md`, doc)
  }
}


// System

main()
  .then(() => process.exit(0))
  .catch(error => {console.log(error); process.exit(1)})
