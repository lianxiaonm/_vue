<template>
    <li class="item-list" :class="{on:isActive}">
        <div class="collapse-item-bar" @click="toggle" v-html="getTitle"/>
        <div class="collapse-item-wrap">
            <slot/>
        </div>
    </li>
</template>
<script type="text/babel">
    import '../../less/collapse.less'
    export default {
        props   : {
            title: {
                default: '默认标题'
            },
            icon : {
                default: 'icon-right'
            }
        },
        data(){
            return {
                isActive: false
            }
        },
        computed: {
            getTitle(){
                return `<i class="icon-font ${this.icon}"></i>${this.title}`;
            }
        },
        methods : {
            toggle(){
                this.isActive = !this.isActive;
            }
        }
    }
</script>