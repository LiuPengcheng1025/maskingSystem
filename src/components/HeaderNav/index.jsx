import { useState } from 'react';
import { useNavigate, Route, Routes ,Navigate } from 'react-router-dom';
import {
  GithubFilled,
  InfoCircleFilled,
  QuestionCircleFilled,
} from '@ant-design/icons';
import { PageContainer, ProCard, ProLayout } from '@ant-design/pro-components';
import defaultProps from './_defaultProps.js';
import Index_en from '../../pages/index_en/index.jsx';
import Index_ch from '../../pages/index_ch/index.jsx';
import Index_ala from '../../pages/index_ala/index.jsx';
import BuyInsurancePage_en from '../../pages/buyInsurance_en/index.jsx';
import BuyInsurancePage_ch from '../../pages/buyInsurance_ch/index.jsx';
import BuyInsurancePage_ala from '../../pages/buyInsurance_ala/index.jsx';

import logoImg from '../background/f.png';
import { useLocation } from 'react-router-dom';

/**
 * HeaderNav 组件 - 应用的头部导航组件
 * 包含侧边栏菜单、用户信息和路由管理
 */
const HeaderNav = () => {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh', // 占满整个视口高度
      }}
    >
      <ProLayout
        siderWidth={200}
        logo={
          <div>
            <img src={logoImg} alt="logo" style={{ width: '60px', height: 'auto' }} />
          </div>
        }
        title={<span style={{ color: 'white', fontSize: '20px' ,marginTop:-10}}>Human Resources</span>}
        bgLayoutImgList={[
          {
            left: 0,
            top: 0,
            width: '100vw',
            height: '100vh',
            background: 'linear-gradient(135deg, #0f1748 0%, #6377deff 100%)',
            backgroundColor: '#0f1748', // 回退颜色
          },
        ]}
        {...defaultProps}
        avatarProps={{
          title: <span style={{ color: 'white' }}>admin</span>,
          size: 'small',
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
            style={{
              color: currentPath === item.path ? '#40a9ff' : '#a0a0a0',
              backgroundColor: currentPath === item.path ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
              fontWeight: currentPath === item.path ? 'bold' : 'normal',
              padding: '8px 20px',
              borderRadius: '4px',
              borderLeft: currentPath === item.path ? '4px solid #40a9ff' : 'none',
              textShadow: currentPath === item.path ? '0 0 2px rgba(64, 169, 255, 0.5)' : 'none',
              transition: 'all 0.1s ease',
              whiteSpace: 'nowrap',
              width: '160px',
            }}
            onClick={() => {
              navigate(item.path || '/1');
            }}
          >
            {dom}
          </div>
        )}
        collapsed={collapsed}
        onCollapse={setCollapsed}
      >
        <PageContainer>
          <ProCard
            style={{
              height: 'auto', 
            }}
          >
            <Routes>
              <Route path="/maskingSystem" element={<Navigate to="/Information_Entry_en" replace />} />
              <Route path="/Information_Entry_en" element={<Index_en />} />
              <Route path="/Information_Query_en" element={<BuyInsurancePage_en />} />
              <Route path="/Information_Entry_ch" element={<Index_ch />} />
              <Route path="/Information_Query_ch" element={<BuyInsurancePage_ch />} />
              <Route path="/Information_Entry_ala" element={<Index_ala />} />
              <Route path="/Information_Query_ala" element={<BuyInsurancePage_ala />} />
            </Routes>
          </ProCard>
        </PageContainer>
      </ProLayout>
    </div>
  );
};

export default HeaderNav;