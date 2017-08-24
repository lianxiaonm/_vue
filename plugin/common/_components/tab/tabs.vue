<template>
    <div class="tab-view" :class="{'inline-x':scrollType}">
        <v-scroll v-if="scrollType" :options="options" class="tab-nav-v1">
            <span v-for="tab in tabs"
                  v-html="tab.label"
                  @tap="_click(tab.key)"
                  :class="{on:active[tab.key]}"/>
        </v-scroll>
        <ul v-else class="tab-nav">
            <li v-for="tab in tabs"
                v-html="tab.label"
                @tap="_click(tab.key)"
                :class="{on:active[tab.key]}"/>
        </ul>
        <div class="tab-body">
            <slot/>
        </div>
    </div>
</template>
<script type="text/babel">
    import '../../less/tabs.less'
    import vScroll from '../scroll/scroll.vue'
    import { makeMap } from '../../services/common'
    export default {
        components: {
            vScroll
        },
        props     : {
            defaultActive: '',
            type         : '',
            change       : {
                default: () => {}
            }
        },
        data(){
            return {
                tabs   : [],
                active : makeMap(this.defaultActive || '', {}, true),
                options: {scrollY: false, scrollX: true}
            }
        },
        mounted(){
            this.structure();
        },
        computed  : {
            scrollType(){
                return this.type == 'scroll';
            }
        },
        watch     : {
            active(val){
                this.structure();
            }
        },
        methods   : {
            structure(){
                let self  = this,
                    slots = self.$slots.default || [];
                self.tabs = [];
                slots.forEach(({componentOptions}) => {
                    if (!componentOptions || componentOptions.tag != "v-tab-panel") return;
                    let props   = componentOptions.propsData,
                        _tabObj = {
                            label: props.label || '默认标题',
                            key  : props.name || (self.tabs.length + '')
                        }
                    self.tabs.push(_tabObj);
                    props.isActive = !!self.active[_tabObj.key]
                });
            },
            _click(index){
                this.active = makeMap(index || '', {}, true)
            }
        }
    }
</script>