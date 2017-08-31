<template>
    <li class="step-li">
        <i class="icon-font" :class="icon"/>
        <h4 v-html="title"/>
        <p v-html="description"/>
    </li>
</template>
<script type="text/babel">
    import '../../less/step.less'
    export default {
        props: {
            title      : '',
            icon       : '',
            description: ''
        }
    }
</script>