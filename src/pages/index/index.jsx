// src/Login.js
import React, { useState, useRef } from 'react';
import { Form, Input, Button, message, Card, Row, Col , Select , Table  ,Space, Modal } from 'antd'; 
import arrowhead from '../../components/background/Arrowhead.png';
import arrowhead2 from '../../components/background/Arrowhead2.png';
import { userInfoAdd ,getInfoEntryList } from './service.ts';
import { useEffect } from 'react';
import { ConfigProvider } from 'antd';
import { createStyles } from 'antd-style';

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
    console.log('res:',res.data.ok);
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
      page: currentPage,
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

  return (
    <>
      {/* 添加标题 */}
      <Row gutter={16}>
  
  <Col span={14}>
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
            width: '225px',
          }}
      >
        {cardText}
      </Button>
      
    </ConfigProvider>
   
  </Col>
   <Col span={5}>
    <a href="https://b6786378dfc4.ngrok-free.app/inspect?username=admin&password=123456" target="_blank"
           style={{
             display: 'inline-block',
             width: '270px',
             height: '40px',
             backgroundColor: 'black',
             color: 'white',
             textDecoration: 'none',
             transition: 'transform 0.3s ease',
             transformOrigin: 'center',
             borderRadius: 10,
             marginBottom: '10px'  // 添加下边距

           }} rel="noreferrer"
           onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
           onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <p style={{ textAlign: 'center', lineHeight: '40px', margin: 0, height: '40px', flexDirection: 'column', justifyContent: 'center' }}>Phone Number Masking Server Database</p>
        </a>
        <a href="http://d6f1d662ede3.ngrok-free.app/inspect?username=admin&password=123456" target="_blank"
           style={{
             display: 'inline-block',
             width: '225px',
             height: '40px',
             backgroundColor: 'black',
             color: 'white',
             textDecoration: 'none',
             transition: 'transform 0.3s ease',
             transformOrigin: 'center',
             borderRadius: 10,
             marginBottom: '10px'  // 添加下边距

           }} rel="noreferrer"
           onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
           onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <p style={{ textAlign: 'center', lineHeight: '40px', margin: 0, height: '40px', flexDirection: 'column', justifyContent: 'center' }}>ID Card Masking Server Database</p>
        </a>
        <a href=" http://57283e72ea00.ngrok-free.app/inspect?username=admin&password=123456" target="_blank"
           style={{
             display: 'inline-block',
             width: '225px',
             height: '40px',
             backgroundColor: 'black',
             color: 'white',
             textDecoration: 'none',
             transition: 'transform 0.3s ease',
             transformOrigin: 'center',
             borderRadius: 10,
             marginBottom: '10px'  // 添加下边距

           }} rel="noreferrer"
           onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
           onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <p style={{ textAlign: 'center', lineHeight: '40px', margin: 0, height: '40px', flexDirection: 'column', justifyContent: 'center' }}>Address Masking Server Database</p>
        </a>
  </Col>



 
</Row>
      <Row gutter={[16, 16]} style={{ padding: '50px' }} justify="center">
        {/* 根据状态决定是否显示第一个卡片 */}
        {showFirstCard && (
          <Col xs={24} sm={20} md={16} lg={12} xl={10} style={{ margin: '0 auto' }}>
            <Card title="Add Employee Information" style={{ boxShadow: '0 8px   24px rgba(0, 0, 0, 0.08)', borderRadius: '12px', overflow: 'hidden' }} hoverable>
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
                rules={[{ required: true, message: 'Please enter employee name!' }]}
              >
                <Input placeholder='Name'/>
              </Form.Item>
  
              <Form.Item
                name="phone"
                rules={[{ required: true, message: 'Please enter employee phone number!' }]}
              >
                <Input.Password placeholder='Phone Number'/>
              </Form.Item>
  
              <Form.Item
                name="id"
                rules={[{ required: true, message: 'Please enter ID number!' }]}
              >
                <Input.Password placeholder='ID Number'/>
              </Form.Item>
  
              <Form.Item
                name="address"
                rules={[{ required: true, message: 'Please enter address!' }]}
              >
                <Input.Password placeholder='Address'/>
              </Form.Item>
  
              <Form.Item
                name="position"
                rules={[{ required: true, message: 'Please select employee position!' }]}
              >
                <Select placeholder="Please select employee position">
                  <Option value="staff">Staff</Option>
                  <Option value="teamLeader">Team Leader</Option>
                  <Option value="manager">Manager</Option>
                </Select>
              </Form.Item>
  
              <Form.Item
                name="descr"
              >
                <Input placeholder='Remarks'/>
              </Form.Item>
  
              <Form.Item>
                <Button type="primary" htmlType="submit" block loading={loading}>
                  Submit
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
          title="Introduction to Distributed Masking" 
          open={isModalVisible} 
          onOk={handleOk} 
          onCancel={handleCancel}
          centered 
        >
          <p>Introduction to distributed masking process......</p>
        </Modal>
        {/* 新增提交成功后的弹窗 */}
        <Modal 
          title="Submission Successful" 
          open={isSubmitModalVisible} 
          onOk={handleSubmitOk} 
          onCancel={handleSubmitCancel}
          centered 
        >
          <p>User information has been confirmed and submitted!<br/>This employee information will be stored in the database after masking</p>
        </Modal>
        
        {!showFirstCard && (
        <Col span={24} style={{ marginLeft: 'auto' }}>
          <Card title="Database">
            {/* 绑定点击事件 */}
            {/* <Button type="primary" style={{ marginRight: 16 }} onClick={refreshData}>Update Database</Button> */}
            {/* 自定义分页配置的表格 */}
            <div className="table-container">
              <Table 
                className="hover-scale-table"
                columns={[
                  {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                  },
                  {
                    title: 'Phone',
                    dataIndex: 'phone',
                    key: 'phone',
                  },
                  {
                    title: 'ID Number',
                    dataIndex: 'id',
                    key: 'id',
                  },
                  {
                    title: 'Address',
                    dataIndex: 'address',
                    key: 'address',
                  },
                  {
                    title: 'Position',
                    dataIndex: 'position',
                    key: 'position',
                  },
                  {
                    title: 'Remarks',
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