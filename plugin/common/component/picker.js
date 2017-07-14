import Vue from 'vue'
import picker from '../_component/picker/picker.vue'
import datePicker from '../_component/picker/datePicker.vue'
import linkagePicker from '../_component/picker/linkagePicker.vue'
import modalPicker from '../_component/picker/modalPicker.vue'

import { $modal } from './ionic-lite'

const components = [
    picker,
    datePicker,
    linkagePicker
];

components.forEach(component => {
    component.install = Vue => Vue.component(component.name, component);
});

export default picker

export {
    picker,
    datePicker,
    linkagePicker
}

const modalPickerConstructor = Vue.extend(modalPicker);

let pickerInstance;

export const $modalPicker = {
    show(options, type, call){
        if (!pickerInstance) {
            pickerInstance = new modalPickerConstructor();
        }
        $modal.show(pickerInstance, {options: options, select: [2, 4], type: type, click: call});
    },
    date(options, call){
        this.show(options, 'date', call)
    }
}
