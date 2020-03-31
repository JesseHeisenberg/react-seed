import React, { Component } from 'react';
import Icon from '@ant-design/icons';
import { Layout, Menu } from 'antd';

const { SubMenu } = Menu;
const { Sider } = Layout;
import './Menu.less';
import { Link, HashRouter as Router } from 'react-router-dom';
import menus from '../../routes/route-config';

class MenuCunstom extends Component<any>  {

  state = {
    openKeys: [menus[0].nickName] as any,
  };
  rootSubmenuKeys: any = menus.map(item => {
    if (item.children) {
      return item.nickName;
    }
  }).filter(item => {
    return item !== undefined;
  });
  onOpenChange(openKeys: any) {
    const latestOpenKey = openKeys.find((key: any) => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }
  render() {
    return (
      <Router>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            openKeys={this.state.openKeys}
            theme="dark"
            onOpenChange={this.onOpenChange.bind(this)}
            style={{ width: 200, height: '100%' }}
          >
            {
              menus.map(item => {
                if (item.children) {
                  return <SubMenu
                    className="menu-item"
                    key={item.nickName}
                    title={
                      <div className="column-center">
                        <Icon className="icon" component={item.icon} />
                        <span>{item.name}</span>
                      </div>
                    }
                  >
                    {
                      item.children.map(child => {
                        return <Menu.Item
                          className="menu-item"
                          key={child.nickName}>
                          <Link to={child.url}></Link>
                          <span>{child.name}</span>
                        </Menu.Item>
                      })
                    }
                  </SubMenu>
                } else if (!item.isHide) {
                  return <Menu.Item
                    className="menu-item"
                    key={item.nickName}>
                    <Link to={item.url}>
                      <Icon component={item.icon} />
                      <span >{item.name}</span>
                    </Link>
                  </Menu.Item>
                }
              })
            }
          </Menu>
        </Sider>
      </Router>
    );
  }
}
export default MenuCunstom;
