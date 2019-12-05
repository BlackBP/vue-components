import Components from './components';
import {installFactory} from './install';

// Components
export * as CBadge from './components/badge/CBadge.vue';
export * as CBtn from './components/button/CBtn.vue';
export * as CCard from './components/card/CCard.vue';
export * as CCardSection from './components/card/CCardSection.vue';
export * as CChip from './components/chip/CChip.vue';
export * as CCollapse from './components/collapse/CCollapse.vue';
export * as CCollapseTransition from './components/collapse/CCollapseTransition.vue';
export * as CContextPopup from './components/context-popup/CContextPopup.vue';
export * as CDivider from './components/divider/CDivider.vue';
export * as CForm from './components/form/CForm.vue';
export * as CCheckbox from './components/form-checkbox/CCheckbox.vue';
export * as CFormField from './components/form-field/CFormField.vue';
export * as CRadio from './components/form-radio/CRadio.vue';
export * as CSelect from './components/form-select/CSelect.vue';
export * as CSwitch from './components/form-switch/CSwitch.vue';
export * as CTextInput from './components/form-text-input/CTextInput.vue';
export * as CGridContainer from './components/grid/CGridContainer.vue';
export * as CGridCol from './components/grid/CGridCol.vue';
export * as CGridRow from './components/grid/CGridRow.vue';
export * as CIcon from './components/icon/CIcon.vue';
export * as CIconBtn from './components/icon-button/CIconBtn.vue';
export * as CList from './components/list/CList.vue';
export * as CListItem from './components/list/CListItem.vue';
export * as CLoading from './components/loading/CLoading.vue';
export * as CLoadingOverlay from './components/loading/CLoadingOverlay.vue';
export * as CModal from './components/modal/CModal.vue';
export * as COverlay from './components/overlay/COverlay.vue';
export * as CPagination from './components/pagination/CPagination.vue';
export * as CScrollView from './components/scroll-view/CScrollView.vue';
export * as CServiceFormValidate from './components/service/CFormValidate.vue';
export * as CStackGroup from './components/stack-group/CStackGroup.vue';
export * as CStackItem from './components/stack-group/CStackItem.vue';
export * as CTable from './components/table/CTable.vue';

// Plugins
// export {AlertPlugin} from './plugins/alert';
export {NotificationPlugin} from './plugins/notification';

export default installFactory({
    components: Components
})