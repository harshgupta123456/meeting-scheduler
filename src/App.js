import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, TimePicker, Table, Modal } from 'antd';

const App = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onFinish = (values) => {
    const newData = {
      key: data.length + 1,
      ...values,
      date: values.date.format('YYYY-MM-DD'),
      startTime: values.startTime.format('HH:mm:ss'),
      endTime: values.endTime.format('HH:mm:ss'),
    };
    setData([...data, newData]);
    form.resetFields();
    setIsModalVisible(false); // Close modal after form submission
  };

  const handleDelete = (key) => {
    const newData = data.filter(item => item.key !== key);
    setData(newData);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email ID',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
    },
    {
      title: 'Mobile No',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: 'Agenda',
      dataIndex: 'agenda',
      key: 'agenda',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button type="link" onClick={() => handleDelete(record.key)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Button type="primary" onClick={showModal} style={{ marginBottom: 16, float: 'right' }}>
        Create Meeting
      </Button>

      <Modal
        title="Create Meeting"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: 'Please input your full name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email-ID"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: 'Please select the date!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Start Time"
            name="startTime"
            rules={[{ required: true, message: 'Please select the start time!' }]}
          >
            <TimePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="End Time"
            name="endTime"
            rules={[{ required: true, message: 'Please select the end time!' }]}
          >
            <TimePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Mobile No"
            name="mobile"
            rules={[{ required: true, message: 'Please input your mobile number!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Agenda"
            name="agenda"
            rules={[{ required: true, message: 'Please input the agenda!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Table columns={columns} dataSource={data} style={{ marginTop: 24 }} />
    </div>
  );
};

export default App;
