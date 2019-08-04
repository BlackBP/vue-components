import Badge from './components/Badge.vue'
import Btn from './components/Button.vue'
import Card from './components/Card.vue'
import CardSection from './components/CardSection.vue'
import Checkbox from './components/Checkbox.vue'
import Chip from './components/Chip.vue'
import Collapse from './components/Collapse.vue'
import Divider from './components/Divider.vue'
import FormField from './components/FormField.vue'
import FormRow from './components/FormRow.vue'
import GridCol from './components/GridCol.vue'
import GridContainer from './components/GridContainer.vue'
import GridRow from './components/GridRow.vue'
import Icon from './components/Icon.vue'
import IconBtn from './components/IconButton.vue'
import List from './components/List.vue'
import ListItem from './components/ListItem.vue'
import Loading from './components/Loading.vue'
import LoadingOverlay from './components/LoadingOverlay.vue'
import Modal from './components/Modal.vue'
import Pagination from './components/Pagination.vue'
import Radio from './components/Radio.vue'
import Select from './components/Select.vue'
import ServiceFormValidate from './components/ServiceFormValidate.vue'
import StackGroup from './components/StackGroup.vue'
import StackItem from './components/StackItem.vue'
import Switch from './components/Switch.vue'
import TextArea from './components/TextArea.vue'
import TextInput from './components/TextInput.vue'

const Components = {
    CBadge: Badge,
    CBtn: Btn,
    CCard: Card,
    CCardSection: CardSection,
    CCheckbox: Checkbox,
    CChip: Chip,
    CCollapse: Collapse,
    CDivider: Divider,
    CFormField: FormField,
    CFormRow: FormRow,
    CGridCol: GridCol,
    CGridContainer: GridContainer,
    CGridRow: GridRow,
    CIcon: Icon,
    CIconBtn: IconBtn,
    CList: List,
    CListItem: ListItem,
    CLoading: Loading,
    CLoadingOverlay: LoadingOverlay,
    CModal: Modal,
    CPagination: Pagination,
    CRadio: Radio,
    CSelect: Select,
    CServiceFormValidate: ServiceFormValidate,
    CStackGroup: StackGroup,
    CStackItem: StackItem,
    CSwitch: Switch,
    CTextArea: TextArea,
    CTextInput: TextInput,
};

export {
    Badge as CBadge,
    Btn as CBtn,
    Card as CCard,
    CardSection as CCardSection,
    Checkbox as CCheckbox,
    Chip as CChip,
    Collapse as CCollapse,
    Divider as CDivider,
    FormField as CFormField,
    FormRow as CFormRow,
    GridCol as CGridCol,
    GridContainer as CGridContainer,
    GridRow as CGridRow,
    Icon as CIcon,
    IconBtn as CIconBtn,
    List as CList,
    ListItem as CListItem,
    Loading as CLoading,
    LoadingOverlay as CLoadingOverlay,
    Modal as CModal,
    Pagination as CPagination,
    Radio as CRadio,
    Select as CSelect,
    ServiceFormValidate as CServiceFormValidate,
    StackGroup as CStackGroup,
    StackItem as CStackItem,
    Switch as CSwitch,
    TextArea as CTextArea,
    TextInput as CTextInput,
}

export default {
    install(Vue, options = {}) {

        Object.keys(Components).forEach(name => {
            Vue.component(name, Components[name]);
        });

        Vue.prototype.$bbpComponentsConfig = {...options};
    }
}
