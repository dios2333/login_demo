import React, {useState, useEffect} from 'react'
import styles from './index.less';
import {Button, Toast,  } from 'antd-mobile';
import services from '@/services';

let timeout = null;

const Home = (props) => {
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    pageInit();
    return () => {
      setShowLogout(false);
      clearTimeout(timeout);
    }
  }, []);

  const pageInit = () => {
    services.authCheck({}).then(res => {
      const {code, data} = res;
      switch (code) {
        case 405:
          timeout = setTimeout(() => {
            window.location.replace('/login');
          }, 300);
          break;
        case 200:
          Toast.show({
            content: `欢迎来到登录demo`,
            duration: 1000,
          });
          setShowLogout(true);
          break;
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  const logout = () => {
    localStorage.removeItem('login_demo_tk');
    window.location.replace('/login');
  };

  return (
    <div className={styles.pageContainer}>
      <h1>Page home</h1>
      {
        showLogout &&
        <Button onClick={logout} color='primary' size='middle' > 退出登录 </Button>
      }
    </div>
  );
};

export default Home
