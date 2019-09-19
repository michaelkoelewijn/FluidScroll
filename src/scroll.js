/*
    Fluid scrolling based on stackoverflow Manuel Otto's answer
    https://stackoverflow.com/a/47206289
    Transformed to class by Michael Koelewijn @ pakt.digital
*/

export default class FluidScroll {
    
    constructor(options = {}) {
        this.target = this.getDocument()
        this.speed = options.speed || 60
        this.smoothing = options.smoothing || 12
        this.scroll = this.scroll.bind(this)
        this.update = this.update.bind(this)
    }

    init() {
        this.moving = false
        this.pos = this.target.scrollTop
        this.frame = this.getTarget()
        this.target.addEventListener('mousewheel', this.scroll, { passive: false })
	    this.target.addEventListener('DOMMouseScroll', this.scroll, { passive: false })
    }

    destroy() {
        this.target.removeEventListener('mousewheel', this.scroll)
        this.target.removeEventListener('DOMMouseScroll', this.scroll)
        cancelAnimationFrame(this.raf)
    }

    scroll(e) {
        e.preventDefault(); // disable default scrolling
        var delta = normalizeWheelDelta(e)
        this.pos += -delta * this.speed
        this.pos = Math.max(0, Math.min(this.pos, this.target.scrollHeight - this.frame.clientHeight)) // limit scrolling
        if (!this.moving) { 
            this.update() 
        }
    }

    update() {
        var delta = (this.pos - this.target.scrollTop) / this.smoothing
        this.target.scrollTop += delta
        this.moving = true
    
        if (Math.abs(delta) > 0.5) {
            this.raf = requestAnimationFrame(this.update)
        } else {
            this.moving = false
        }
    }

    getDocument() {
        return (document.scrollingElement 
            || document.documentElement 
            || document.body.parentNode 
            || document.body)
    }

    getTarget() {
        return this.target === document.body 
                && document.documentElement 
                ? document.documentElement 
                : this.target
    }

}

function normalizeWheelDelta(e){
    if(e.detail){
        if(e.wheelDelta)
            return e.wheelDelta/e.detail/40 * (e.detail>0 ? 1 : -1) // Opera
        else
            return -e.detail/3 // Firefox
    }else
        return e.wheelDelta/120 // IE,Safari,Chrome
}