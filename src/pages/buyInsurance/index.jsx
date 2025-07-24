import React, { useState, useEffect } from 'react';
import { Button, Card, Layout, Input, Table, Space, Modal } from 'antd';
import Title from 'antd/es/skeleton/Title';

const { Header, Content } = Layout;
const { Search } = Input;

const BuyInsurancePage = () => {
  // 用于控制显示哪个 Card 的状态
  const [showFirstCard, setShowFirstCard] = useState(true);
  // 用于控制按钮显示的文本
  const [buttonText, setButtonText] = useState('去保险公司');
  // 模拟表格数据
  const [tableData, setTableData] = useState([
    { id: 1, name: '张三' },
    { id: 2, name: '李四' },
    { id: 3, name: '王五' },
  ]);
  const [tableData2, setTableData2] = useState([
    {
        key: '1',
        name: '张三',
        phone: '13800000000',
        idCard: '110101199001010011',
        address: '北京市海淀区',
        position: '组长',
        beizhu: '无',
      },
      {
        key: '2',
        name: '李四',
        phone: '13800000001',
        idCard: '110101199001010012',
        address: '北京市海淀区',
        position: '经理',
        beizhu: '无',
      },
      {
        key: '3',
        name: '王五',
        phone: '13800000002',
        idCard: '110101199001010013',
        address: '北京市朝阳区',
        position: '员工',
        beizhu: '新员工',
      },
      {
        key: '4',
        name: '赵六',
        phone: '13800000003',
        idCard: '110101199001010014',
        address: '北京市东城区',
        position: '组长',
        beizhu: '晋升',
      },
  ]);
  // 存储勾选的选项
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  // 存储勾选的姓名
  const [selectedNames, setSelectedNames] = useState([]);
  // 控制弹窗显示状态
  const [isModalVisible, setIsModalVisible] = useState(false);

  // 切换显示 Card 和按钮文本的函数
  const handleToggleCard = () => {
    setShowFirstCard(!showFirstCard);
    setButtonText(showFirstCard ? '返回人力资源系统' : '去保险公司');
  };

  // 处理查询
  const handleSearch = (value) => {
    // 基于当前 tableData 进行过滤
    const filteredData = tableData.filter(item => item.name.includes(value));
    setTableData(filteredData);
  };

  // 处理表格行勾选
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
    const selected = newSelectedRowKeys.map(key => 
      tableData.find(item => item.id === key)?.name
    ).filter(Boolean);
    setSelectedNames(selected);
  };

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  const columns2 = [
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
      dataIndex: 'idCard',
      key: 'idCard',
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
      dataIndex: 'beizhu',
      key: 'beizhu',
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // 监听 showFirstCard 状态变化，当显示购买保险信息 Card 时弹出弹窗
  useEffect(() => {
    if (!showFirstCard) {
      setIsModalVisible(true);
    }
  }, [showFirstCard]);

  return (
    <Layout>
      <Header style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Button type="primary" onClick={handleToggleCard}>
          {buttonText}
        </Button>
      </Header>
      <Content style={{ padding: '24px' }}>
        {showFirstCard ? (
          <Card title="人力资源系统" style={{ width: '100%' }}>
            <Search
              placeholder="输入姓名查询"
              onSearch={handleSearch}
              style={{ width: 200, marginBottom: 16 }}
            />

            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={tableData}
              rowKey="id"
            />
            <p>勾选后请前往保险公司</p>
          </Card>
        ) : (
           <Header style={{ height: '100vh', overflow: 'auto' }}> 
           <p style={{ color: 'white', textAlign: 'center', fontSize: '37px' }}>保险公司</p>
            <Card title="保险公司看到的用户信息" style={{ width: '100%', maxWidth: '100%', marginTop: '0px' }}>
            <p>勾选的姓名：{selectedNames.join(', ')}</p>
            <Table
              columns={columns2}
              dataSource={tableData2}
            />
          </Card>
          </Header>
        )}
      </Content>
      {/* 弹窗组件 */}
      <Modal
        title="提示"
        open={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>数据库中的脱敏数据通过脱敏服务的查询接口恢复成明文，提供给保险公司<br/>保险公司拿到用户的完整的真实的信息才能够办理业务</p>
      </Modal>
    </Layout>
  );
};

export default BuyInsurancePage;
