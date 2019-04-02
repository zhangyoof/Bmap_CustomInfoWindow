import React from 'react';
import { connect } from 'dva';

import { MapService } from '../models/bmapGeo';

import  {BmapGeo}  from "../components/BmapGeo/index"

const IndexPage = (obj) => {
  const { location, dispatch, map  } = obj

  const mapProps = {
    tspSiteList: map.tspSiteList,
    roadData: map.roadData,
  }


  return (
    <BmapGeo {...mapProps}/>
  );
}

function mapStateToProps({ map }) {
  return { map };
}
export default connect(mapStateToProps)(IndexPage);
//export default Database;