"use client"

import React, { useState, useEffect } from 'react';
import { Table, Button, Popconfirm, Row, Col, Typography } from 'antd';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import CreateProjectForm from './create.jsx';
import EventDetailsModal from './detail';
import api from '../utils/api.js';
import '../utils/index.css';

const { Title } = Typography;
// React component to display and manage the list of events
const List = () => {
  const [dataSource, setDataSource] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const handleDelete = (id) => {
    setDataSource(dataSource.filter(item => item.id !== id));
  };

  const handleAddEvent = () => {
    fetchElements();
  };

  const handleViewDetails = (id) => {
    setSelectedEventId(id);
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    setSelectedEventId(null);
  };
 // Function to fetch the list of events from the API
  const fetchElements = async () => {
    try {
      const response = await api({
        url: '/api/Events?%24top=20&%24skip=0',
        method: 'GET'
      });
      setDataSource(response.data.items);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchElements();
  }, []);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Actions',
      render: (_, record) => (
        <>
          <Button
            icon={<EyeOutlined />}
            size="small"
            onClick={() => handleViewDetails(record.id)} // Pass record.id here
            style={{ marginRight: 8 }}
          >
            View
          </Button>
          <Popconfirm
            title="Are you sure to delete?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button
              icon={<DeleteOutlined />}
              size="small"
              type="danger"
            >
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <>
      <Row justify="space-between" style={{ marginBottom: 20 }}>
        <Col>
          <Title level={3}>Events List</Title>
        </Col>
        <Col>
          <CreateProjectForm onAddProject={handleAddEvent} />
        </Col>
      </Row>

      <Table
        bordered
        dataSource={dataSource}
        columns={columns}
        rowClassName="editable-row"
        pagination={false}
        rowKey="id" // Make sure each row has a unique ID
      />

      {/* Modal for viewing project details */}
      <EventDetailsModal
        visible={visible}
        eventId={selectedEventId} // Pass eventId to the modal
        onCancel={handleCancel}
      />
    </>
  );
};

export default List;
