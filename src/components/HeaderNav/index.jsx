import {
  GithubFilled,
  InfoCircleFilled,
  QuestionCircleFilled,
} from '@ant-design/icons';
import { Route, Routes } from "react-router-dom";
import { PageContainer, ProCard, ProLayout } from '@ant-design/pro-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 引入 useNavigate 钩子
import defaultProps from './_defaultProps.js';
import Index from '../../pages/index/index.jsx';
import BuyInsurancePage from '../../pages/buyInsurance/index.jsx';
import logoImg from '../background/logo2.png';
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [collapsed, setCollapsed] = useState(true); // 默认折叠
  const navigate = useNavigate();  // 使用 useNavigate 钩子

  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        siderWidth={200}
        // 只在侧边栏右上角显示标题
        logo={
          <div>
            <img src={logoImg} alt="logo" style={{ width: '50px', height: 'auto' }} />
            {/* <span style={{ color: 'white', fontSize: '24px', marginLeft: '10px' }}>人力资源</span> */}
          </div>
        }
        // 调整标题的字体大小和颜色
        title={<span style={{ color: 'white', fontSize: '24px' }}>人力资源</span>}
        bgLayoutImgList={[
          {
            //src: 'https://bpic.588ku.com/back_pic/06/11/81/36621f8dff125ae.jpg',  // 设置背景图URL
            left: 0,
            top: 0,
            width: '100vw',  // 设置宽度为视口宽度
            height: '100vh',  // 设置高度为视口高度
            background: 'rgba(0, 0, 0, 0.3)',  // 设置透明度
            backgroundColor: 'rgb(0, 21, 44)',
          },
        ]}
        {...defaultProps}
        avatarProps={{
          // src: '../background/logo.jpg',
          title: <span style={{ color: 'white' }}>用户名称</span>,
          size: 'large',
        }}
        actionsRender={(props) => {
          if (props.isMobile) return [];
          return [
            <InfoCircleFilled key="InfoCircleFilled" />,
            <QuestionCircleFilled key="QuestionCircleFilled" />,
            <GithubFilled key="GithubFilled" />,
          ];
        }}
        menuItemRender={(item, dom) => (
          <div
            onClick={() => {
              // 使用 navigate 来改变路由
              navigate(item.path || '/1');
            }}
          >
            {dom}
          </div>
        )}
        collapsed={collapsed}
        onCollapse={setCollapsed} // 控制折叠状态
      >
        <PageContainer>
          <ProCard
            style={{
              height: '100vh',
              minHeight: 800,
            }}
          >
            <Routes>
              <Route path="/1" element={<Index />} />
              <Route path="/2" element={<BuyInsurancePage />} />
              {/* 可以在这里添加更多路由 */}
            </Routes>
          </ProCard>
        </PageContainer>
      </ProLayout>
    </div>
  );
};