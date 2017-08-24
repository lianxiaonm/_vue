<template>
    <div class="filter-body" :class="[ typeClass ]">
        <v-filter v-for="(filter,idx) in list"
                  v-model="select[idx]"
                  :key="idx"
                  :list="filter"
                  :change="_commit.bind(this,idx)"/>
    </div>
</template>
<script type="text/babel">
    import filterMixins from '../mixins/filter'
    export default {
        mixins: [filterMixins],
    }
</script>