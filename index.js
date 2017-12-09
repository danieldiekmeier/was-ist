#!/usr/bin/env node

const wikiClient = require('wikijs').default

const what = process.argv[process.argv.length - 1]

const wiki = wikiClient({
  apiUrl: 'https://de.wikipedia.org/w/api.php',
  origin: null
})

wiki
  .search(what)
  .then(({ results }) => {
    const bestResult = results[0]
    return wiki.page(bestResult)
  }).then(result => {
    return result.content()
  }).then(content => {
    const firstSentence = content
      .replace(/\(.*?\)/g, '')
      .replace('  ', ' ')
      .split(/\.\s/)[0] + '.'

    console.log(firstSentence)
  })
