import React, {useState, useEffect} from 'react'
import styles from './index.less';
import {Button, Form, Input} from 'antd-mobile';

export default function LoginForm (props) {
  const {
    onFinish,
    formItems,
    formName,
  } = props;

  const handleFinish = (param) => {
    if(onFinish){
      onFinish(param)
    }
  };

  return (
    <Form
      name={formName}
      layout='horizontal'
      mode='card'
      requiredMarkStyle='text-optional'
      onFinish={handleFinish}
      footer={<Button block type='submit' color='primary' size='middle' >登录</Button>}
    >
      {
        formItems && formItems.map( (f, idx) => {
          if(f.hasOwnProperty('type')){
            switch (f.type){
              default:
                return (
                  <Form.Item
                    key={f?.name || `${formName}_item${idx}`}
                    name={f?.name || `formItem${idx}`}
                    label={f?.label || ''}
                    rules={f?.rules || []}
                    extra={f?.extra || []}
                  >
                    <Input placeholder={f?.placeholder || ''}/>
                  </Form.Item>
                )
            }
          }
        })
      }
    </Form>
  );
}
