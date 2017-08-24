/**
 * Created by h5 on 2017/8/11.
 */
export default {
    data(){
        this.maxX = this.scrollX = this.itemWidth = !!(this._timeout = false);
        return {
            itemList: [],   //带自动轮播
            vStatus : 0    //当前状态。。0代表锁定状态。1代表滑动状态。2代表自由状态
        }
    },
    beforeDestroy(){
        clearTimeout(this._timeout);
    },
    watch  : {
        vStatus(val){
            clearTimeout(this._timeout);
            this._timeout = (val === 2 && this.auto) ? setTimeout(() => {
                this.vStatus = 0;
                this.scrollTo(this.scrollX - this.itemWidth, 350);
            }, ~~this.auto) : null;
        }
    },
    methods: {
        _tick(){
            let _body      = this.$refs._body,
                children   = _body.children || [];
            this.itemWidth = children[0].offsetWidth;
            this.maxX      = (1 - children.length) * this.itemWidth;
            this.scrollX   = this.scrollX || (this.isLoop ? -this.itemWidth : 0);
            this.vStatus   = 2;
            this.scrollTo(this.scrollX, 0);
        },
        _drag(event){
            if (this.vStatus === 0) return;
            var detail    = event.detail || {},
                direction = detail.direction,
                deltaX    = detail.deltaX || 0,
                scrollX   = this.scrollX;
            if (direction == 'left' || direction == 'right') {
                this.setTranslate(scrollX + (scrollX >= 0 ? direction == 'right' ?
                        deltaX / 4 : deltaX : scrollX <= this.maxX ? direction == 'left' ?
                        deltaX / 4 : deltaX : deltaX),
                    0);
                this.vStatus = 1;
            }
            this.vStatus === 1 && event.stopPropagation();
        },
        _dragEnd(event){
            if (this.vStatus === 0) return;
            var detail    = event.detail || {},
                direction = detail.direction,
                deltaX    = Math.abs(detail.deltaX),
                speed     = deltaX / detail.deltaTime,
                itemWidth = this.itemWidth;
            deltaX        = (speed > .35 && deltaX * 4 > itemWidth) || deltaX * 2 > itemWidth ?
                direction == 'left' ? -itemWidth : itemWidth : 0;
            this.vStatus = 0, this.scrollTo(this.scrollX + deltaX, 350);
        },
        scrollTo(scrollX, time){
            let itemWidth = this.itemWidth,
                maxX      = this.maxX;
            this.setTranslate(scrollX = scrollX > 0 ? 0 : scrollX < maxX ? maxX : scrollX, time);
            time ? setTimeout(() => {
                this.isLoop && this.setTranslate(scrollX = scrollX >= 0 ?
                    maxX + itemWidth : scrollX <= maxX ? -itemWidth : scrollX, 0);
                this.vStatus = 2, this.scrollX = scrollX;
                this.indicatorClass();
            }, time) : this.indicatorClass();
        },
        setTranslate(x, time){
            let _body                            = this.$refs._body;
            _body.style.webkitTransitionDuration = (time || 0) + 'ms';
            _body.style.webkitTransform          = 'translate3d(' + x + 'px,0,0) translateZ(0)';
        },
        indicatorClass(){
            let index    = Math.abs(this.scrollX / this.itemWidth),
                children = this.$refs._indicator.children || [],
                addActive;
            for (var i = 0, ii = children.length; i < ii; i++) {
                addActive = this.isLoop ? i + 1 == index : i == index;
                children[i].classList[addActive ? 'add' : 'remove']('active');
            }
        }
    }
}