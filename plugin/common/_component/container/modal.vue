<template>
    <div class="model-container"
         :class="[ typeClass ]"
         @tap="click">
        <slot/>
    </div>
</template>
<script type="text/babel">
    import '../../less/dialog.less'
    import container from '../mixins/container'
    export default {
        mixins  : [container],
        props   : {
            position: ''
        },
        methods : {
            click(event){
                let classList = event.target.classList;
                if (classList.contains('model-container'))
                    this._hide();
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