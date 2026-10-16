import { useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Empty,
  Row,
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
import type { Group, LessonDay } from "./types/group";

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

  const getGroups = async () => {
    try {
      setLoading(true);

      const res = await groupService.getGroups(1, 10);

      if (res.success) {
        setGroups(res.data);
      }
    } catch (error) {
      console.error(error);

      messageApi.error("Guruhlarni yuklashda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGroups();
  }, []);

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
        >
          Yangi guruh
        </Button>
      </div>

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

      {loading ? (
        <div className="group-loading ">
          <Spin size="large" />
        </div>
      ) : groups.length === 0 ? (
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
                        {group.direction.name}
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
                        {group.teacher.fullName}
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

                  {group.students.length > 0 && (
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
                          title={item.student.fullName}
                        >
                          <Avatar
                            className="student-avatar"
                          >
                            {item.student.fullName
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
    </div>
  );
}