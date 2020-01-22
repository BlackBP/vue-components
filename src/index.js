import Components from './components';
import {installFactory} from './install';

// Components
export {CBadge} from './components/badge';
export {CBtn} from './components/button';
export {CCard, CCardSection} from './components/card';
export {CChip} from './components/chip';
export {CCollapse, CCollapseTransition} from './components/collapse';
export {CDivider} from './components/divider';
export {CForm} from './components/form';
export {CCheckbox} from './components/form-checkbox';
export {CFormField} from './components/form-field';
export {CRadio} from './components/form-radio';
export {CSelect} from './components/form-select';
export {CSwitch} from './components/form-switch';
export {CTextInput} from './components/form-text-input';
export {CTextArea} from './components/form-text-area';
export {CCol, CContainer, CRow} from './components/grid';
export {CIcon} from './components/icon';
export {CIconBtn} from './components/icon-button';
export {CList, CListItem} from './components/list';
export {CLoading} from './components/loading';
export {CModal} from './components/modal';
export {COverlay} from './components/overlay';
export {CPagination} from './components/pagination';
export {CScrollView} from './components/scroll-view';
export {CStackItem, CStackGroup} from './components/stack-group';
export {CTable} from './components/table';

// Plugins
// export {AlertPlugin} from './plugins/alert';
export {NotificationPlugin} from './plugins/notification';

export default installFactory({
    components: Components
})