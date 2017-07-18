<template>
    <div class="scroll-wrapper">
        <div className="scroll-body">
            <slot/>
        </div>
    </div>
</template>
<script type="text/babel">
    //require mui-scroll.js
    export default {
        props  : {
            options : {
                default: {}
            },
            pullDown: {
                type: Function
            },
            pullUp  : {
                type: Function
            }
        },
        mounted(){
            let el       = this.$el;
            this._scroll = new IScroll(el, this.options || {});
        },
        methods: {
            initEvent(detach) {
                let scroll = this._scroll, _detach = !!detach;
                scroll.toggleEvent('drag', this.drag, _detach);
                scroll.toggleEvent('touchend', this.dragEnd, _detach);
            },
            drag(that) {

            },
            dragEnd(that) {

            }
        }
    }
</script>