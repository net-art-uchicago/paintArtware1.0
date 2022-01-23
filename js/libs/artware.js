/* global C2D */
class Artware {
  constructor (opts) {
    // if dev forgot to pass settings, print error to console
    if (!opts || !opts.settings) {
      console.error('Artware: expecting an object with "settings" parameter')
    }

    // create global dictionary objects for our modules
    window.tools = {}
    window.filters = {}
    window.functions = {}
    window.options = {}

    // if dev past an "elements" object with selectors for specific
    // elements on the page to inject our modules into, create an
    // element dictionary object to store references to these elements
    this.ele = {}
    if (opts.elements) {
      for (const ele in opts.elements) {
        const sel = opts.elements[ele]
        this.ele[ele] = document.querySelector(sel)
      }
    }

    // when the page has loaded...
    window.addEventListener('load', async () => {
      // ...then fetch settings file, load all the modules && setup the app
      const res = await window.fetch(opts.settings)
      const data = await res.json()
      this.setupMenu()
      this.setupLayers(data)
      this.loadModules(data)
    })
  }

  loadModules (data) {
    this.loading = {
      order: data,
      loaded: [],
      length: data.tools.length +
        data.filters.length +
        data.functions.length +
        data.options.length
    }
    // load tool js file for each tool name in the settings file
    data.tools.forEach(t => this.loadTool(t))
    // load fitler js file for each fitler name in the settings file
    data.filters.forEach(f => this.loadMenuModule('filters', f))
    // load function js file for each function name in the settings file
    data.functions.forEach(f => this.loadMenuModule('functions', f))
    // load option js file for each option name in the settings file
    data.options.forEach(o => this.loadMenuModule('options', o))
  }

  moduleLoaded (type, name, callback) {
    // keeping track of which modules we've loaded when app opens
    this.loading.loaded.push({ type, name, callback })
    // helper function to retrieve specific module from loaded array
    const getObj = (t, n) => {
      return this.loading.loaded.filter(o => o.type === t && o.name === n)[0]
    }
    // once all the modules are loaded, run their callback functions
    // which will render their corresponding elements onto the page
    if (this.loading.loaded.length === this.loading.length) {
      const mods = ['tools', 'functions', 'options', 'filters']
      mods.forEach(m => {
        this.loading.order[m].forEach(n => getObj(m, n).callback())
      })
      // display first option module in the list be default
      this.displayOptionUI(this.loading.order.options[0])
    }
  }

  // •.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*
  // •.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*
  // •.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.• Tool Bar Methods
  // •.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*

  loadTool (name) {
    // load the tools JS file into a new `<script>` tag
    const script = document.createElement('script')
    script.onload = () => {
      const tool = window.tools[name]
      // when the file loads, create listeners for it's events
      const evs = tool.events
      for (const e in evs) {
        if (this.ele.main) {
          this.ele.main.addEventListener(e, evs[e])
        } else {
          window.addEventListener(e, evs[e])
        }
      }
      // then create icon for too bar
      const img = document.createElement('img')
      img.src = window.tools[name].icon
      img.title = name
      img.addEventListener('click', (e) => this.toolClick(e, tool))
      // let module loader know it's ready
      this.moduleLoaded('tools', name, () => {
        if (this.ele.tools) this.ele.tools.appendChild(img)
      })
    }
    script.src = `/js/tools/${name}.js`
    document.body.appendChild(script)
  }

  updateCursor (img) {
    // if we passed in an image path, make that the cursor
    // otherwise make cursor "null" (ie. reset it to default)
    const cursor = img ? `url(${img}), auto` : null
    // upate the appropriate element's cursor style
    if (this.ele.main) {
      this.ele.main.style.cursor = cursor
    } else {
      document.body.style.cursor = cursor
    }
  }

  toolClick (e, tool) {
    // remove the "selected" class from any previously selected tool
    this.ele.tools.childNodes.forEach(img => {
      img.classList.remove('selected')
    })
    // add selected class to the tool that was just clicked
    e.target.classList.add('selected')
    // set all of the tool's selected property to false
    for (const t in window.tools) {
      window.tools[t].state.selected = false
    }
    // set the tool that was just clicked to selected
    tool.state.selected = true
    // if the tool has a custom cursor icon, apply it
    this.updateCursor(tool.cursor)
  }

  // •.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*
  // •.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*
  // •.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*• Layer Methods
  // •.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*

  setupLayers (data) {
    this.layers = []
    // if we have a layers element, make that "main" drawing area element,
    // otherwise make the body the main drawing area element
    const main = this.ele.layers ? this.ele.main : document.body
    const canvas = this.createCanvas(main)
    // create initial layer
    this.createLayer({ name: 'layer 1', ele: canvas })
  }

