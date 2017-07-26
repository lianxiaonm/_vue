<template>
    <header class="vx-header" v-if="useH5Header">
        <div class="head-left">
            <i class="icon-font"
               v-if="left.show"
               @click="left.goBackHandler()">&#xe679;</i>
        </div>
        <h3 class="head-title"
            :class="tabState"
            @click="_click" v-html="title.value || '默认标题'"/>
        <div class="head-right">
            <i v-for="r in right"
               :style="r.bgStyleTmpl"
               :class="{'icon':r.isOnlyImage}"
               @click="r.onClickHandler">{{r.isOnlyTitle ? r.textValue : ''}}</i>
        </div>
    </header>
</template>
<script type="text/babel">
    import '../../less/header.less';
    import { valueFn, isBrowser } from '../../service/common'
    export default {
        props  : {
            options: {
                type: Object
            }
        },
        data(){
            let {left, title, right, mandatoryUseH5Header} = updateOption(this.options);
            return {
                left, title, right,
                tabState   : title.type == "TitleWithTab" ? 'close' : '',
                useH5Header: mandatoryUseH5Header
            }
        },
        watch  : {
            options: {
                deep: true,
                handler(val){
                    let {left, title, right, mandatoryUseH5Header} = updateOption(val);
                    this.left = left, this.title = title, this.right = right;
                    this.tabState    = title.type == "TitleWithTab" ? this.tabState || 'close' : '';
                    this.useH5Header = mandatoryUseH5Header;
                }
            }
        },
        methods: {
            _click(){
                var {title, tabState} = this;
                if (title.type == "TitleWithTab" && title[tabState == 'close' ?
                        'onOpenHandler' : 'onCloseHandler']()) {
                    this.tabState = tabState == 'close' ? 'open' : 'close';
                }
            }
        }
    }

    const defaultOption = {
        title               : {
            type          : "TitleNormal",
            value         : isBrowser ? document.title : '',
            onOpenHandler : valueFn(true),
            onCloseHandler: valueFn(true)
        },
        right               : [],
        left                : {
            goBackHandler: function () {
                history.back();
            },
            isShow       : true,
            hideClose    : false
        },
        dropToRefresh       : {},
        mandatoryUseH5Header: true,
        hideH5Header        : false
    };
    function updateOption(_opts = {}) {
        let left                 = Object.assign({}, defaultOption.left, _opts.left),            // 配置左侧按钮
            title                = Object.assign({}, defaultOption.title, _opts.title),
            right                = Object.assign([], defaultOption.right, _opts.right),
            mandatoryUseH5Header = _opts.mandatoryUseH5Header || defaultOption.mandatoryUseH5Header;

        if (left.isShow === false || left.isShow === 'hide') {
            left.show = left.closeShow = !1, left.isShow = 'hide';
        } else {
            left.show = !0, left.isShow = 'show';
        }
        // 配置中间 title 部分
        if (isBrowser) document.title = title.value;
        //配置右侧按钮
        right = right.slice(0, 2).map(function (rb) {
            if (rb.type == 'OnlyImage') {
                rb.isOnlyImage = true;
                rb.imageURL && (rb.bgStyleTmpl = 'background-image:url(\"' + rb.imageURL + '\");');
            } else if (rb.type == "OnlyTitle") {
                rb.isOnlyTitle = true;
            } else rb.isOnlyImage = true;
            if (typeof rb.onClickHandler !== 'function')
                rb.onClickHandler = valueFn(true);
            return rb;
        });
        return {
            left,
            title,
            right,
            mandatoryUseH5Header,
            dropToRefresh: {
                dropToRefresh: 'disable'
            }
        }
    }
</script>