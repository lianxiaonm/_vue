<template>
    <page :options="options">

    </page>
</template>
<script type="text/babel">
    import page from '../../plugin/common/component/page'
    export default {
        components: {
            page
        },
        data (){
            return {
                options: {
                    title: {
                        value: '虚拟键盘'
                    }
                },
            }
        }
    }
</script>