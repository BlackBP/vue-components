import Vue from 'vue';
import VueScroll from 'vuescroll/dist/vuescroll-native'
import 'vuescroll/dist/vuescroll.css';

Vue.use(VueScroll, {
    ops: {
        rail: {
            background: '#c1c1c1',
            opacity: 0,
            /** Rail's size(Height/Width) , default -> 6px */
            size: '6px',
            /** Specify rail and bar's border-radius, or the border-radius of rail and bar will be equal to the rail's size. default -> false **/
            specifyBorderRadius: false,
            /** Rail the distance from the two ends of the X axis and Y axis. **/
            gutterOfEnds: '2px',
            /** Rail the distance from the side of container. **/
            gutterOfSide: '2px',
            /** Whether to keep rail show or not, default -> false, event content height is not enough */
            keepShow: false
        },
        bar: {
            /** Whether to show bar on scrolling, default -> true */
            onlyShowBarOnScroll: true,
            /** Whether to keep show or not, default -> false */
            keepShow: false,
            /** Bar's background , default -> #00a650 */
            background: '#F44336',
            /** Bar's opacity, default -> 1  */
            opacity: 1
        }
    }
});
