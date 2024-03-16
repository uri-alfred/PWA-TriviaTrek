import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Button, Image, Layout, Menu, Space, theme } from 'antd';
import { useNotifi } from '../../context/notificacionesContext';


const { Header, Content } = Layout;

const items = [
    { key: '1', label: 'Home', path: '/' },
    { key: '2', label: 'Quiz', path: '/playQuiz' },
    { key: '3', label: 'Login', path: '/inicioSession' },
    { key: '4', label: 'Registro', path: '/registro' },
];


export default function MainLayout() {

    const { openNotification } = useNotifi();

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <>
            <Header style={{ display: 'flex', alignItems: 'center', background: '#FF9110' }}>
                <div className="demo-logo" />
                <Image width={50} src='Logo.png' preview={false} />
                <Menu
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{ flex: 1, minWidth: 0, background: '#FF9110' }}
                >
                    {items.map(item => (
                        <Menu.Item key={item.key}>
                            <Link to={item.path}>{item.label}</Link>
                        </Menu.Item>
                    ))}
                </Menu>
                <Space>
                <Button type="primary" onClick={openNotification}>
                    Notificaciones
                </Button>
                <Button type="primary">
                    Cerrar sesión
                </Button>
                </Space>
            </Header>
            <Content style={{ padding: '0 48px' }}>
                {/* <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb> */}
                <div
                    style={{
                        background: colorBgContainer,
                        minHeight: 800,
                        padding: 24,
                        borderRadius: borderRadiusLG,
                        margin: '16px 0',
                    }}
                >
                    <Outlet />
                </div>
            </Content>

        </>
    )
}
