import React, { useState } from 'react'
import { Layout, Menu, theme } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'

const { Header, Content, Footer } = Layout
const items = [
  {
    key: '/',
    label: 'Home'
  },
  {
    key: '/cafe',
    label: 'Café Management'
  },
  {
    key: '/employee',
    label: 'Employee Management'
  },
]

const LayoutCom = ({ children }) => {
  let navigate = useNavigate()
  let location = useLocation()

  const [selectedKeys, setSelectedKeys] = useState([location.pathname])

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const handleSelect = ({ key }) => {
    navigate(key, { state: { cafeName: ""} });
    setSelectedKeys([key])
  }

  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={selectedKeys[0]}
          selectedKeys={selectedKeys[0]}
          onSelect={handleSelect}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      <Content
        style={{
          padding: '0 48px',
        }}
      >
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
          className='main'
        >
          {children}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default LayoutCom