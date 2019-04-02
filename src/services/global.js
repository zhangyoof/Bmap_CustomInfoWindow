import request from '@/utils/request';

const baseUrl = 'http://10.0.7.83:8080/baseservice';
/**
 * 获取菜单树形数据
 */
export const getMenuTreeList =  params=>{
  	return request('get', `${baseUrl}/base/menu/getTreeList`, params)
}

/**
 * 获取部门列表
 */
export const getOrgList =  params=>{
  	return request('get', `${baseUrl}/org/getList`, params)
}


