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
        <div className="head-right">
            <i v-for="r in right"
               :style="r.bgStyleTmpl"
               :class="{'icon':r.isOnlyImage}"
               @click="r.onClickHandler">{{r.OnlyTitle ? r.textValue : ''}}</i>
        </div>
    </header>
</template>
<script type="text/babel">
    import '../../less/header.less';
    import { valueFn, extend, isBrowser } from '../../service/common'
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
                    this.tabState    = title.type == "TitleWithTab" ? 'close' : '';
                    this.useH5Header = mandatoryUseH5Header;
                }
            }
        },
        methods: {
            _click(){
                var titleOp = this.title;
                if (titleOp.type == "TitleWithTab" && titleOp.onOpenHandler()) {
                    this.tabState = this.tabState == 'close' ? 'open' : 'close';
                }
            }
        }
    }

    let defaultOption = {
        title               : {
            type          : "TitleNormal",
            value         : isBrowser ? document.title : '',
            onOpenHandler : valueFn(true),
            onCloseHandler: valueFn(true)
        }, right            : [], left: {
            goBackHandler: function () {
                history.back();
            }, isShow    : true, hideClose: false
        }, dropToRefresh    : {},
        mandatoryUseH5Header: true, hideH5Header: false
    };
    function updateOption(option) {
        option   = extend({}, defaultOption, option || {});
        // 配置左侧按钮
        var left = option.left;
        if (left.isShow === false || left.isShow === 'hide') {
            left.show = left.closeShow = !1, left.isShow = 'hide';
        } else {
            left.show = !0, left.isShow = 'show';
        }
        // 配置中间 title 部分
        if (isBrowser) document.title = option.title.value;
        //配置右侧按钮
        var rights                         = option.right.slice(0, 2);
        option.right                       = rights.map(function (rb) {
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
        option.dropToRefresh.dropToRefresh = 'disable';
        return option;
    }
</script>