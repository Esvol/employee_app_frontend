import React, { useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useGetEmployeeQuery, useRemoveEmployeeMutation } from '../../app/services/employees';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';
import Layout from '../../components/layout';
import { Descriptions, Divider, Modal, Space } from 'antd';
import { CustomButton } from '../../components/custom-button';
import { Paths } from '../../paths';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ErrorMessage } from '../../components/error-message';
import { isErrorWithMessage } from '../../utils/is-error-with-message';

export const Employee = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const params = useParams<{id: string}>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {data, isLoading} = useGetEmployeeQuery(params.id || "");
  const [removeEmployee] = useRemoveEmployeeMutation();
  const user = useSelector(selectUser);

  console.log(isModalOpen);
  
  if (isLoading){
    return <span>Loading...</span>
  }

  if(!data){
    return <Navigate to='/'/>
  }

  const handleDeleteModal = async () => {
    setIsModalOpen(false);
    try {
        await removeEmployee(data.id).unwrap();
        navigate(`${Paths.status}/deleted`)
    } catch (error) {
        const maybeError = isErrorWithMessage(error);
        if(maybeError){
            setError(error.data.message)
        } else {
            setError('Unknown error')
        }
    }
  }

  return (
    <Layout>
        <Descriptions title='Information about employee' bordered={true}>
            <Descriptions.Item label='Name' span={3}>
                { `${data.firstName} ${data.lastName}`}
            </Descriptions.Item>

            <Descriptions.Item label='Age' span={3}>
                {data.age}
            </Descriptions.Item>

            <Descriptions.Item label='Adress' span={3}>
                {data.address}
            </Descriptions.Item>
        </Descriptions>

        {
            user?.id === data.userId && (
                <>
                    <Divider orientation='left'>Actions</Divider>
                    <Space>
                        <Link to={`${Paths.employeeEdit}/${data.id}`}>
                            <CustomButton
                                shape='round'
                                type='default'
                                icon={<EditOutlined/>}
                            >
                                Edit
                            </CustomButton>
                        </Link>
                        <CustomButton
                            shape='round'
                            danger
                            onClick={() => setIsModalOpen(true)}
                            icon={<DeleteOutlined/>}
                        >
                            Delete
                        </CustomButton>
                    </Space>
                </>
            ) 
        }
        <ErrorMessage message={error}/>
            <Modal 
                title='Confirm and delete'
                open={isModalOpen}
                onOk={handleDeleteModal}
                onCancel={() => setIsModalOpen(false)}
                okText='Confirm'
                cancelText='Cancel'
            >
                You really want to delete employee from the table.
            </Modal>
        
    </Layout>
  )
}
