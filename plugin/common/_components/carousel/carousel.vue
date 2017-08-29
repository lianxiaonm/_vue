<template>
    <div class="carousel-wrapper">
        <div class="carousel-body"
             ref="_body"
             @drag="_drag"
             @dragend="_dragEnd">
            <slot/>
        </div>
        <ol class="carousel-indicator"
            ref="_indicator">
            <li class="indicator"
                v-for="slot in $slots.default"/>
        </ol>
    </div>
</template>
<script type="text/babel">
    import '../../less/carousel.less'
    import carouselMixins from '../mixins/carousel'
    export default {
        mixins : [carouselMixins],
        created(){
            this.initialize();
        },
        watch  : {
            vStatus(){
            }
        },
        methods: {
            initialize(){
                this.vStatus = 0;
                this.$nextTick(() => this._tick());
            }
        }
    }
</script>