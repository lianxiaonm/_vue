import Vue from 'vue'
import picker from '../_components/picker/picker.vue'
import datePicker from '../_components/picker/datePicker.vue'
import linkagePicker from '../_components/picker/linkagePicker.vue'
import modalPicker from '../_components/picker/modalPicker.vue'

import { $modal } from './container'

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
