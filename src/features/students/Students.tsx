import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Empty,
  Form,
  Input,
  Modal,
  Pagination,
  Select,
  Space,
  Table,
  Tag,
  Typography,
  message,
} from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  BookOutlined,
  TeamOutlined,
  CalendarOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import { studentService } from "./services/student";
import { directionService } from "../directions/services/directions";
import type { CreateStudentDto, Student } from "./types/student";
import type { Direction } from "../directions/types/directions";
import { seedDemoStudents } from "./data/seedStudents";
import "./styles/students.css";
import { useUser } from "../../context/UserContext";

const { Title, Text } = Typography;

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [directions, setDirections] = useState<Direction[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm<CreateStudentDto>();
  const {role} = useUser()

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const getStudents = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      const res = await studentService.getStudents(page, limit);
      setStudents(Array.isArray(res.data) ? res.data : []);
      if (res.pagination) {
        setPagination(res.pagination);
      }
    } catch (error) {
      console.error("Students error:", error);
      message.error("Studentlarni yuklashda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        const created = await seedDemoStudents();
        if (created > 0) {
          message.success(`${created} ta student qo'shildi`);
        }
      } catch (error) {
        console.error("Student seed error:", error);
      }

      await getStudents();
      directionService
        .getDirections(1, 100)
        .then((res) => setDirections(Array.isArray(res.data) ? res.data : []))
        .catch(() => undefined);
    };

    load();
  }, []);

  const handleAdd = async () => {
    try {
      const values = await form.validateFields();
      setSaving(true);
      await studentService.createStudent({
        ...values,
        directionId: Number(values.directionId),
      });
      message.success("Student qo'shildi");
      setOpen(false);
      form.resetFields();
      getStudents(pagination.page, pagination.limit);
    } catch (error) {
      if (error && typeof error === "object" && "errorFields" in error) return;
      message.error("Student qo'shishda xatolik yuz berdi");
    } finally {
      setSaving(false);
    }
  };

  const columns = [
    {
      title: "STUDENT",
      key: "student",
      render: (_: unknown, record: Student) => (
        <Space size={12}>
          <Avatar size={44} icon={<UserOutlined />} />
          <div>
            <div className="students-name font-semibold">{record.fullName}</div>
            <Text className="students-muted">ID: #{record.id}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: "PHONE",
      key: "phone",
      render: (_: unknown, record: Student) => (
        <Space>
          <PhoneOutlined />
          <span>{record.phone}</span>
        </Space>
      ),
    },
    {
      title: "DIRECTION",
      key: "direction",
      render: (_: unknown, record: Student) => (
        <Tag icon={<BookOutlined />}>{record.direction?.name ?? "-"}</Tag>
      ),
    },
    {
      title: "LEVEL",
      dataIndex: "level",
      key: "level",
      render: (level: string) => <Tag>{level.replaceAll("_", " ")}</Tag>,
    },
    {
      title: "GENDER",
      dataIndex: "gender",
      key: "gender",
      render: (gender: string) => (gender === "MALE" ? "Male" : "Female"),
    },
    {
      title: "GROUPS",
      key: "groups",
      render: (_: unknown, record: Student) => (
        <Space>
          <TeamOutlined />
          <span>{record.groups?.length || 0}</span>
        </Space>
      ),
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "ACTIVE" ? "green" : "gold"}>{status}</Tag>
      ),
    },
    {
      title: "BIRTH DATE",
      key: "birthDate",
      render: (_: unknown, record: Student) => (
        <Space>
          <CalendarOutlined />
          <span>{new Date(record.birthDate).toLocaleDateString("uz-UZ")}</span>
        </Space>
      ),
    },
  ];

  return (
    <div className="students-page">
      <div className="students-header">
        <div>
          <Title level={2} className="students-title">
            Students
          </Title>
          <Text className="students-subtitle">Barcha studentlar ro'yxati</Text>
        </div>
        {
          role == "ADMIN" ? 
          <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setOpen(true)}
        >
          Add Student
        </Button> : ""
        }
      </div>

      <Card
        className="students-card"
        styles={{ body: { padding: 0 } }}
        title={
          <div>
            <div className="students-card-title">Studentlar</div>
            <div className="students-card-count">
              Jami {pagination.total} ta student
            </div>
          </div>
        }
      >
        <Table
          rowKey="id"
          columns={columns}
          dataSource={students}
          loading={loading}
          pagination={false}
          scroll={{ x: 1100 }}
          className="students-table"
          locale={{
            emptyText: loading ? (
              <span />
            ) : (
              <Empty description="Studentlar topilmadi" />
            ),
          }}
        />
        <div className="students-footer">
          <Pagination
            current={pagination.page}
            pageSize={pagination.limit}
            total={pagination.total}
            showSizeChanger
            pageSizeOptions={[10, 20, 50]}
            onChange={(page, pageSize) => getStudents(page, pageSize)}
            disabled={loading}
            showTotal={(total) => `Jami ${total} ta`}
          />
        </div>
      </Card>

      <Modal
        title="Add Student"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={handleAdd}
        confirmLoading={saving}
        okText="Saqlash"
        destroyOnHidden
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="fullName"
            label="To'liq ism"
            rules={[{ required: true, message: "Ismni kiriting" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Telefon"
            rules={[{ required: true, message: "Telefon kiriting" }]}
          >
            <Input placeholder="+998901234567" />
          </Form.Item>
          <Form.Item
            name="birthDate"
            label="Tug'ilgan sana"
            rules={[{ required: true, message: "Sanani tanlang" }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Jins"
            rules={[{ required: true, message: "Jinsni tanlang" }]}
          >
            <Select
              options={[
                { value: "MALE", label: "Male" },
                { value: "FEMALE", label: "Female" },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="directionId"
            label="Yo'nalish"
            rules={[{ required: true, message: "Yo'nalishni tanlang" }]}
          >
            <Select
              options={directions.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
            />
          </Form.Item>
          <Form.Item
            name="level"
            label="Level"
            rules={[{ required: true, message: "Levelni tanlang" }]}
          >
            <Select
              options={[
                "BEGINNER",
                "ELEMENTARY",
                "INTERMEDIATE",
                "UPPER_INTERMEDIATE",
                "ADVANCED",
              ].map((level) => ({ value: level, label: level.replaceAll("_", " ") }))}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
