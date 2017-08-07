<template>
    <div class="tab-view _v1 inline-x">
        <v-scroll :options="options" class="tab-nav-v1">
            <span v-for="tab in tabs"
                  v-html="tab.label"
                  @tap="_click(tab.key)"
                  :class="{on:active[tab.key]}"/>
        </v-scroll>
        <div class="tab-body">
            <slot/>
        </div>
    </div>
</template>
<script type="text/babel">
    import '../../less/tabs.less'
    import vScroll from '../scroll/scroll.vue'
    import { makeMap } from '../../service/common'
    export default {
        components: {
            vScroll
        },
        props     : {
            defaultActive: '',
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
                            key  : props.keys || (self.tabs.length + '')
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