import React, { useState } from 'react'
import Layout from '../../components/layout'
import { Card, Form, Row, Space, Typography } from 'antd'
import { CustomInput } from '../../components/custom-input'
import { PasswordInput } from '../../components/password-input'
import { CustomButton } from '../../components/custom-button'
import { Link, useNavigate } from 'react-router-dom'
import { Paths } from '../../paths'
import { useRegisterMutation } from '../../app/services/auth'
import { User } from '@prisma/client'
import { isErrorWithMessage } from '../../utils/is-error-with-message'
import { ErrorMessage } from '../../components/error-message'

type RegisterData = Omit<User, 'id'> & {confirmPassword: string}

export const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("")
  const [registerUser] = useRegisterMutation();

  const handleRegistration = async (data: RegisterData) => {
    try {
      await registerUser(data).unwrap();
      navigate('/')
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
          <Card title='Registration' style={{width: '30rem'}}>
            <Form onFinish={handleRegistration}>
              <CustomInput name='name' placeholder='Name'/>
              <CustomInput name='email' placeholder='Email'/>
              <PasswordInput name='password' placeholder='Password'/>
              <PasswordInput name='confirmPassword' placeholder='Confirm Password'/>
              <CustomButton type='primary' htmlType='submit'>Register</CustomButton>
            </Form>
            <Space direction='vertical' size='large'>
              <Typography>
                Already have an account? <Link to={Paths.login}>Log in.</Link>
              </Typography>
            </Space>
            <ErrorMessage message={error}/>
          </Card>
      </Row>
    </Layout>
  )
}
