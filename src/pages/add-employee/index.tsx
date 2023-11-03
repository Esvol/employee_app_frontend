import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout'
import { Row } from 'antd'
import { EmployeeForm } from '../../components/employee-from'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/auth/authSlice'
import { useAddEmployeeMutation } from '../../app/services/employees'
import { Paths } from '../../paths'
import { Employee } from '@prisma/client'
import { isErrorWithMessage } from '../../utils/is-error-with-message'

export const AddEmployee = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const user = useSelector(selectUser);
    const [addEmployee] = useAddEmployeeMutation();

    useEffect(() => {
        if(!user){
            navigate(Paths.login)
        }
    }, [navigate, user])

    const handleAddEmployee = async (data: Employee) => {
        try {
            await addEmployee(data).unwrap()
            
            navigate(`${Paths.status}/created`)
        } catch (error) {
            const maybeError = isErrorWithMessage(error)
            if (maybeError){
                setError(error.data.message)
            }
            else{
                setError("Unknown error.")
            }
        }
    }

  return (
    <Layout>
        <Row align='middle' justify='center'>
            <EmployeeForm 
                title='Add employee'
                btnText='Add'
                onFinish={handleAddEmployee}
                error={error}
            />
        </Row>
    </Layout>
  )
}
