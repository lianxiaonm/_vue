<template>
    <v-modal v-model="showModal"
             :class="[ typeClass ]"
             class="filter-modal">
        <div class="filter-body"
             :class="[ typeClass ]">
            <v-filter v-for="(filter,idx) in list"
                      :key="idx"
                      :list="filter"
                      :change="_commit.bind(this,idx)"
                      v-model="select[idx]"/>
        </div>
    </v-modal>
</template>
<script type="text/babel">
    import filterMixins from '../mixins/filter'
    import _modal from '../mixins/modal'
    export default {
        mixins: [_modal, filterMixins],
    }
</script>