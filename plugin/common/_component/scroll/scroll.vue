<template>
    <div class="scroll-wrapper">
        <div class="scroll-body">
            <slot/>
        </div>
    </div>
</template>
<script type="text/babel">
    //require mui-scroll.js
    export default {
        props  : {
            options: ''
        },
        mounted(){
            let el       = this.$el;
            this._scroll = new IScroll(el, this.options || {});
        },
        methods: {}
    }
</script>