import { $keyboard } from '../../component/keyboard'

export default {
    methods: {
        keyboard(type, isNine, maxLen){
            $keyboard[type](isNine, char => this.input(this, char, maxLen));
        },
        input(that, char, maxLen){
            let value = (that.value || '').split('');
            switch (char) {
                case 'back':
                    value.splice(-1);
                    break;
                case '确定':
                    return $keyboard.hide();
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
                value.length >= maxLen && $keyboard.hide();
                value.length > maxLen && value.splice(maxLen);
            }
            that.value = value.join('');
        }
    }
}