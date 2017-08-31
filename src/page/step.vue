<template>
    <v-page :options="options">
        <ul class="step-ul">
            <v-step class="success" title="步骤一" description="描述信息"/>
            <v-step class="error" title="步骤二" description="描述信息"/>
            <v-step title="步骤三" description="描述信息"/>
            <v-step title="步骤四" description="描述信息"/>
        </ul>
    </v-page>
</template>
<script type="text/babel">
    import { vPage } from '../../plugin/common/components/page'
    import { vStep } from '../../plugin/common/components/step'
    export default {
        components: {
            vPage,
            vStep
        },
        data(){
            return {
                options: {
                    title: {
                        value: '步骤条'
                    }
                },
            }
        }
    }
</script>