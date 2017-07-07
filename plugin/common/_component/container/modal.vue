<template>
    <div class="model-container"
         :class="[ typeClass ]"
         @click="click">
        <slot/>
    </div>
</template>
<script type="text/babel">
    import '../../less/ionic.less'
    import container from '../mixins/container'
    export default {
        mixins: [container],
        props: {
            position: {
                type: String,
            }
        },
        methods: {
            click(event){
                let classList = event.target.classList;
                if (classList.contains('model-container')) {
                    this.value = false;
                }
                event.stopPropagation();
            }
        },
        computed: {
            typeClass(){
                return (this.show ? ['active'] : []).concat(this.position).join(' ');
            }
        }
    }
</script>