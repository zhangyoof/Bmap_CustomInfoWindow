import * as commonFunction from '@/utils/commonFunction';
import * as uploadService from '../services/uploadServices';

export default {
    namespace: 'videoUpload', // 构配件新增页
    state: {
        canVisibie:false,
        file:'',
    },
    reducers: {
        // 更新状态
        setState(state, { payload }) {
            return { ...state, ...payload };
        },
    },
    effects: {
        *showModal({ }, { call, put, select }) {
            debugger
            const canVisibie = yield select(state=>state.videoUpload.canVisibie)
            yield put({ type: 'setState', payload: { canVisibie: !canVisibie } })
        },
        *upload({payload:file} , { call, put, select }) {
            // const file = yield select(state=>state.videoUpload.file)
            debugger
            const res = yield call(uploadService.uploadVideo, { "file":file });
        }
    },
    subscriptions: {
        // setup({ dispatch, history }) {
        //     return history.listen(({ pathname, query }) => {
        //         if (pathname === '/map') {
        //             dispatch({ type: 'initData', payload: {} });
        //         }
        //     });
        // },
    }
};

// --------------------Auto_Service_Code_Start----------------
(() => {
    const MapService = {
        // getTspSiteList:null
        // onCancel: null,
        // onShow: null,
        // onLoadData: null,
        // toSave: null,
        // onChangeType: null,
    };
    exports.default.MapService = MapService;
    commonFunction.fillService(exports.default.namespace, MapService);
})();
// --------------------Auto_Service_Code_End ----------------