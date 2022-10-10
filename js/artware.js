/* global */
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

    // keep track of app specific event listeners
    this.events = {
      'tools-select': [],
      'filter-ran': [],
      'function-ran': []
    }

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
      this.setupMenu(opts.menu)
      this.loadModules(data)
      this.createCanvas()
    })

    // resize canvas when window is resized
    window.addEventListener('resize', () => {
      this.resizeCanvas()
    })
  }

  // ----------------------
  // event listener system
  // ----------------------
  on (event, func) {
    this.events[event].push(func)
  }

  remove (event, func) {
    const idx = this.events[event].indexOf(func)
    this.events[event].splice(idx, 1)
  }

  // ----------------------
  // app utils
  // ----------------------

  getState (str) {
    const s = str.split('.')
    return window[s[0]][s[1]].state
  }

  getSelectedTool () {
    if (!this.ele.tools) return
    const ele = this.ele.tools.querySelector('.selected')
    if (!ele) return
    return { ele, tool: window.tools[ele.title] }
  }

  // ----------------------
  // module loaders
  // ----------------------

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
    data.tools.forEach((t, i) => this.loadTool(t, i))
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
  // •.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.• Canvas Methods
  // •.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*

  createCanvas (main) {
    main = main || this.ele.main
    if (!main) return
    // setup main mousemove listener (for handling tool state)
    main.addEventListener('mousemove', (e) => {
      const s = this.getSelectedTool()
      if (s) main.state = s.tool.state
      else {
        main.state = {
          selected: false,
          mousePressed: false
        }
      }
    })
    // create canvas
    const style = window.getComputedStyle(main)
    const height = parseFloat(style.getPropertyValue('height')) || main.offsetHeight
    const width = parseFloat(style.getPropertyValue('width')) || main.offsetWidth
    this.canvas = document.createElement('canvas')
    this.canvas.width = width
    this.canvas.height = height
    this.ctx = this.canvas.getContext('2d')
    main.appendChild(this.canvas)
    return { canvas: this.canvas, ctx: this.ctx }
  }

  ctxSave () {
    const ctx = this.ctx
    this._stack = []
    const state = {}
    for (const property in ctx) {
      if (property === 'canvas') { continue }
      if (typeof ctx[property] === 'function') { continue }
      state[property] = ctx[property]
    }
    this._stack.push(state)
  }

  ctxRestore () {
    const state = this._stack.pop() || {}
    for (const property in state) {
      this.ctx[property] = state[property]
    }
  }

  resizeCanvas (width, height, main) {
    main = main || this.ele.main
    const style = window.getComputedStyle(main)
    const h = parseFloat(style.getPropertyValue('height')) || main.offsetHeight
    const w = parseFloat(style.getPropertyValue('width')) || main.offsetWidth
    width = width || w
    height = height || h
    // create canvas copy
    const copy = document.createElement('canvas')
    copy.width = this.canvas.width
    copy.height = this.canvas.height
    const ctxCopy = copy.getContext('2d')
    ctxCopy.drawImage(this.canvas, 0, 0)
    // save context
    this.ctxSave()
    // scale and draw copy back onto canvas
    this.canvas.width = this.width = width
    this.canvas.height = this.height = height
    this.ctx.drawImage(copy, 0, 0, width, height)
    // restore context
    this.ctxRestore()
    copy.remove()
  }

  eventToMouse (e) {
    const offset = this.canvas.getBoundingClientRect()
    return {
      x: e.clientX - offset.x,
      y: e.clientY - offset.y
    }
  }

  // •.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*
  // •.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*
  // •.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.• Tool Bar Methods
  // •.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*

  loadTool (name, i) {
    // load the tools JS file into a new `<script>` tag
    const script = document.createElement('script')
    script.onload = () => {
      const tool = window.tools[name]
      // when the file loads, create listeners for it's events
      const evs = tool.events
      for (const e in evs) {
        if (this.ele.main) {
          this.ele.main.addEventListener(e, (o) => evs[e](o, tool))
        } else {
          window.addEventListener(e, (o) => evs[e](o, tool))
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
      // select first tool by default
      if (i === 0) img.click()
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
    [...this.ele.tools.children].forEach(img => {
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

    this.events['tools-select'].forEach((f) => f(tool))
  }

  // •.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*
  // •.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*
  // •.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*• Menu Methods
  // •.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*

  setupMenu (menu) {
    // if we don't define a menu's array in the constructor, then skip this
    if (!menu) return
    // if we dont't have an element to put the menu in, then skip this
    if (!this.ele.menu) return

    // ...otherwise, let's go ahead and create the menu
    this.menu = {}
    menu.forEach(item => { this.menu[item] = null })

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
      subMenu.style.position = 'fixed'
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
      const menu = appModule.menu || type
      this.moduleLoaded(type, name, () => this.addMenuItem(menu, appModule))
    }
    script.src = `/js/${type}/${name}.js`
    document.body.appendChild(script)
  }

  addMenuItem (menu, item) {
    menu = menu.replace(/^\w/, c => c.toUpperCase()) // capitalize
    // if we dont't have an element to put the menu item in, then skip this
    if (!this.ele.menu) return
    // ...otherwise, let's go ahead and create the menu item
    menu = menu.charAt(0).toUpperCase() + menu.slice(1)
    const subMenu = this.ele.menu.querySelector(`.sub-menu[name=${menu}]`)
    if (!subMenu) console.error(`Artware: the "${menu}" menu item was not declared in the app's constructor`)
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
