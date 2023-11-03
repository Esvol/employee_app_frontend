import { Button, Result, Row } from 'antd';
import React from 'react'
import { Link, useParams } from 'react-router-dom'

const Statuses: Record<string, string> = {
    created: 'User is successfully created!',
    updated: 'User is successfully updated!',
    deleted: 'User is successfully deleted!',
}

export const Status = () => {
    const { status } = useParams();
    console.log(status);
    
  return (
    <Row align='middle' justify='center' style={{width: '100%'}}>
        <Result 
            status={status ? 'success' : 404}
            title = {status ? Statuses[status] : 'Not found'}
            extra = {
                <Button key='dashboard'>
                    <Link to='/'>On the Main page</Link>
                </Button>
            }
        >

        </Result>
    </Row>
  )
}
