import { $keyboard } from '../../components/keyboard'

export default {
    methods: {
        keyboard(type, isNine, maxLen, that, closefn){
            $keyboard[type](isNine, char => {
                this.input(that || this, char, maxLen) === false && closefn && closefn()
            });
        },
        input(that, char, maxLen){
            let value = (that.value || '').split('');
            switch (char) {
                case 'back':
                    value.splice(-1);
                    break;
                case '确定':
                    $keyboard.hide();
                case false:
                    return !!char;
                case 'space':
                    value.push(' ');
                    break;
                case '&amp;':
                    value.push('&');
                    break;
                case '&lt;':
                    value.push('<');
                    break;
                case '&gt;':
                    value.push('>');
                    break;
                default:
                    value.push(char);
            }
            if (maxLen != null) {
                //value.length >= maxLen && $keyboard.hide();//收起键盘
                value.length > maxLen && value.splice(maxLen);
            }
            that.value = value.join('');
        }
    }
}