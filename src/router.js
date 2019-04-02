import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'dva/router';

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model);
  }
};

const RouterConfig = ({ history, app }) => {
  const routes = [
    {
      path: '/',
      name: 'Test',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./routes/Test'));
        });
      },
    },
    {
      path: '/map',
      name: 'IndexPage',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/bmapGeo'));
          cb(null, require('./routes/IndexPage'));
        });
      },
    },
    {
      path: '/video',
      name: 'video',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/videoUpload'));
          cb(null, require('./routes/VideoTest'));
        });
      },
    },
  ];
  return <Router history={history} routes={routes} />;
};

RouterConfig.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
};

export default RouterConfig;
