<template>
    <v-page :options="options">
        <ul class="step-ul">
            <v-step v-for="(step,idx) in steps"
                    :class="step.className"
                    :title="step.title || ('步骤'+idx)"
                    :key="idx"
                    description="描述信息"
                    :icon="step.icon"/>
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
                steps  : [
                    {className: 'success', title: '08月29日', icon: ''},
                    {className: '', title: '08月30日', icon: ''},
                    {className: '', title: '08月31日', icon: ''},
                    {className: '', title: '09月01日', icon: ''},
                ]
            }
        }
    }
</script>