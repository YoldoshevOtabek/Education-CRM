import React, { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Card,
  Typography,
  Space,
  Button,
  Input,
  Spin,
  message,
  Modal,
  Form,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { directionService } from "./services/directions";
import type { CreateDirectionDto, Direction } from "./types/directions";

import "./styles/direktion.css";

const { Title, Text } = Typography;



const DirectionPage: React.FC = () => {
  const [directions, setDirections] = useState<Direction[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form] = Form.useForm<CreateDirectionDto>();

  const fetchDirections = async () => {
    try {
      setLoading(true);

      const res = await directionService.getDirections(1, 10);

      setDirections(Array.isArray(res?.data) ? res.data : []);
    } catch (error) {
      console.error(error);
      message.error("Yo'nalishlarni yuklashda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDirections();
  }, []);

  const handleAdd = async () => {
    try {
      const values = await form.validateFields();
      setSaving(true);
      await directionService.createDirection(values);
      message.success("Yo'nalish qo'shildi");
      setOpen(false);
      form.resetFields();
      fetchDirections();
    } catch (error) {
      if (error && typeof error === "object" && "errorFields" in error) return;
      message.error("Yo'nalish qo'shishda xatolik yuz berdi");
    } finally {
      setSaving(false);
    }
  };

  const filteredDirections = directions.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns: ColumnsType<Direction> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 70,
      render: (id: number) => (
        <span className="direction-id">#{id}</span>
      ),
    },

    {
      title: "Yo'nalish",
      dataIndex: "name",
      key: "name",
      render: (name: string) => (
        <Text className="direction-name">{name}</Text>
      ),
    },

    {
      title: "Tavsif",
      dataIndex: "description",
      key: "description",
      render: (description: string) => (
        <Text className="direction-description">
          {description}
        </Text>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 130,
      render: (status: string) => (
        <Tag
          className={
            status === "ACTIVE"
              ? "status-active"
              : "status-inactive"
          }
        >
          {status}
        </Tag>
      ),
    },

    {
      title: "Yaratilgan",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 180,
      render: (date: string) =>
        new Date(date).toLocaleDateString("uz-UZ"),
    },

    {
      title: "Amallar",
      key: "actions",
      width: 130,
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            className="action-edit"
            onClick={() => console.log("Edit:", record)}
          />

          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => console.log("Delete:", record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="direction-page">
      <Card className="direction-card">
        {/* Header */}
        <div className="direction-header flex justify-between">
          <div>
            <Title level={3} className="direction-title">
              Yo'nalishlar
            </Title>

            <Text className="direction-subtitle">
              Barcha ta'lim yo'nalishlarini boshqarish
            </Text>
          </div>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="add-direction-btn"
            onClick={() => setOpen(true)}
          >
            Yo'nalish qo'shish
          </Button>
        </div>

        {/* Search */}
        <div className="direction-toolbar mt-2.5 mb-2.5">
          <Input
            allowClear
            prefix={<SearchOutlined />}
            placeholder="Yo'nalish qidirish..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="direction-search"
          />

          <Text className="direction-count">
            Jami: <b>{filteredDirections.length}</b>
          </Text>
        </div>

        {/* Table */}
        <Table
          rowKey="id"
          columns={columns}
          dataSource={filteredDirections}
          loading={{
            spinning: loading,
            indicator: <Spin size="large" />,
          }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Jami ${total} ta`,
          }}
          className="direction-table"
          scroll={{ x: 900 }}
        />
      </Card>

      <Modal
        title="Yo'nalish qo'shish"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={handleAdd}
        confirmLoading={saving}
        okText="Saqlash"
        destroyOnHidden
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Nomi"
            rules={[{ required: true, message: "Nomini kiriting" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Tavsif">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DirectionPage;