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
      title: 'الاسم',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'رقم الهاتف',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'رقم الهوية',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'العنوان',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'المنصب',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'الملاحظات',
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
  const [cardText, setCardText] = useState('الانتقال إلى قاعدة بيانات التطبيق');

  // 使用 useState 管理页面标题
  const [pageTitle, setPageTitle] = useState('نظام إدخال معلومات الموظفين');

  // 处理第二个卡片点击事件
  const handleSecondCardClick = () => {
    setShowFirstCard(!showFirstCard);
    
    // 切换图片和文字内容
    if (showFirstCard) {
      showModal();
      formRef.current.resetFields();
      setCardImage(arrowhead2); 
      setCardText('العودة إلى إضافة المعلومات');
      // 切换标题为员工数据库
      setPageTitle('قاعدة بيانات الموظفين');
      // 切换到数据库视图时重新获取数据
      fetchTableData();
    } else {
      setCardImage(arrowhead);
      setCardText('الانتقال إلى قاعدة بيانات التطبيق');
      // 切换回原标题
      setPageTitle('نظام إدخال معلومات الموظفين');
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
      window.open('https://46d35c013d33.ngrok-free.app/inspect?username=admin&password=123456', '_blank');
      break;
    case 'website2':
      window.open('https://9aafb966a954.ngrok-free.app/inspect?username=admin&password=123456', '_blank');
      break;
    case 'website3':
      window.open('https://b8363f9e5916.ngrok-free.app/inspect?username=admin&password=123456', '_blank');
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
            width: '225px',
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
  placeholder="اختر قاعدة بيانات مدفأة للوصول"
  style={{ width: 300 }} // 增加宽度以完全显示文字
  value={selectedWebsite}
  onChange={handleWebsiteChange}
  allowClear
>
  <Option value="website1">قاعدة بيانات تعمية أرقام الهاتف</Option>
  <Option value="website2">قاعدة بيانات تعمية بطاقات الهوية</Option>
  <Option value="website3">قاعدة بيانات تعمية العناوين</Option>
</Select>
        </Col>

</Row>
      <Row gutter={[16, 16]} style={{ padding: '50px' }} justify="center">
        {/* 根据状态决定是否显示第一个卡片 */}
        {showFirstCard && (
          <Col xs={24} sm={20} md={16} lg={12} xl={10} style={{ margin: '0 auto' }}>
            <Card title="إضافة معلومات الموظف" style={{ boxShadow: '0 8px   24px rgba(0, 0, 0, 0.08)', borderRadius: '12px', overflow: 'hidden' }} hoverable>
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
                rules={[{ required: true, message: 'الرجاء إدخال اسم الموظف!' }]}
              >
                <Input placeholder='الاسم'/>
              </Form.Item>

              <Form.Item
                name="phone"
                rules={[{ required: true, message: 'الرجاء إدخال رقم هاتف الموظف!' }]}
              >
                <Input.Password placeholder='رقم الهاتف'/>
              </Form.Item>

              <Form.Item
                name="id"
                rules={[{ required: true, message: 'الرجاء إدخال رقم الهوية!' }]}
              >
                <Input.Password placeholder='رقم الهوية'/>
              </Form.Item>

              <Form.Item
                name="address"
                rules={[{ required: true, message: 'الرجاء إدخال العنوان!' }]}
              >
                <Input.Password placeholder='العنوان'/>
              </Form.Item>

              <Form.Item
                name="position"
                rules={[{ required: true, message: 'الرجاء اختيار منصب الموظف!' }]}
              >
                <Select placeholder="الرجاء اختيار منصب الموظف">
                  <Option value="staff">موظف</Option>
                  <Option value="teamLeader">رئيس فريق</Option>
                  <Option value="manager">مدير</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="descr"
              >
                <Input placeholder='الملاحظات'/>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block loading={loading}>
                  إرسال
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
          title="التعريف بالتعمية الموزعة" 
          open={isModalVisible} 
          onOk={handleOk} 
          onCancel={handleCancel}
          centered 
        >
          <p>تقسم التطبيقات الخارجية المصرح بها المعلومات الحساسة إلى عدة حقول مستقلة وترسل الحقول الحساسة إلى عقدات خدمة التعمية المقابلة على التوالي. يتم إعداد كل عقدة خدمة تعمية بشكل مستقل ولا تتعامل مع بيانات أخرى على الإطلاق. تولد عقدات خدمة التعمية معرّفًا وهميًا محليًا فريدًا وغير قابل للإزالة MID بناءً على بيانات النصية للأحقاد المستلمة باستخدام خوارزمية زيادة تلقائية. كما تخزن علاقة الربط بين MID والبيانات النصية وتعيد MID إلى التطبيق الخارجي. لا تخزن قاعدة بيانات التطبيق لنظام الخارج أي بيانات نصية للحقول الحساسة، ولا يحق لأي مدير الوصول إلى مجموعات البيانات الكاملة لكل عقدة خدمة معتمة.</p>
        </Modal>
        {/* 新增提交成功后的弹窗 */}
        <Modal 
          title="تم الإرسال بنجاح" 
          open={isSubmitModalVisible} 
          onOk={handleSubmitOk} 
          onCancel={handleSubmitCancel}
          centered 
        >
          <p>تم تأكيد وإرسال معلومات المستخدم!<br/>سيتم تخزين معلومات هذا الموظف في قاعدة البيانات بعد التعمية</p>
        </Modal>
        
        {!showFirstCard && (
        <Col span={24} style={{ marginLeft: 'auto' }}>
          <Card title="قاعدة بيانات" style={{marginTop:"50px"}}>
            {/* 绑定点击事件 */}
            {/* <Button type="primary" style={{ marginRight: 16 }} onClick={refreshData}>Update Database</Button> */}
            {/* 自定义分页配置的表格 */}
            <div className="table-container">
              <Table 
                className="hover-scale-table"
                columns={[
                  {
                    title: 'الاسم',
                    dataIndex: 'name',
                    key: 'name',
                  },
                  {
                    title: 'الهاتف',
                    dataIndex: 'phone',
                    key: 'phone',
                  },
                  {
                    title: 'رقم الهوية',
                    dataIndex: 'id',
                    key: 'id',
                  },
                  {
                    title: 'العنوان',
                    dataIndex: 'address',
                    key: 'address',
                  },
                  {
                    title: 'المنصب',
                    dataIndex: 'position',
                    key: 'position',
                  },
                  {
                    title: 'الملاحظات',
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