  createCanvas (main) {
    main = main || this.ele.main
    let canvas
    // if we're using the canvas2d.js library, use that to create the canvas
    if (window.C2D) {
      const style = window.getComputedStyle(main)
      const height = parseFloat(style.getPropertyValue('height')) || main.offsetHeight
      const width = parseFloat(style.getPropertyValue('width')) || main.offsetWidth
      canvas = C2D.createCanvas(width, height).canvas
      canvas.remove()
      main.appendChild(canvas)
    } else {
      // otherwise create a regular canvas
      canvas = document.createElement('canvas')
      canvas.width = main.offsetWidth
      canvas.height = main.offsetHeight
    }
    return canvas
  }

  createLayer (layer) {
    this.layers.push(layer)

    if (this.ele.main) {
      layer.ele.style.position = 'absolute'
      layer.ele.style.top = '0'
      layer.ele.style.left = '0'
    }
    // if we dont' have an element to put the layers in, then skip the rest
    if (!this.ele.layers) return
    // ...otherwise create HTML layer selector element
    const div = document.createElement('div')
    const idx = this.layers.length - 1
    div.dataset.layer = idx
    div.addEventListener('click', () => this.selectLayer(layer, div))

    const check = document.createElement('input')
    check.setAttribute('type', 'checkbox')
    check.checked = true
    check.addEventListener('input', (e) => {
      if (check.checked) layer.ele.style.display = 'block'
      else layer.ele.style.display = 'none'
    })
    const name = document.createElement('input')
    name.setAttribute('type', 'text')
    name.value = layer.name
    name.addEventListener('input', (e) => {
      layer.name = name.value
    })

    div.appendChild(check)
    div.appendChild(name)
    this.ele.layers.appendChild(div)

    this.selectLayer(layer, div)
  }

  selectLayer (layer, row) {
    C2D.canvas = layer.ele
    C2D.ctx = layer.ele.getContext('2d')

    if (this.ele.layers) {
      this.ele.layers.childNodes.forEach(r => r.classList.remove('selected'))
      row.classList.add('selected')
    }
  }

  // •.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*
  // •.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*
  // •.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*• Menu Methods
  // •.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*

  setupMenu () {
    // if we dont't have an element to put the menu in, then skip this
    if (!this.ele.menu) return

    // ...otherwise, let's go ahead and create the menu
    this.menu = { File: null, Edit: null, Options: null, Filters: null }

    for (const item in this.menu) {
      // create the element for each menu item (File, Edit, etc)
      const menuItem = document.createElement('div')
      menuItem.className = 'menu-item'
      menuItem.textContent = item
      menuItem.addEventListener('click', () => {
        this.ele.menu.querySelectorAll('.sub-menu')
          .forEach(m => { m.style.display = 'none' })
        const box = menuItem.getBoundingClientRect()
        subMenu.style.left = box.x + 'px'
        subMenu.style.top = box.y + box.height + 'px'
        subMenu.style.display = 'block'
      })
      this.ele.menu.appendChild(menuItem)
      // create the drop-down-menu element for each item
      const subMenu = document.createElement('div')
      subMenu.className = 'sub-menu'
      subMenu.setAttribute('name', item)
      subMenu.style.position = 'absolute'
      subMenu.style.zIndex = 10
      subMenu.style.display = 'none'
      this.ele.menu.appendChild(subMenu)
    }

    // close any open sub-menus when we click elsewhere in the window
    window.addEventListener('click', (e) => {
      if (e.target.classList.contains('menu-item')) return
      this.ele.menu.querySelectorAll('.sub-menu')
        .forEach(m => { m.style.display = 'none' })
    })
  }

  loadMenuModule (type, name) {
    // load the module's JS file into a new `<script>` tag
    const script = document.createElement('script')
    script.onload = () => {
      const appModule = window[type][name]
      const menu = type === 'functions' ? appModule.type : type
      this.moduleLoaded(type, name, () => this.addMenuItem(menu, appModule))
    }
    script.src = `/js/${type}/${name}.js`
    document.body.appendChild(script)
  }

  addMenuItem (menu, item) {
    // if we dont't have an element to put the menu item in, then skip this
    if (!this.ele.menu) return
    // ...otherwise, let's go ahead and create the menu item
    menu = menu.charAt(0).toUpperCase() + menu.slice(1)
    const subMenu = this.ele.menu.querySelector(`.sub-menu[name=${menu}]`)
    const menuItem = document.createElement('div')
    menuItem.textContent = item.name
    if (menu === 'Options' && this.ele.options) {
      menuItem.onclick = () => this.displayOptionUI(item)
    } else {
      menuItem.onclick = item.run
    }
    subMenu.appendChild(menuItem)
  }

  displayOptionUI (opt) {
    // if we dont't have an element to put the option item in, then skip this
    if (!this.ele.options) return
    // otherwise clear current option UI && add display this one instead
    opt = typeof opt === 'string' ? window.options[opt] : opt
    const ele = opt.run()
    this.ele.options.innerHTML = ''
    this.ele.options.appendChild(ele)
  }
}

window.Artware = Artware
