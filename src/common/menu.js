import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: '项目',
    icon: 'dashboard',
    path: 'project',
  },
  {
    name: '人才列表',
    icon: 'table',
    path: 'talent',
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
