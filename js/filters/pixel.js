window.filters.pixel = {
    name: 'pixel',
    run: function () {
        // Was originally bruteforcing the pixelation process with way too many loops, then saw an interesting approach 
        // Basically pixelating by scaling down the canvas then scaling back up  
        // Citation: https://stackoverflow.com/questions/19129644/how-to-pixelate-an-image-with-canvas-and-javascript

        // Choosing a pixelation factor 
        var w = C2D.width * 0.03
        var h = C2D.height * 0.03
        
        // Render image smaller
        C2D.ctx.drawImage(C2D.canvas, 0, 0, w, h)        

        // Change settings for rescaling so rescaling is not done smoothly (basically how pixel effect generated)
        C2D.ctx.msImageSmoothingEnabled = false
        C2D.ctx.mozImageSmoothingEnabled = false
        C2D.ctx.webkitImageSmoothingEnabled = false
        C2D.ctx.imageSmoothingEnabled = false

        // Rescaling back up
        C2D.ctx.drawImage(C2D.canvas, 0, 0, w, h, 0, 0, C2D.width, C2D.height)

        // Resetting settings to not impact other potential filters, tools, options
        C2D.ctx.msImageSmoothingEnabled = true
        C2D.ctx.mozImageSmoothingEnabled = true
        C2D.ctx.webkitImageSmoothingEnabled = true
        C2D.ctx.imageSmoothingEnabled = true
    }
  }