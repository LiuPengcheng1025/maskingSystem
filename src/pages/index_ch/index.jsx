// src/Login.js
import React, { useState, useRef } from 'react';
import { Form, Input, Button, message, Card, Row, Col , Select , Table  ,Space, Modal } from 'antd'; 
import arrowhead from '../../components/background/Arrowhead.png';
import arrowhead2 from '../../components/background/Arrowhead2.png';
import { userInfoAdd ,getInfoEntryList } from './service.ts';
import { useEffect } from 'react';
import { ConfigProvider } from 'antd';
import { createStyles } from 'antd-style';
import { ip } from '../../components/gongwangIP/ip.ts';

import './index.css';

const Login = () => {
  const { Option } = Select;
  const [loading, setLoading] = useState(false);
  // 添加渐变按钮样式
  const useStyle = createStyles(({ prefixCls, css }) => ({
    linearGradientButton: css`
      &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
        > span { position: relative; }
        &::before { content: ''; background: linear-gradient(135deg, #6253e1, #04befe); position: absolute; inset: -1px; opacity: 1; transition: all .3s; border-radius: inherit; }
        &:hover::before { opacity: 0; }
      }
    `,
  }));
  const { styles } = useStyle();

  // 创建表单引用
  const formRef = useRef(null);

  // 表单提交处理
const onFinish = async (values) => {
  setLoading(true);
  console.log('Received values:', values);
  try {
    // 使用await调用userInfoAdd接口
    const res = await userInfoAdd(values);
    console.log('res:',res);
    message.success('提交成功!');
    setIsSubmitModalVisible(true);
    // 清空输入框内容
    formRef.current.resetFields();
  } catch (error) {
    message.error('提交失败: ' + error.message);
  } finally {
    setLoading(false);
  }
};

  // 使用 useState 管理提交成功后的弹窗显示状态
  const [isSubmitModalVisible, setIsSubmitModalVisible] = useState(false);

  // 处理提交成功弹窗关闭的函数
  const handleSubmitOk = () => {
    setIsSubmitModalVisible(false);
  };

  const handleSubmitCancel = () => {
    setIsSubmitModalVisible(false);
  };

   // 使用 useState 管理卡片的缩放状态
  const [isCardHovered, setIsCardHovered] = useState(false);

  // 处理卡片鼠标进入事件
  const handleCardMouseEnter = () => {
    setIsCardHovered(true);
  };

  // 处理卡片鼠标离开事件
  const handleCardMouseLeave = () => {
    setIsCardHovered(false);
  };
  
  //table
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '身份证号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '职位',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: '备注',
      dataIndex: 'descr',
      key: 'descr',
    },
    
  ];

  // 使用 useState 管理弹窗的显示状态
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  // 显示弹窗的函数
  const showModal = () => {
    setIsModalVisible(true);
  };
  
  // 处理弹窗关闭的函数
  const handleOk = () => {
    setIsModalVisible(false);
  };
  
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // 使用 useState 管理卡片显示状态
  const [showFirstCard, setShowFirstCard] = useState(true);

  // 使用 useState 管理卡片的图片路径和文字内容
  const [cardImage, setCardImage] = useState(arrowhead);
  const [cardText, setCardText] = useState('go to Application Database');

  // 使用 useState 管理页面标题
  const [pageTitle, setPageTitle] = useState('Employee Information Entry System');

  // 处理第二个卡片点击事件
  const handleSecondCardClick = () => {
    setShowFirstCard(!showFirstCard);
    
    // 切换图片和文字内容
    if (showFirstCard) {
      showModal();
      formRef.current.resetFields();
      setCardImage(arrowhead2); 
      setCardText('Return to Add Info');
      // 切换标题为员工数据库
      setPageTitle('Employee Database');
      // 切换到数据库视图时重新获取数据
      fetchTableData();
    } else {
      setCardImage(arrowhead);
      setCardText('go to Application Database');
      // 切换回原标题
      setPageTitle('Employee Information Entry System');
    }
  };

   // 添加状态管理
  const [dataSource, setDataSource] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // 修改pageSize的初始值为5
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  // 获取表格数据
  const fetchTableData = async () => {
  try {
    const response = await getInfoEntryList({
      current: currentPage,
      pageSize: pageSize
    });
    console.log(currentPage,pageSize,response);
    // 确保dataSource始终是数组
    const tableData = response.data.data;
    setTotal(response.data.total);
    // const tableData = Array.isArray(response.data) ? response.data : [];
    console.log(tableData);

    setDataSource(tableData);
  } catch (error) {
    console.error('获取表格数据失败:', error);
    // 错误时也确保dataSource是数组
    setDataSource([]);
    setTotal(0);
  }
};
   // 初始加载和分页变化时获取数据
  useEffect(() => {
    fetchTableData();
  }, [currentPage, pageSize]);

  // 添加状态管理选择的值
  // 将空字符串改为null，这样placeholder才能正常显示
  const [selectedWebsite, setSelectedWebsite] = useState(null);
  
  // 处理网站选择变化的函数
  // 处理网站选择变化的函数
  const handleWebsiteChange = (value) => {
  // 不再更新selectedWebsite状态，这样placeholder会一直显示
  // 根据选择的值打开相应的网站
  switch (value) {
    case 'website1':
          window.open(ip.website1 + '/inspect?username=admin&password=123456', '_blank');
          break;
        case 'website2':
          window.open(ip.website2 + '/inspect?username=admin&password=123456', '_blank');     
          break;
        case 'website3':
          window.open(ip.website3 + '/inspect?username=admin&password=123456', '_blank');
          break;
    default:
      break;
  }
};
  return (
    <>
      {/* 添加标题 */}
      <Row gutter={16}>
  
  <Col span={12}>
    {/* <h1 style={{ fontSize: 32, textAlign: 'left' }}>{pageTitle}</h1> */}
    <div style={{ fontSize: '32px', fontWeight: '600',background: 'linear-gradient(90deg, #1890ff 0%, #040404ff 100%)', WebkitBackgroundClip: 'text', color: 'transparent' }}>{pageTitle}</div>
  </Col>
  <Col span={5}>
    <ConfigProvider button={{ className: styles.linearGradientButton }}>
      <Button type="primary" size="large"
          variant={false}
          onClick={handleSecondCardClick} 
          // 绑定鼠标进入和离开事件
          onMouseEnter={handleCardMouseEnter}
          onMouseLeave={handleCardMouseLeave}
          // 根据状态添加类名
          className={isCardHovered ? 'card-hovered' : ''} 
          style={{
            width: '205px',
            height: '30px',
          }}
      >
        {cardText}
      </Button>
      
    </ConfigProvider>
   
  </Col>
   <Col span={5}>
          {/* 替换简单按钮为Select组件 */}
         <Select
  placeholder="选择要访问的脱敏数据库"
  style={{ width: 300 }} // 增加宽度以完全显示文字
  value={selectedWebsite}
  onChange={handleWebsiteChange}
  allowClear
>
  <Option value="website1">电话号码脱敏数据库</Option>
  <Option value="website2">身份证脱敏数据库</Option>
  <Option value="website3">地址脱敏数据库</Option>
</Select>
        </Col>

</Row>
      <Row gutter={[16, 16]} style={{ padding: '50px' }} justify="center">
        {/* 根据状态决定是否显示第一个卡片 */}
        {showFirstCard && (
          <Col xs={24} sm={20} md={16} lg={12} xl={10} style={{ margin: '0 auto' }}>
            <Card title="添加员工信息" style={{ boxShadow: '0 8px   24px rgba(0, 0, 0, 0.08)', borderRadius: '12px', overflow: 'hidden' }} hoverable>
            {/* 将表单引用绑定到 Form 组件 */}
            <Form
              ref={formRef}
              name="login-form"
              onFinish={onFinish}
              initialValues={{ remember: true }}
              layout="vertical"
            >
              <Form.Item
                name="name"
                rules={[{ required: true, message: '请输入员工姓名！' }]}
              >
                <Input placeholder='姓名'/>
              </Form.Item>

              <Form.Item
                name="phone"
                rules={[{ required: true, message: '请输入员工电话号码！' }]}
              >
                <Input.Password placeholder='电话号码'/>
              </Form.Item>

              <Form.Item
                name="id"
                rules={[{ required: true, message: '请输入身份证号码！' }]}
              >
                <Input.Password placeholder='身份证号码'/>
              </Form.Item>

              <Form.Item
                name="address"
                rules={[{ required: true, message: '请输入地址！' }]}
              >
                <Input.Password placeholder='地址'/>
              </Form.Item>

              <Form.Item
                name="position"
                rules={[{ required: true, message: '请选择员工职位！' }]}
              >
                <Select placeholder="请选择员工职位">
                  <Option value="staff">员工</Option>
                  <Option value="teamLeader">组长</Option>
                  <Option value="manager">经理</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="descr"
              >
                <Input placeholder='备注'/>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block loading={loading}>
                  提交
                </Button>
              </Form.Item>
            </Form>
          </Card>
          </Col>
        )}
        
       {/* <Card 
          style={{ marginTop: 50, width: "150px", backgroundColor: '#00CED1', height: '100px' }} 

          variant={false}
          onClick={handleSecondCardClick} 
          // 绑定鼠标进入和离开事件
          onMouseEnter={handleCardMouseEnter}
          onMouseLeave={handleCardMouseLeave}
          // 根据状态添加类名
          className={isCardHovered ? 'card-hovered' : ''} 
        >
         
          <p style={{ textAlign: 'center', marginTop: 0 }} dangerouslySetInnerHTML={{ __html: cardText }} />
        </Card>
         <a href="https://d6f1d662ede3.ngrok-free.app/inspect?username=admin&password=123456" target="_blank"
           style={{ 
             display: 'inline-block', 
             width: '150px', 
             height: '100px', 
             backgroundColor: 'black', 
             color: 'white', 
             textDecoration: 'none',
             transition: 'transform 0.3s ease',
             transformOrigin: 'center',
             marginTop: 20

           }} rel="noreferrer"
           onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
           onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <p style={{ textAlign: 'center', lineHeight: '25px', margin: 0, height: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>Click to go to<br/>Masking Server Database</p>
        </a> */}
        <Modal 
          title="分布式脱敏介绍" 
          open={isModalVisible} 
          onOk={handleOk} 
          onCancel={handleCancel}
          centered 
        >
          <p>授权的外部应用将敏感信息分割成多个独立字段，并分别将敏感字段发送至对应的脱敏服务节点。每个脱敏服务节点独立设置，互不进行任何数据交互。脱敏服务节点根据接收到的字段明文数据，采用自增算法生成本地唯一且不可逆的掩码标识MID，同时存储MID与明文数据的映射关系，并将MID返回给外部应用。外部系统的应用数据库不存储任何敏感字段的明文数据，且所有管理员无权访问各脱敏服务节点的完整数据集。</p>
        </Modal>
        {/* 新增提交成功后的弹窗 */}
        <Modal 
          title="提交成功" 
          open={isSubmitModalVisible} 
          onOk={handleSubmitOk} 
          onCancel={handleSubmitCancel}
          centered 
        >
          <p>用户信息已确认并提交！<br/>此员工信息将在脱敏后存储到数据库中</p>
        </Modal>
        
        {!showFirstCard && (
        <Col span={24} style={{ marginLeft: 'auto' }}>
          <Card title="数据库" style={{marginTop:"50px"}}>
            {/* 绑定点击事件 */}
            {/* <Button type="primary" style={{ marginRight: 16 }} onClick={refreshData}>Update Database</Button> */}
            {/* 自定义分页配置的表格 */}
            <div className="table-container">
              <Table 
                className="hover-scale-table"
                columns={[
                  {
                    title: '姓名',
                    dataIndex: 'name',
                    key: 'name',
                  },
                  {
                    title: '电话',
                    dataIndex: 'phone',
                    key: 'phone',
                  },
                  {
                    title: '身份证号码',
                    dataIndex: 'id',
                    key: 'id',
                  },
                  {
                    title: '地址',
                    dataIndex: 'address',
                    key: 'address',
                  },
                  {
                    title: '职位',
                    dataIndex: 'position',
                    key: 'position',
                  },
                  {
                    title: '备注',
                    dataIndex: 'descr',
                    key: 'descr',
                  },
                ]} 
                dataSource={dataSource} 
                pagination={{
                  current: currentPage,
                  pageSize: pageSize, // 这里会使用我们设置的初始值5
                  total: total,
                  showQuickJumper: true,
                  showSizeChanger: true,
                  // 分页变化回调
                  onChange: (page, pageSize) => {
                    setCurrentPage(page);
                    setPageSize(pageSize);
                  },
                  onShowSizeChange: (current, size) => {
                    setCurrentPage(1);
                    setPageSize(size);
                  }
                }}
                // 添加表格属性，确保表头固定
                scroll={{ y: 'calc(100% - 50px)' }} 
              />
            </div>
          </Card>
        </Col>
        )}
      </Row>
    </>
  );
};

export default Login;