import Components from './components';
import {installFactory} from './utils';

export {CBadge} from './components/badge';
export {CBtn} from './components/button';
export {CCard, CCardSection} from './components/card';
export {CChip} from './components/chip';
export {CCollapse} from './components/collapse';
export {CContextPopup} from './components/context-popup';
export {CDivider} from './components/divider';
export {CForm} from './components/form';
export {CCheckbox} from './components/form-checkbox';
export {CFormField} from './components/form-field';
export {CRadio} from './components/form-radio';
export {CFormRow} from './components/form-row';
export {CSelect} from './components/form-select';
export {CSwitch} from './components/form-switch';
export {CTextArea} from './components/form-text-area';
export {CTextInput} from './components/form-text-input';
export {CGridCol, CGridContainer, CGridRow} from './components/grid';
export {CIcon} from './components/icon';
export {CIconBtn} from './components/icon-button';
export {CList, CListItem} from './components/list';
export {CLoading, CLoadingOverlay} from './components/loading';
export {CModal} from './components/modal';
export {CPagination} from './components/pagination';
export {CScrollView} from './components/scroll-view';
export {CStackItem, CStackGroup} from './components/stack';
export {CTable} from './components/table';

export default installFactory({
    components: Components
})