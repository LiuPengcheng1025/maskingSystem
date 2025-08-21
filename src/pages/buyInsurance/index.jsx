import React, { useState, useEffect } from 'react';
import { Button, Card, Layout, Input, Table, Modal } from 'antd';
import { getNameList , getInsuranceList} from './service.ts';
const { Header, Content } = Layout;
const { Search } = Input;

const BuyInsurancePage = () => {
  // 用于控制显示哪个 Card 的状态
  const [showFirstCard, setShowFirstCard] = useState(true);
  // 用于控制按钮显示的文本
  const [buttonText, setButtonText] = useState('Query Selected Users\' Plaintext Info');
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
    setButtonText(showFirstCard ? 'Return to HR System' : 'Query Selected Users\' Plaintext Info');
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
    console.log(res.data)
    setTableData2(res.data.data);
    
  };

   const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  const columns2 = [
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
        <Search
              placeholder="Search by Name"
              onSearch={handleSearch}
              style={{ width: 200, marginBottom: 0 ,marginRight:'600px'}}

            />
        <Button type="primary" onClick={handleToggleCard}>
          {buttonText}
        </Button>
      </Header>
      <Content style={{ padding: '24px' }}>
        {showFirstCard ? (
          <Card style={{ width: '100%', backgroundColor: 'rgb(0, 21, 41)' }}>
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={tableData}
              rowKey="id"
              bordered
              style={{ border: '1px solid black',  backgroundColor: '#ffffffff'}}
               pagination={{ 
    pageSize: 8, 
    showTotal: (total) => `Total ${total} records`
  }}
            />
          </Card>
        ) : (
           <Header style={{ height: '650px', overflow: 'auto' }}> 
             <Card title="User Information for Insurance Company" style={{ width: '100%', maxWidth: '100%', marginTop: '30px' }}>
            {/* <p>勾选的姓名：{selectedNames.join(', ')}</p> */}
            <Table
  columns={columns2}
  dataSource={tableData2}
  pagination={{ 
    pageSize: 5, 
    showTotal: (total) => `Total ${total} records`
  }}
/>
          </Card>
          </Header>
        )}
      </Content>
      {/* 弹窗组件 */}
       <Modal
        title="Masking Query"
        open={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>Masked data in the database is restored to plaintext through the masking service's query interface and provided to the insurance company.<br/>The insurance company needs the user's complete and真实的 information to process business.</p>
      </Modal>
    </Layout>
  );
};

export default BuyInsurancePage;