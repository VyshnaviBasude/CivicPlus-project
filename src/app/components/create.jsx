import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Col, Row, message, Modal } from 'antd';
import moment from 'moment';
import api from '../utils/api.js';


// React component to Add new Event
const Create = ({ onAddProject }) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateError, setDateError] = useState(null);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setStartDate(null);
    setEndDate(null);
    setDateError(null);
  };

  const handleSubmit = async(values) => {
    const { title, description, startDate, endDate } = values;

    if (moment(startDate).isAfter(moment(endDate))) {
      message.error('Start date cannot be after end date');
      return;
    }

 // Create a new Event object to send to the API
    const newEvent = {
      key: Date.now().toString(),
      title,
      description,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };

     // Send the new Event data to the server
    try {
      const response = await api({
        url: '/api/Events',
        method: "POST",
        data: newEvent 
      });
      onAddProject(); // Callback function to refresh the project list
    } catch (error) {
      console.error('Error fetching events:', error);
    }
    

    handleCancel();
    message.success('Event added successfully');
  };

  // Function to handle start date change and validate date range
  const onStartDateChange = (date) => {
    setStartDate(date);
    if (endDate && date && date.isAfter(endDate)) {
      setDateError('End date cannot be before start date');
    } else {
      setDateError(null);
    }
  };
  
// Function to handle end date change and validate date range
  const onEndDateChange = (date) => {
    setEndDate(date);
    if (startDate && date && date.isBefore(startDate)) {
      setDateError('End date cannot be before start date');
    } else {
      setDateError(null);
    }
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add New Event
      </Button>

      <Modal
        title="Create New Event"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: 'Please enter the Event title' }]}
              >
                <Input placeholder="Event Title" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: 'Please enter the Event description' }]}
              >
                <Input placeholder="Event Description" rows={4} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="startDate"
                label="Start Date"
                rules={[{ required: true, message: 'Please select the start date' }]}
              >
                <DatePicker
                  format="YYYY-MM-DD"
                  placeholder="Select Start Date"
                  style={{ width: '100%' }}
                  onChange={onStartDateChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="endDate"
                label="End Date"
                rules={[{ required: true, message: 'Please select the end date' }]}
                validateStatus={dateError ? 'error' : ''}
                help={dateError}
              >
                <DatePicker
                  format="YYYY-MM-DD"
                  placeholder="Select End Date"
                  style={{ width: '100%' }}
                  onChange={onEndDateChange}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit" block disabled={!!dateError}>
              Add Event
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Create;
