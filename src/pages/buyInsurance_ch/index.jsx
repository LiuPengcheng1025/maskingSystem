import React, { useState, useEffect } from 'react';
import { Button, Card, Layout, Input, Table, Modal } from 'antd';
import { getNameList , getInsuranceList} from './service.ts';
const { Header, Content } = Layout;
const { Search } = Input;

const BuyInsurancePage = () => {
  // 用于控制显示哪个 Card 的状态
  const [showFirstCard, setShowFirstCard] = useState(true);
  // 用于控制按钮显示的文本
  const [buttonText, setButtonText] = useState('查询选中用户的明文信息');
  // 模拟表格数据
  const [tableData, setTableData] = useState([
  ]);
useEffect(() => {
  // 调用 getNameList 接口获取真实数据
  const fetchData = async () => {
    try {
      const data = await getNameList();
      console.log('data:',data.data.data);
      // 将接口返回的 aid 转换为 id
      const transformedData = data.data.data.map(item => ({
        ...item,
        id: item.aid, // 将 aid 的值赋给 id
      }));
      setTableData(transformedData);
      
    } catch (error) {
      console.error('获取数据失败:', error);
    }
  };

  fetchData();
}, []);
   // 添加数据获取 useEffect
  
  const [tableData2, setTableData2] = useState([]);
  // 存储勾选的选项
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  // 存储勾选的姓名
  const [selectedNames, setSelectedNames] = useState([]);
  // 控制弹窗显示状态
  const [isModalVisible, setIsModalVisible] = useState(false);

  // 切换显示 Card 和按钮文本的函数
 const handleToggleCard = () => {
    setShowFirstCard(!showFirstCard);
    setButtonText(showFirstCard ? '返回HR系统' : '查询选中用户的明文信息');
  };

  // 处理查询
  const handleSearch = (value) => {
    // 基于当前 tableData 进行过滤
    const filteredData = tableData.filter(item => item.name.includes(value));
    setTableData(filteredData);
  };

  // 处理表格行勾选
  const onSelectChange = async (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
    const selected = newSelectedRowKeys.map(key => 
      tableData.find(item => item.id === key)?.id
    ).filter(Boolean);
    setSelectedNames(selected);
    console.log('selected:',selected);
    const res = await getInsuranceList({aids:selected});
    console.log('res data:', res.data);
    // 确保tableData2是一个数组
    setTableData2(Array.isArray(res.data) ? res.data : (res.data?.data || []));
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
      title: '电话',
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
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
       <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)', padding: '0 32px', height: '64px' }}>
         <div style={{ fontSize: '27px', fontWeight: '600', background: 'linear-gradient(90deg, #1890ff 0%, #040404ff 100%)', WebkitBackgroundClip: 'text', color: 'transparent' }}>员工信息</div>
        <Search
              placeholder="按姓名搜索"
              onSearch={handleSearch}
              style={{ width: 280, marginBottom: 0 }}
            />
        <Button type="primary" onClick={handleToggleCard} style={{ borderRadius: '4px', transition: 'all 0.3s ease', padding: '0 24px', height: '40px', fontSize: '14px' }}>
          {buttonText}
        </Button>
      </Header>
      <Content style={{ padding: '24px', marginTop: '20px' }}>
        {showFirstCard ? (
          <Card style={{ width: '100%', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)', border: 'none', overflow: 'hidden', transition: 'all 0.3s ease', marginBottom: '24px' }}>
            <div style={{ padding: '16px 24px', borderBottom: '1px solid #f0f0f0', fontSize: '16px', fontWeight: '500' }}>员工列表</div>
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={tableData}
              rowKey="id"
              bordered={false}
              pagination={{ 
                pageSize: 8, 
                showTotal: (total) => `共 ${total} 条记录`,
                style: { padding: '16px 24px', borderTop: '1px solid #f0f0f0' }
              }}
              rowClassName={() => 'hover:bg-f5f5f5 transition-colors duration-200'}
              style={{ padding: '0 24px' }}
              size="middle"
            />
          </Card>
        ) : (
            
             <Card title="保险公司用户信息" style={{ width: '100%', maxWidth: '100%', marginTop: '0', borderRadius: '8px', border: 'none', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)', overflow: 'hidden', transition: 'all 0.3s ease', marginBottom: '24px' }}>
            {/* <p>勾选的姓名{selectedNames.join(', ')}</p> */}
            <Table
  columns={columns2}
  dataSource={tableData2}
  pagination={{ 
    pageSize: 5, 
    showTotal: (total) => `共 ${total} 条记录`,
    style: { padding: '16px 24px', borderTop: '1px solid #f0f0f0' }
  }}
  bordered={false}
  rowClassName={() => 'hover:bg-f5f5f5 transition-colors duration-200'}
  size="middle"
/>
          </Card>
          
        )}
      </Content>
      {/* 弹窗组件 */}
       <Modal
        title="脱敏查询"
        open={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
        style={{ borderRadius: '8px' }}
        maskStyle={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)' }}
        okButtonProps={{ style: { backgroundColor: '#1890ff', borderColor: '#1890ff', transition: 'all 0.3s ease' } }}
        cancelButtonProps={{ style: { transition: 'all 0.3s ease' } }}
      >
        <p style={{ lineHeight: '1.6', color: 'rgba(0, 0, 0, 0.85)' }}>数据库中的脱敏数据通过脱敏服务的查询接口恢复为明文并提供给保险公司。<br/>保险公司需要用户完整真实的信息来处理业务。</p>
      </Modal>
    </Layout>
  );  
};

export default BuyInsurancePage;