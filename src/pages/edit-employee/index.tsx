import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEditEmployeeMutation, useGetEmployeeQuery } from '../../app/services/employees';
import Layout from '../../components/layout';
import { Row } from 'antd';
import { EmployeeForm } from '../../components/employee-from';
import { Employee } from '@prisma/client';
import { Paths } from '../../paths';
import { isErrorWithMessage } from '../../utils/is-error-with-message';

export const EditEmployee = () => {
    const navigate = useNavigate();
    const params = useParams<{id: string}>();
    const [error, setError] = useState("");
    const {data, isLoading} = useGetEmployeeQuery(params.id || '')
    const [editEmployee] = useEditEmployeeMutation();

    const employeeData = data;

    if(isLoading){
        return <span>Loading...</span>
    }

    const handleEditEmployee = async (employee: Employee) => {
        try {
            const editedEmployee = {
                ...employeeData,
                ...employee
            }

            await editEmployee(editedEmployee).unwrap();
            navigate(`${Paths.status}/updated`)
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
            <Row align='middle' justify='center'>
                <EmployeeForm
                    title='Edit employee'
                    btnText='Edit'
                    error={error}
                    employee={data}
                    onFinish={handleEditEmployee}
                ></EmployeeForm>
            </Row>
        </Layout>
    )
}
