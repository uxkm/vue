'use strict'

/**
 * Node 6 cannot parse chokidar@3 (async syntax).
 * sass@1.x always require()'s chokidar even for one-shot compile.
 * - remove nested chokidar@3 under sass
 * - stub chokidar inside sass.dart.js so Node 6 can compile SCSS
 */

var fs = require('fs')
var path = require('path')

function rmDeep (target) {
  if (!fs.existsSync(target)) return
  var stat = fs.lstatSync(target)
  if (stat.isDirectory()) {
    fs.readdirSync(target).forEach(function (name) {
      rmDeep(path.join(target, name))
    })
    fs.rmdirSync(target)
  } else {
    fs.unlinkSync(target)
  }
}

function findNestedChokidar (dir, results) {
  if (!fs.existsSync(dir)) return results
  var entries
  try {
    entries = fs.readdirSync(dir)
  } catch (e) {
    return results
  }
  entries.forEach(function (name) {
    if (name === '.bin') return
    var full = path.join(dir, name)
    var stat
    try {
      stat = fs.lstatSync(full)
    } catch (e) {
      return
    }
    if (!stat.isDirectory()) return
    if (name === 'chokidar') {
      var pkg = path.join(full, 'package.json')
      if (fs.existsSync(pkg)) {
        try {
          var version = JSON.parse(fs.readFileSync(pkg, 'utf8')).version || ''
          if (version.charAt(0) === '3' || version.charAt(0) === '4') {
            results.push(full)
          }
        } catch (e) {}
      }
      return
    }
    if (name === 'node_modules' || name.charAt(0) !== '.') {
      findNestedChokidar(full, results)
    }
  })
  return results
}

var root = path.join(__dirname, '..')
var sassDir = path.join(root, 'node_modules', 'sass')
var nestedList = findNestedChokidar(path.join(root, 'node_modules'), [])

nestedList.forEach(function (dir) {
  // keep root node_modules/chokidar (2.x)
  if (path.normalize(dir) === path.normalize(path.join(root, 'node_modules', 'chokidar'))) {
    return
  }
  console.log('[fix-node6-sass] remove', path.relative(root, dir))
  rmDeep(dir)
})

var sassDart = path.join(sassDir, 'sass.dart.js')
if (fs.existsSync(sassDart)) {
  var src = fs.readFileSync(sassDart, 'utf8')
  var needle = 'self.chokidar = require("chokidar");'
  var stub = 'self.chokidar = { watch: function () { return { on: function () { return this; }, close: function () {} }; } };'
  if (src.indexOf(needle) !== -1) {
    src = src.split(needle).join(stub)
    fs.writeFileSync(sassDart, src)
    console.log('[fix-node6-sass] stubbed chokidar require in sass.dart.js')
  } else if (src.indexOf('self.chokidar = { watch:') !== -1) {
    console.log('[fix-node6-sass] sass.dart.js already stubbed')
  } else {
    console.log('[fix-node6-sass] chokidar require pattern not found (skipped)')
  }
}

console.log('[fix-node6-sass] done')
