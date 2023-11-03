import { Form, Input } from 'antd'
import { NamePath } from 'antd/es/form/interface'
import React from 'react'

type Props = {
    name: string,
    placeholder: string,
    dependencies?: NamePath[]
}

export const PasswordInput = ({name, placeholder, dependencies}: Props) => {
  return (
    <Form.Item
    name={name}
    dependencies={dependencies}
    hasFeedback
    rules={[
        {
            required: true,
            message: 'Please confirm your password!'
        }, ({getFieldValue}) => ({validator(_, value) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
            
            if(name === 'confirmPassword'){
                if(!value || getFieldValue('password') === value){
                    return Promise.resolve();
                }
                return Promise.reject(new Error('The new password that you entered do not match!'))
            }else{
                if(value.lenght < 6){
                    return Promise.reject(new Error('The new password should be at least 6 symbols!'))
                }
            }

        },})
    ]}
    >
        <Input.Password placeholder={placeholder} size='large'/>
    </Form.Item>
  )
}
