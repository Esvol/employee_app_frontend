import React, { useEffect } from 'react'
import styles from './index.module.css'
import { Layout, Space, Typography } from 'antd'
import { LoginOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import { CustomButton } from '../custom-button'
import { Link, useNavigate } from 'react-router-dom'
import { Paths } from '../../paths'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectUser } from '../../features/auth/authSlice'

export const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUser)

    const onLogoutClick = () => {
        dispatch(logout());
        localStorage.removeItem('token')
        navigate('/login')
    }

  return (
    <Layout.Header className={styles.header}>
        <Space>
            <TeamOutlined className={styles.teamIcon}/>
            <Link to={Paths.home}>
            <CustomButton type='link'>
                <Typography.Title level={1}>
                    Employee
                </Typography.Title>
            </CustomButton>
            </Link>
        </Space>
        {
            user ? (
                <CustomButton type='link' icon={<LoginOutlined/>} onClick={onLogoutClick}>
                    Logout
                </CustomButton>
            ) : (
                <Space>
                    <Link to={Paths.register}>
                        <CustomButton type='default' icon={<UserOutlined/>}>Registration</CustomButton>
                    </Link>
                    <Link to={Paths.login}>
                        <CustomButton type='default' icon={<LoginOutlined/>}>Login</CustomButton>
                    </Link>
                </Space>
            )
        }
    </Layout.Header>
  )
}
