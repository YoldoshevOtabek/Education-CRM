import { useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Empty,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Spin,
  Statistic,
  Tag,
  Tooltip,
  Typography,
  message,
} from "antd";

import {
  CalendarOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  UserOutlined,
  BookOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import groupService from "./services/group";
import type { CreateGroupDto, Group, LessonDay } from "./types/group";
import { directionService } from "../directions/services/directions";
import { teacherService } from "../teacher/services/teacher";
import type { Direction } from "../directions/types/directions";
import type { TeacherType } from "../teacher/types/teacher";

import "./styles/group.css";

const { Title, Text } = Typography;

const dayLabels: Record<LessonDay, string> = {
  MONDAY: "Dush",
  TUESDAY: "Sesh",
  WEDNESDAY: "Chor",
  THURSDAY: "Pay",
  FRIDAY: "Juma",
  SATURDAY: "Shan",
  SUNDAY: "Yak",
};

export default function Group() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [directionOptions, setDirectionOptions] = useState<Direction[]>([]);
  const [teachers, setTeachers] = useState<TeacherType[]>([]);
  const [form] = Form.useForm<CreateGroupDto>();

  const getGroups = async () => {
    try {
      setLoading(true);

      const res = await groupService.getGroups(1, 10);

      setGroups(Array.isArray(res?.data) ? res.data : []);
    } catch (error) {
      console.error(error);

      messageApi.error("Guruhlarni yuklashda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGroups();
    directionService
      .getDirections(1, 100)
      .then((res) => setDirectionOptions(Array.isArray(res.data) ? res.data : []))
      .catch(() => undefined);
    teacherService
      .getTeachers(1, 100)
      .then((res) => setTeachers(Array.isArray(res.data) ? res.data : []))
      .catch(() => undefined);
  }, []);

  const handleAdd = async () => {
    try {
      const values = await form.validateFields();
      setSaving(true);
      await groupService.createGroup({
        ...values,
        directionId: Number(values.directionId),
        teacherId: Number(values.teacherId),
      });
      messageApi.success("Guruh qo'shildi");
      setOpen(false);
      form.resetFields();
      getGroups();
    } catch (error) {
      if (error && typeof error === "object" && "errorFields" in error) return;
      messageApi.error("Guruh qo'shishda xatolik yuz berdi");
    } finally {
      setSaving(false);
    }
  };

  const totalStudents = groups.reduce(
    (sum, group) => sum + group.studentsCount,
    0
  );

  const activeGroups = groups.filter(
    (group) => group.status === "ACTIVE"
  ).length;

  const directions = new Set(
    groups.map((group) => group.directionId)
  ).size;

  const renderDays = (days: LessonDay[]) => {
    return (
      <Space size={[4, 4]} wrap>
        {days.map((day) => (
          <Tag
            key={day}
            className="group-day-tag"
          >
            {dayLabels[day]}
          </Tag>
        ))}
      </Space>
    );
  };

  return (
    <div className="group-page">
      {contextHolder}

      {/* HEADER */}

      <div className="group-header">
        <div>
          <Title level={2} className="group-title">
            Guruhlar
          </Title>

          <Text className="group-subtitle">
            Barcha o'quv guruhlarini boshqarish
          </Text>
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="add-group-btn"
          onClick={() => setOpen(true)}
        >
          Yangi guruh
        </Button>
      </div>

      {loading ? (
        <div className="group-loading">
          <Spin size="large" />
        </div>
      ) : (
        <>
      {/* STATISTICS */}

      <Row gutter={[16, 16]} className="stats-row">
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">
            <Statistic
              title="Jami guruhlar"
              value={groups.length}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">
            <Statistic
              title="Faol guruhlar"
              value={activeGroups}
              prefix={<BookOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">
            <Statistic
              title="O'quvchilar"
              value={totalStudents}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">
            <Statistic
              title="Yo'nalishlar"
              value={directions}
              prefix={<BookOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* GROUPS */}

      {groups.length === 0 ? (
        <Card className="empty-card">
          <Empty description="Guruhlar mavjud emas" />
        </Card>
      ) : (
        <Row gutter={[18, 18]} className="groups-row mt-2.5">
          {groups.map((group) => (
            <Col
              key={group.id}
              xs={24}
              sm={24}
              md={12}
              xl={8}
              xxl={6}
            >
              <Card
                className="group-card"
                bordered={false}
              >
                {/* CARD HEADER */}

                <div className="group-card-header">
                  <div className="group-name-wrapper">
                    <div className="group-icon">
                      <TeamOutlined />
                    </div>

                    <div>
                      <Title
                        level={4}
                        className="group-name"
                      >
                        {group.name}
                      </Title>

                      <Text className="group-id">
                        ID: #{group.id}
                      </Text>
                    </div>
                  </div>

                  <Badge
                    status={
                      group.status === "ACTIVE"
                        ? "success"
                        : "default"
                    }
                    text={
                      group.status === "ACTIVE"
                        ? "Faol"
                        : "Nofaol"
                    }
                  />
                </div>

                {/* DIRECTION */}

                <div className="group-info">
                  <div className="info-item">
                    <div className="info-icon">
                      <BookOutlined />
                    </div>

                    <div>
                      <Text className="info-label">
                        Yo'nalish
                      </Text>

                      <Text className="info-value">
                        {group.direction?.name ?? "-"}
                      </Text>
                    </div>
                  </div>

                  {/* TEACHER */}

                  <div className="info-item">
                    <Avatar
                      size={38}
                      icon={<UserOutlined />}
                      className="teacher-avatar"
                    />

                    <div>
                      <Text className="info-label">
                        O'qituvchi
                      </Text>

                      <Text className="info-value">
                        {group.teacher?.fullName ?? "-"}
                      </Text>
                    </div>
                  </div>

                  {/* DATE */}

                  <div className="info-item">
                    <div className="info-icon">
                      <CalendarOutlined />
                    </div>

                    <div>
                      <Text className="info-label">
                        Boshlanish sanasi
                      </Text>

                      <Text className="info-value">
                        {new Date(
                          group.startDate
                        ).toLocaleDateString("uz-UZ")}
                      </Text>
                    </div>
                  </div>

                  {/* TIME */}

                  <div className="info-item">
                    <div className="info-icon">
                      <ClockCircleOutlined />
                    </div>

                    <div>
                      <Text className="info-label">
                        Dars vaqti
                      </Text>

                      <Text className="info-value">
                        {group.startTime}
                      </Text>
                    </div>
                  </div>
                </div>

                {/* DAYS */}

                <div className="days-section">
                  <Text className="section-label">
                    Dars kunlari
                  </Text>

                  {renderDays(group.lessonDays)}
                </div>

                {/* STUDENTS */}

                <div className="students-section">
                  <div>
                    <Text className="section-label">
                      O'quvchilar
                    </Text>

                    <div className="students-count">
                      <TeamOutlined />
                      <span>
                        {group.studentsCount} nafar
                      </span>
                    </div>
                  </div>

                  {(group.students?.length ?? 0) > 0 && (
                    <Avatar.Group
                      max={{
                        count: 3,
                        style: {
                          color: "#fff",
                          backgroundColor: "#252b2b",
                        },
                      }}
                    >
                      {group.students.map((item) => (
                        <Tooltip
                          key={item.id}
                          title={item.student?.fullName ?? ""}
                        >
                          <Avatar
                            className="student-avatar"
                          >
                            {(item.student?.fullName ?? "?")
                              .charAt(0)
                              .toUpperCase()}
                          </Avatar>
                        </Tooltip>
                      ))}
                    </Avatar.Group>
                  )}
                </div>

                {/* ACTIONS */}

                <div className="group-actions">
                  <Button
                    icon={<EditOutlined />}
                    className="edit-btn"
                  >
                    Tahrirlash
                  </Button>

                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    className="delete-btn"
                  >
                    O'chirish
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}
        </>
      )}

      <Modal
        title="Yangi guruh"
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
            label="Guruh nomi"
            rules={[{ required: true, message: "Nomini kiriting" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="directionId"
            label="Yo'nalish"
            rules={[{ required: true, message: "Yo'nalishni tanlang" }]}
          >
            <Select
              options={directionOptions.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
            />
          </Form.Item>
          <Form.Item
            name="teacherId"
            label="O'qituvchi"
            rules={[{ required: true, message: "O'qituvchini tanlang" }]}
          >
            <Select
              options={teachers.map((item) => ({
                value: item.id,
                label: item.fullName,
              }))}
            />
          </Form.Item>
          <Form.Item
            name="startDate"
            label="Boshlanish sanasi"
            rules={[{ required: true, message: "Sanani tanlang" }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            name="startTime"
            label="Dars vaqti"
            rules={[{ required: true, message: "Vaqtni kiriting" }]}
          >
            <Input type="time" />
          </Form.Item>
          <Form.Item
            name="lessonDays"
            label="Dars kunlari"
            rules={[{ required: true, message: "Kunlarni tanlang" }]}
          >
            <Select
              mode="multiple"
              options={Object.entries(dayLabels).map(([value, label]) => ({
                value,
                label,
              }))}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}