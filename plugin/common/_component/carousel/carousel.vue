<template>
    <div class="carousel-wrapper">
        <div class="carousel-body"
             ref="_body"
             @drag="_drag"
             @dragend="_dragEnd">
            <div class="carousel-item"
                 v-for="(img,idx) in imgList"
                 :key="idx"
                 @tap="_click(img)">
                <img :src="img.src"/>
            </div>
        </div>
        <ol class="carousel-indicator">
            <li class="indicator"
                v-for="(indicator,idx) in indicators"
                :class="{active:indicatorClass(idx)}"/>
        </ol>
    </div>
</template>
<script type="text/babel">
    import '../../less/carousel.less'
    export default {
        props  : {
            items : {
                default: []
            },
            click : '',
            isLoop: {
                default: false
            },
            auto  : {
                default: 0
            }
        },
        data(){
            this._timeout = this._init = false;
            return {
                imgList   : [],
                indicators: [],
                itemWidth : 0,
                maxX      : 0,
                scrollX   : 0,
                vStatus   : 0,  //当前状态。。0代表锁定状态。1代表滑动状态。2代表自由状态
            }
        },
        created(){
            this.initialize();
        },
        mounted(){
            this.initialize(true);
        },
        updated(){
            this._init || this.initialize(true);
        },
        beforeDestroy(){
            clearTimeout(this._timeout);
        },
        watch  : {
            items(){
                this._init = !(this.vStatus = 0);
            },
            isLoop(){
                this._init = !(this.vStatus = 0);
            },
            auto(){
                this.vStatus = 0, setTimeout(() => this.vStatus = 2, 16.7);
            },
            vStatus(val){
                clearTimeout(this._timeout);
                this._timeout = (val === 2 && this.auto) ? setTimeout(() => {
                    this.vStatus = 1;
                    this.scrollTo(this.scrollX - this.itemWidth, 350);
                }, ~~this.auto) : null;
            }
        },
        methods: {
            indicatorClass(idx){
                let index = Math.abs(this.scrollX / this.itemWidth);
                return this.isLoop ? (idx + 1) == index : idx == index;
            },
            initialize(isMounted){
                let items       = Object.assign([], this.items);
                this.imgList    = this.isLoop ? items.slice(-1).concat(items).concat(items.slice(0, 1)) : items;
                this.indicators = items.map(() => true);
                if (isMounted) {
                    let _body      = this.$refs._body,
                        children   = _body.children || [];
                    this.itemWidth = children[0].offsetWidth;
                    this.maxX      = (1 - children.length) * this.itemWidth;
                    this.scrollX   = this.scrollX || (this.isLoop ? -this.itemWidth : 0);
                    this._init     = !!(this.vStatus = 2);
                    this.scrollTo(this.scrollX, 0);
                }
            },
            _click(item){
                this.click && this.click(Object.assign({}, item));
            },
            _drag(event){
                if (this.vStatus === 0) return;
                var detail    = event.detail || {},
                    direction = detail.direction,
                    deltaX    = detail.deltaX || 0,
                    scrollX   = this.scrollX;
                if (direction == 'left' || direction == 'right') {
                    this.setTranslate(scrollX + (scrollX >= 0 ? direction == 'right' ?
                            deltaX / 4 : deltaX : scrollX <= this.maxX ?
                            direction == 'left' ? deltaX / 4 : deltaX : deltaX),
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
                time && setTimeout(() => {
                    this.isLoop && this.setTranslate(scrollX = scrollX >= 0 ? maxX + itemWidth :
                        scrollX <= maxX ? -itemWidth : scrollX, 0);
                    this.vStatus = 2, this.scrollX = scrollX;
                }, time)
            },
            setTranslate(x, time){
                let _body                            = this.$refs._body;
                _body.style.webkitTransitionDuration = (time || 0) + 'ms';
                _body.style.webkitTransform          = 'translate3d(' + x + 'px,0,0) translateZ(0)';
            }
        }
    }
</script>