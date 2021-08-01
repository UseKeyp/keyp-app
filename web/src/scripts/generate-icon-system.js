/* eslint-disable no-undef */
const { readdirSync } = require('fs')
const { isSVG, removeExtension } = require('./utils')
const {
  generateWebIconMap,
  generateIconComponentStory,
} = require('./generators')
const path = require('path')

const ICON_SOURCE_FOLDER = path.join(__dirname, '../assets/icons')
const ICON_OUTPUT_FOLDER = path.join(__dirname, '../components/Icon')

const icons = readdirSync(ICON_SOURCE_FOLDER).filter(isSVG).map(removeExtension)

try {
  generateIconComponentStory(icons, { dir: ICON_OUTPUT_FOLDER })
  generateWebIconMap(icons, { dir: ICON_SOURCE_FOLDER })
} catch (e) {
  console.error(e)
}
