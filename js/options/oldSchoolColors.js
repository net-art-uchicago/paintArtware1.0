/* global C2D */
window.options.oldSchoolColors = {
  name: 'old-school colors',
  state: {
    colors: ['#000000', '#7a7a7a', '#7c000a', '#7a7920', '#007b1d', '#007a7a', '#000f78', '#7c0079', '#7a7b42', '#003c3c', '#007efa', '#003e79', '#3b24f9', '#7b3913', '#ffffff', '#bbbbbb', '#ff001e', '#fffd43', '#00ff3d', '#00fffe', '#0025f8', '#ff00fa', '#fffe85', '#00ff83', '#75fffe', '#7a7dfa', '#ff007b', '#ff7446'],
    selected: 'fillStyle'
  },
  run: function () {
    const div = document.createElement('div')
    div.innerHTML = `
      <style>
        .old-sch-clr {
          display: flex;
        }

        .old-sch-clr__styles {
          background-image:
            linear-gradient(45deg, #ccc 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #ccc 75%),
            linear-gradient(45deg, transparent 75%, #ccc 75%),
            linear-gradient(45deg, #ccc 25%, #fff 25%);
          background-size:10px 10px;
          background-position:0 0, 0 0, -5px -5px, 5px 5px;
          width: 84px;
          height: 84px;
          border: 4px inset black;
        }

        .old-sch-clr__fillStyle,
        .old-sch-clr__strokeStyle {
          width: 32px;
          height: 32px;
          position: relative;
          outline: 2px solid #888;
          cursor: pointer;
          border: 2px inset black;
          outline-offset: 0px;
        }

        .old-sch-clr__fillStyle {
          background-color: ${C2D.ctx.fillStyle};
          transform: translate(10px, 10px);
          z-index: 1;
        }

        .old-sch-clr__strokeStyle {
          background-color: ${C2D.ctx.strokeStyle};
          transform: translate(34px, 3px);
        }

        .old-sch-clr__swatches {
          max-width: 566px;
        }

        .old-sch-clr__swatch {
          display: inline-block;
          width: 32px;
          height: 32px;
          outline: 4px inset black;
          cursor: pointer;
          margin: 4px;
        }
      </style>

      <div class="old-sch-clr">
        <div class="old-sch-clr__styles">
          <div class="old-sch-clr__fillStyle"></div>
          <div class="old-sch-clr__strokeStyle"></div>
        </div>
        <div class="old-sch-clr__swatches">
          <!-- color swatches goes here -->
        </div>
      </div>
    `
    const fs = div.querySelector('.old-sch-clr__fillStyle')
    const ss = div.querySelector('.old-sch-clr__strokeStyle')

    fs.addEventListener('click', () => {
      fs.style.zIndex = 1
      ss.style.zIndex = 0
      window.options.oldSchoolColors.state.selected = 'fillStyle'
    })

    ss.addEventListener('click', () => {
      fs.style.zIndex = 0
      ss.style.zIndex = 1
      window.options.oldSchoolColors.state.selected = 'strokeStyle'
    })

    const colors = window.options.oldSchoolColors.state.colors
    const swatches = div.querySelector('.old-sch-clr__swatches')
    colors.forEach(color => {
      const swatch = document.createElement('span')
      swatch.className = 'old-sch-clr__swatch'
      swatch.style.backgroundColor = color
      swatch.addEventListener('click', () => {
        const type = window.options.oldSchoolColors.state.selected
        if (type === 'fillStyle') {
          fs.style.background = color
          C2D.ctx.fillStyle = color
        } else if (type === 'strokeStyle') {
          ss.style.background = color
          C2D.ctx.strokeStyle = color
        }
      })
      swatches.appendChild(swatch)
    })

    return div
  }
}
