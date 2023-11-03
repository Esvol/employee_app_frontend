import { Button, Form } from 'antd'
import React from 'react'

type Props = {
    children: React.ReactNode
    htmlType?: "button" | "submit" | "reset" | undefined
    type?: "link" | "text" | "default" | "primary" | "dashed" | undefined
    danger?: boolean | undefined
    loading?: boolean | undefined
    shape?: "default" | "circle" | "round" | undefined
    icon?: React.ReactNode
    onClick?: () => void
}

export const CustomButton = ({children, htmlType = 'button', type, danger, loading, shape, icon, onClick}: Props) => {
  return (
    <Form.Item>
        <Button
            htmlType={htmlType}
            type={type}
            danger={danger}
            loading={loading}
            shape={shape}
            icon = {icon}
            onClick={onClick}
        >
            {children}
        </Button>
    </Form.Item>
  )
}
