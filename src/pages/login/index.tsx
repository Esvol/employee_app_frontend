import React, { useState } from 'react'
import Layout from '../../components/layout'
import { Card, Form, Row, Space, Typography } from 'antd'
import { CustomInput } from '../../components/custom-input'
import { PasswordInput } from '../../components/password-input'
import { CustomButton } from '../../components/custom-button'
import { Link, useNavigate } from 'react-router-dom'
import { Paths } from '../../paths'
import { UserData, useLoginMutation } from '../../app/services/auth'
import { isErrorWithMessage } from '../../utils/is-error-with-message'
import { ErrorMessage } from '../../components/error-message'

export const Login = () => {
  const navigate = useNavigate();
  const [loginUser, loginUserResult] = useLoginMutation();
  const [error, setError] = useState('');

  const login = async (data: UserData) => {
    try {
      await loginUser(data).unwrap();
      navigate('/');
      
    } catch (error) {
      console.log(error);
      
      const maybeError = isErrorWithMessage(error)
      if (maybeError){
        setError(error.data.message)
      }
      else{
        setError('Unknown error.')
      }
    }
  }

  return (
    <Layout>
      <Row align='middle' justify='center'>
          <Card title='Login' style={{width: '30rem'}}>
            <Form onFinish={login}>
              <CustomInput name='email' type='email' placeholder='Email'/>
              <PasswordInput name='password' placeholder='Password'/>
              <CustomButton type='primary' htmlType='submit'>Log in</CustomButton>
            </Form>
            <Space direction='vertical' size='large'>
              <Typography>
                Don`t have an account yet? <Link to={Paths.register}>Register.</Link>
              </Typography>
              <ErrorMessage message={error}/>
            </Space>
          </Card>
      </Row>
    </Layout>
  )
}
