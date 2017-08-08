<template>
    <div class="carousel-wrapper">
        <div class="carousel-body"
             :class="{loop:isLoop}"
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
            items : [],
            click : {
                default: () => {}
            },
            isLoop: {
                default: false
            }
        },
        data(){
            this._start = false, this._init = false;
            this._locked = true;
            return {
                imgList   : [],
                indicators: [],
                itemWidth : 0,
                maxX      : 0,
                scrollX   : 0
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
        watch  : {
            items(){
                this._init = !(this._locked = true);
            },
            isLoop(){
                this._init = !(this._locked = true);
            }
        },
        methods: {
            indicatorClass(idx){
                let index = Math.abs(this.scrollX / this.itemWidth);
                return this.isLoop ? (idx + 1) == index : idx == index
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
                    this.scrollX   = this.isLoop ? -this.itemWidth : 0;
                    this._init     = !(this._locked = false);
                }
            },
            _click(item){
                this.click && this.click(Object.assign({}, item));
            },
            _drag(event){
                if (this._locked) return;
                var detail    = event.detail || {},
                    direction = detail.direction,
                    deltaX    = detail.deltaX || 0,
                    scrollX   = this.scrollX;
                if (direction == 'left' || direction == 'right') {
                    this.setTranslate(scrollX + (scrollX >= 0 ? direction == 'right' ?
                            deltaX / 4 : deltaX : scrollX <= this.maxX ?
                            direction == 'left' ? deltaX / 4 : deltaX : deltaX),
                        0);
                    this._start = true;
                }
                this._start && event.stopPropagation();
            },
            _dragEnd(event){
                if (this._locked) return;
                var detail    = event.detail || {},
                    direction = detail.direction,
                    deltaX    = Math.abs(detail.deltaX),
                    speed     = deltaX / detail.deltaTime,
                    itemWidth = this.itemWidth,
                    maxX      = this.maxX,
                    scrollX   = this.scrollX;
                deltaX        = (speed > .35 && deltaX * 4 > itemWidth) || deltaX * 2 > itemWidth ? direction == 'left' ? -itemWidth : itemWidth : 0;
                scrollX += deltaX, this._locked = true, this._start = false;
                this.setTranslate(scrollX = scrollX > 0 ? 0 : scrollX < maxX ? maxX : scrollX, 350);
                setTimeout(() => {
                    this.isLoop && this.setTranslate(scrollX = scrollX >= 0 ? maxX + itemWidth : scrollX <= maxX ? -itemWidth : scrollX, 0)
                    this._locked = false, this.scrollX = scrollX;
                }, 350);
            },
            setTranslate(x, time){
                let _body                            = this.$refs._body;
                _body.style.webkitTransitionDuration = (time || 0) + 'ms';
                _body.style.webkitTransform          = 'translateX(' + x + 'px)';
            }
        }
    }
</script>