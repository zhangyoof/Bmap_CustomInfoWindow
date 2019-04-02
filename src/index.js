//  import dva from 'dva';
//  import { browserHistory } from 'dva/router';
//  import createLoading from 'dva-loading';
//  import './index.less';
//  import commonConfig from './config/common/commonConfig';
//  import * as commonFunction from './utils/commonFunction';
//  window.onload = function(){
//    /**
//     * 在message事件后启动
//     */
//   window.addEventListener('message', function(e){

//      /**
//       * 如果数据源不是来自父级窗口，则不启动
//       * 因为父级可能会在iframe激活的状态下需要继续派发信息，为了防止iframe重启 ，需要添加isAuth参数作为判断是否是初始化
//       */
//      if(e.source != window.parent || !e.data.isAuth){
//        return;
//      }

//      /**
//       * 全局变量保存token和userInfo，以便global model能获取到并保存
//       */
//      window.__TOKEN___ = !!e.data.token && e.data.token || '';
//      window.__USERINFO__ = !!e.data.userInfo && e.data.userInfo || {};
//      window.__ROUTE_LIMIT_URL__ = commonConfig.ROUTE_LIMIT_URL;

//     /**
//       * 当前路由id，用来获取当前角色的按钮列表
//       */
//      window.__CURRENT_ROUTE_ID__ = !!e.data.currentRouteid && e.data.currentRouteid || '';
//      //引入第三方js扩展
//      commonFunction.extendScript(commonConfig.EXTEND_SCRIPT);

//      // 1. Initialize
//      window.app = dva({
//        history:browserHistory
//      });

//      // 2. Plugins
//      window.app.use(createLoading({
//        effects:true,
//        global:true
//      }));

//      // 3. Model(这里必须加载全局model)
//      window.app.model(require('./models/global'));
//      //app.model(require('./models/contractItem/contractItem'));

//      // 4. Router
//      window.app.router(require('./router'));

//      // 5. Start
//      window.app.start('#root');
//    });
//  }



import dva from 'dva';
import { browserHistory } from 'dva/router';
import createLoading from 'dva-loading';
import './index.less';

// 1. Initialize
const app = dva({
 history:browserHistory
});

// 2. Plugins
app.use(createLoading());

// 3. Model
//app.model(require('./models/users/users'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');

