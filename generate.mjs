import * as Module from 'module'
import * as fs from 'fs'
import * as path from 'path'

const compatibility = {
  assert: 'bare-assert',
  async_hooks: 'bare-async-hooks',
  buffer: 'bare-buffer',
  child_process: 'bare-subprocess',
  console: 'bare-console',
  crypto: 'bare-crypto',
  dgram: 'bare-dgram',
  diagnostics_channel: 'bare-diagnostics-channel',
  dns: 'bare-dns',
  events: 'bare-events',
  fs: 'bare-fs',
  http: 'bare-http1',
  https: 'bare-https',
  inspector: 'bare-inspector',
  module: 'bare-module',
  net: 'bare-net',
  os: 'bare-os',
  path: 'bare-path',
  perf_hooks: 'bare-performance',
  process: 'bare-process',
  punycode: 'bare-punycode',
  querystring: 'bare-querystring',
  readline: 'bare-readline',
  repl: 'bare-repl',
  stream: 'bare-stream',
  string_decoder: 'bare-string-decoder',
  timers: 'bare-timers',
  tls: 'bare-tls',
  tty: 'bare-tty',
  url: 'bare-url',
  util: 'bare-utils',
  v8: 'bare-v8',
  vm: 'bare-vm',
  worker_threads: 'bare-worker',
  zlib: 'bare-zlib'
}

const modules = {}

const builtins = [...Module.builtinModules]
  .filter((builtin) => !builtin.startsWith('_'))
  .map((builtin) => builtin.replace(/^node:/, ''))
  .sort()

for (const builtin of builtins) {
  const [name, subpath = null] = builtin.split('/')

  let module = modules[name] || null

  if (module === null) {
    module = modules[name] = {
      name,
      subpaths: [],
      compatibility: name in compatibility ? compatibility[name] : null
    }
  }

  if (subpath) module.subpaths.push(subpath)
}

const imports = {}

for (const mod of Object.values(modules)) {
  const target = mod.compatibility === null ? 'bare-node-runtime/unsupported' : mod.compatibility

  imports['node:' + mod.name] = imports[mod.name] = {
    bare: target,
    default: mod.name
  }

  for (const subpath of mod.subpaths) {
    const target =
      mod.compatibility === null
        ? 'bare-node-runtime/unsupported'
        : mod.compatibility + '/' + subpath

    imports['node:' + mod.name + '/' + subpath] = imports[mod.name + '/' + subpath] = {
      bare: target,
      default: mod.name + '/' + subpath
    }
  }
}

fs.writeFileSync('imports.json', JSON.stringify(imports, null, 2) + '\n')
