import React, {useState, useEffect} from 'react'
import styles from './index.less';
import {Button, Card, Tabs, Toast, } from 'antd-mobile';
import LoginForm  from '@/components/Login';
import services from '@/services';

let timeout = null;

export default function IndexPage() {
  const [countDown, setCountDown] = useState(0);

  const userLogin = (param) => {
    services.userLogin({
      param,
    }).then(res => {
      const {
        code,
        data,
      } = res;
      switch (code) {
        case 200:
          const {token_type, access_token} = data;
          localStorage.setItem('login_demo_tk', `${token_type} ${access_token}`);
          window.location.replace('/home');
          break;
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  const triggerCountDown = () => {
    setCountDown(9);
    Toast.show({
      content: '10秒后重置发送短信按钮'
    })
  };

  useEffect(() => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if(countDown > 0){
        const nextCount = countDown - 1;
        setCountDown(nextCount);
      }
    }, 1000);
    return () => {
      clearTimeout(timeout);
    }
  }, [countDown]);

  const accountItems = [
    {
      name: 'user',
      label: '用户名',
      rules: [{ required: true, massage: '请输入用户名' }],
      type: 'input',
      placeholder: '请输入用户名'
    },
    {
      name: 'password',
      label: '密码',
      rules: [{ required: true, massage: '请输入密码' }],
      type: 'input',
      placeholder: '请输入密码'
    },
  ];

  const mobileItems = [
    {
      name: 'mobile',
      label: '手机号',
      rules: [{ required: true, massage: '请输入手机号' }],
      type: 'input',
      placeholder: '请输入手机号'
    },
    {
      name: 'captcha',
      label: '短信验证码',
      rules: [{ required: true, massage: '请输入验证码' }],
      type: 'input',
      placeholder: '请输入验证码',
      extra: [
        <div className={styles.extraPart} key='captcha_extra'>
          <Button
            onClick={triggerCountDown}
            color='primary'
            size='small'
            style={{width: 60}}
            disabled={countDown > 0}
          >
            {countDown <= 0 ? '发送' : countDown}
          </Button>
        </div>
      ],
    },
  ];

  return (
    <div className={styles.pageContainer}>
      <Card className={styles.loginPanel}>
        <Tabs>
          <Tabs.Tab title='账户密码登录' key='accountLogin'>
            <LoginForm
              formName='account'
              onFinish={userLogin}
              formItems={accountItems}
            />
          </Tabs.Tab>

          <Tabs.Tab title='手机登录' key='mobileLogin'>
            <LoginForm
              formName='mobile'
              onFinish={userLogin}
              formItems={mobileItems}
            />
          </Tabs.Tab>
        </Tabs>
      </Card>
    </div>
  );
}
