import _ from 'lodash';
import DefaultConfig from './config';

// Components
import CBadge from './components/Badge.vue';
import CBtn from './components/Button.vue';
import CCard from './components/Card.vue';
import CCardSection from './components/CardSection.vue';
import CCheckbox from './components/Checkbox.vue';
import CChip from './components/Chip.vue';
import CCollapse from './components/Collapse.vue';
import CContextPopup from './components/ContextPopup.vue';
import CContextPopupItem from './components/ContextPopupItem.vue';
import CDivider from './components/Divider.vue';
import CForm from './components/Form.vue';
import CFormRow from './components/FormRow.vue';
import CGridCol from './components/GridCol.vue';
import CGridContainer from './components/GridContainer.vue';
import CGridRow from './components/GridRow.vue';
import CIcon from './components/Icon.vue';
import CIconBtn from './components/IconButton.vue';
import CList from './components/List.vue';
import CListItem from './components/ListItem.vue';
import CLoading from './components/Loading.vue';
import CLoadingOverlay from './components/LoadingOverlay.vue';
import CModal from './components/Modal.vue';
import CPagination from './components/Pagination.vue';
import CRadio from './components/Radio.vue';
import CScrollView from './components/ScrollView.vue';
import CSelect from './components/Select.vue';
import CServiceFormValidate from './components/ServiceFormValidate.vue';
import CStackGroup from './components/StackGroup.vue';
import CStackItem from './components/StackItem.vue';
import CSwitch from './components/Switch.vue';
import CTable from './components/Table.vue';
import CTextArea from './components/TextArea.vue';
import CTextInput from './components/TextInput.vue';

const Components = {
    CBadge,
    CBtn,
    CCard,
    CCardSection,
    CCheckbox,
    CChip,
    CCollapse,
    CContextPopup,
    CContextPopupItem,
    CDivider,
    CForm,
    CFormRow,
    CGridCol,
    CGridContainer,
    CGridRow,
    CIcon,
    CIconBtn,
    CList,
    CListItem,
    CLoading,
    CLoadingOverlay,
    CModal,
    CPagination,
    CRadio,
    CScrollView,
    CSelect,
    CServiceFormValidate,
    CStackGroup,
    CStackItem,
    CSwitch,
    CTable,
    CTextArea,
    CTextInput
};

export {
    CBadge,
    CBtn,
    CCard,
    CCardSection,
    CCheckbox,
    CChip,
    CCollapse,
    CContextPopup,
    CContextPopupItem,
    CDivider,
    CForm,
    CFormRow,
    CGridCol,
    CGridContainer,
    CGridRow,
    CIcon,
    CIconBtn,
    CList,
    CListItem,
    CLoading,
    CLoadingOverlay,
    CModal,
    CPagination,
    CRadio,
    CScrollView,
    CSelect,
    CServiceFormValidate,
    CStackGroup,
    CStackItem,
    CSwitch,
    CTable,
    CTextArea,
    CTextInput
}

export default {
    /**
     *
     * @param Vue
     * @param {Object} [options]
     * @param {Object} [options.loading]
     * @param {Object} [options.loading.spinner]
     * @param {Object} [options.textInput]
     * @param {Function} [options.textInput.onMount]
     * @param {Function} [options.textInput.onBeforeDestroy]
     */
    install(Vue, options = {}) {

        options = _.defaultsDeep(options, DefaultConfig);

        if(options.includeAll) {
            Object.keys(Components).forEach(name => {
                Vue.component(name, Components[name]);
            });
        }

        Vue.prototype.$componentsConfig = options;
    }
}
