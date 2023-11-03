import React, { useEffect } from 'react'
import Layout from '../../components/layout'
import { CustomButton } from '../../components/custom-button'
import { PlusCircleOutlined } from '@ant-design/icons'
import { Table } from 'antd'
import { useGetAllEmployeesQuery } from '../../app/services/employees'
import type { ColumnsType } from 'antd/es/table'
import { Employee } from '@prisma/client'
import { useNavigate } from 'react-router-dom'
import { Paths } from '../../paths'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/auth/authSlice'

const columns: ColumnsType<Employee> = [
    {
        title: 'Name',
        dataIndex: 'firstName',
        key: 'firstName',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
]


export const Employees = () => {
    const navigate = useNavigate();
    const user = useSelector(selectUser);

    const {data, isLoading} = useGetAllEmployeesQuery();
    
    useEffect(() => {
        if (!user){
            navigate('/login')
        }
    }, [navigate, user])
    
    return (
    <Layout>
        <CustomButton type='primary' onClick={() => navigate(Paths.employeeAdd)} icon={<PlusCircleOutlined/>}>
            Add
        </CustomButton>
        <Table
            loading={isLoading}
            dataSource={data}
            pagination={false}
            columns={columns}
            rowKey={(record) => record.id}
            onRow={(record) => {
                return {
                    onClick : () => navigate(`${Paths.employee}/${record.id}`)
                }
            }}
        />
    </Layout>
  )
}
