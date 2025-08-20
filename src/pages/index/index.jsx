// src/Login.js
import React, { useState, useRef } from 'react';
import { Form, Input, Button, message, Card, Row, Col , Select , Table  ,Space, Modal } from 'antd'; 
import { Link } from "react-router-dom";
import arrowhead from '../../components/background/Arrowhead.png';
import arrowhead2 from '../../components/background/Arrowhead2.png';
import { userInfoAdd ,getInfoEntryList } from './service.ts';
import { useEffect } from 'react';

import './index.css';

const Login = () => {
  const { Option } = Select;
  const [loading, setLoading] = useState(false);
  // 使用 useState 管理表格数据
  const [data, setData] = useState([
    {
      key: '1',
      name: '张三',
      phone: '138************00',
      id: '1101************10011',
      address: '北京市************',
      position: '组长',
      descr: '无',
    },
    {
      key: '2',
      name: '李四',
      phone: '138************01',
      id: '110************10012',
      address: '北京市************',
      position: '经理',
      descr: '无',
    },
  ]);

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
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>编辑{record.name}</a>
          <a>删除{record.name}</a>
        </Space>
      ),
    },
  ];

  // 刷新数据库
  const refreshData = () => {
    //再次调用接口
    const newData = [
      {
        key: '1',
        name: '张三',
        phone: '138************00',
        id: '1101************10011',
        address: '北京市************',
        position: '组长',
        beizhu: '无',
      },
      {
        key: '2',
        name: '李四',
        phone: '138************01',
        id: '110************10012',
        address: '北京市************',
        position: '经理',
        beizhu: '无',
      },
      {
        key: '3',
        name: '王五',
        phone: '138************00',
        id: '1101************10011',
        address: '北京市************',
        position: '组长',
        beizhu: '无',
      },
      {
        key: '4',
        name: '赵六',
        phone: '138************01',
        id: '110************10012',
        address: '北京市************',
        position: '经理',
        beizhu: '无',
      },
      {
        key: '5',
        name: '张七',
        phone: '138************00',
        id: '1101************10011',
        address: '北京市************',
        position: '组长',
        beizhu: '无',
      },
      {
        key: '6',
        name: '王八',
        phone: '138************01',
        id: '110************10012',
        address: '北京市************',
        position: '经理',
        beizhu: '无',
      },
    ];
    setData(newData);
    message.success('数据库更新成功');
  };

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
  const [cardText, setCardText] = useState('点击前往<br />应用端数据库');

  // 使用 useState 管理页面标题
  const [pageTitle, setPageTitle] = useState('员工信息录入系统');

  // 处理第二个卡片点击事件
  const handleSecondCardClick = () => {
    setShowFirstCard(!showFirstCard);
    
    // 切换图片和文字内容
    if (showFirstCard) {
      showModal();
      formRef.current.resetFields();
      setCardImage(arrowhead2); 
      setCardText('返回<br />继续添加信息');
      // 切换标题为员工数据库
      setPageTitle('员工数据库');
    } else {
      setCardImage(arrowhead);
      setCardText('点击前往<br />应用数据库');
      // 切换回原标题
      setPageTitle('员工信息录入系统');
    }
  };

   // 添加状态管理
  const [dataSource, setDataSource] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
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
      <Row justify="center" >
        <Col>
          <h1 style={{ fontSize: 32, textAlign: 'center' }}>{pageTitle}</h1>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ padding: '50px' }}>
        {/* 根据状态决定是否显示第一个卡片 */}
        {showFirstCard && (
          <Col span={18}>
            <Card title="添加员工信息">
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
                  rules={[{ required: true, message: '请输入员工姓名!' }]}
                >
                  <Input placeholder='姓名'/>
                </Form.Item>
  
                <Form.Item
                  name="phone"
                  rules={[{ required: true, message: '请输入员工手机号!' }]}
                >
                  <Input.Password placeholder='手机号'/>
                </Form.Item>
  
                <Form.Item
                  name="id"
                  rules={[{ required: true, message: '请输入身份证号!' }]}
                >
                  <Input.Password placeholder='身份证号'/>
                </Form.Item>
  
                <Form.Item
                  name="address"
                  rules={[{ required: true, message: '请输入地址!' }]}
                >
                  <Input.Password placeholder='地址'/>
                </Form.Item>
  
                <Form.Item
                  name="position"
                  rules={[{ required: true, message: '请选择员工职位!' }]}
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
        <Col span={3}>
       <Card 
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
        <a href="http://localhost:8181/inspect?name=admin&password=123456" target="_blank"
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
          <p style={{ textAlign: 'center', lineHeight: '25px', margin: 0, height: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>点击前往<br/>脱敏服务端数据库</p>
        </a>
        <Modal 
          title="提示信息" 
          open={isModalVisible} 
          onOk={handleOk} 
          onCancel={handleCancel}
          centered 
        >
          <p>分布式脱敏的介绍过程。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。</p>
        </Modal>
        {/* 新增提交成功后的弹窗 */}
        <Modal 
          title="提交成功" 
          open={isSubmitModalVisible} 
          onOk={handleSubmitOk} 
          onCancel={handleSubmitCancel}
          centered 
        >
          <p>用户信息已确认提交！<br/>该员工信息将会在脱敏后存入数据库</p>
        </Modal>
        </Col>
        {!showFirstCard && (
        <Col span={20} style={{ marginLeft: 'auto' }}>
          <Card title="数据库">
            {/* 绑定点击事件 */}
            {/* <Button type="primary" style={{ marginRight: 16 }} onClick={refreshData}>更新数据库</Button> */}
            {/* 自定义分页配置的表格 */}
            <Table 
        columns={columns} 
        dataSource={dataSource} 
        pagination={{
          current: currentPage,
          pageSize: pageSize,
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
      />
          </Card>
        </Col>
        )}
      </Row>
    </>
  );
};

export default Login;