import { useEffect, useState } from "react";
import {
  Card,
  Col,
  Row,
  Statistic,
  Table,
  Tag,
  Avatar,
  Space,
  Spin,
  Typography,
  Empty,
} from "antd";

import {
  TeamOutlined,
  UserOutlined,
  ApartmentOutlined,
  BookOutlined,
  ClockCircleOutlined,
  PhoneOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";

import { dashboardService } from "./services/dashboard";

import type {
  DashboardResponse,
  Student,
} from "./types/dashboard";

import "./styles/Dashboard.css";

const { Title, Text } = Typography;

export default function Dashboard() {
  const [dashboard, setDashboard] =
    useState<DashboardResponse | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDashboard = async () => {
      try {
        const res = await dashboardService.getDashboard();
        setDashboard(res);
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    getDashboard();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <Spin size="large" />
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="dashboard-empty">
        <Empty description="Dashboard ma'lumotlari topilmadi" />
      </div>
    );
  }

  const { stats, recentStudents, recentGroups } =
    dashboard.data;

  const studentColumns = [
    {
      title: "STUDENT",
      key: "student",

      render: (_: unknown, record: Student) => (
        <Space size={12}>
          <Avatar
            size={42}
            className="student-avatar"
            icon={<UserOutlined />}
          />

          <div>
            <Text className="student-name">
              {record.fullName}
            </Text>

            <div className="student-phone">
              <PhoneOutlined /> {record.phone}
            </div>
          </div>
        </Space>
      ),
    },

    {
      title: "DIRECTION",
      key: "direction",

      render: (_: unknown, record: Student) => (
        <Tag className="direction-tag">
          {record.direction.name}
        </Tag>
      ),
    },

    {
      title: "LEVEL",
      dataIndex: "level",
      key: "level",

      render: (level: string) => (
        <Text className="level-text">
          {level.replaceAll("_", " ")}
        </Text>
      ),
    },

    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",

      render: (status: string) => (
        <Tag
          className={
            status === "ACTIVE"
              ? "status-active"
              : "status-warning"
          }
        >
          {status}
        </Tag>
      ),
    },
  ];

  return (
    <div className="dashboard">

      {/* HEADER */}

      <div className="dashboard-header">
        <div>
          <Title className="dashboard-title">
            Dashboard
          </Title>

          <Text className="dashboard-subtitle">
            CRM tizimining umumiy statistikasi
          </Text>
        </div>
      </div>


      {/* STATISTICS */}

      <Row gutter={[18, 18]}>

        {/* STUDENTS */}

        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">

            <Statistic
              title="Jami studentlar"
              value={stats.totalStudents}
              prefix={
                <div className="stat-icon green">
                  <TeamOutlined />
                </div>
              }
            />

            <div className="stat-footer green-text">
              <ArrowUpOutlined />
              <span> Active students</span>
            </div>

          </Card>
        </Col>


        {/* TEACHERS */}

        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">

            <Statistic
              title="Jami o'qituvchilar"
              value={stats.totalTeachers}
              prefix={
                <div className="stat-icon blue">
                  <UserOutlined />
                </div>
              }
            />

            <div className="stat-footer blue-text">
              <ArrowUpOutlined />
              <span> Active teachers</span>
            </div>

          </Card>
        </Col>


        {/* GROUPS */}

        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">

            <Statistic
              title="Jami guruhlar"
              value={stats.totalGroups}
              prefix={
                <div className="stat-icon purple">
                  <ApartmentOutlined />
                </div>
              }
            />

            <div className="stat-footer purple-text">
              <ArrowUpOutlined />
              <span> Active groups</span>
            </div>

          </Card>
        </Col>


        {/* DIRECTIONS */}

        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">

            <Statistic
              title="Yo'nalishlar"
              value={stats.totalDirections}
              prefix={
                <div className="stat-icon orange">
                  <BookOutlined />
                </div>
              }
            />

            <div className="stat-footer orange-text">
              <ArrowUpOutlined />
              <span> Active directions</span>
            </div>

          </Card>
        </Col>

      </Row>


      {/* STUDENTS */}

      <Card
        className="dashboard-card"
        title={
          <div>
            <div className="card-title">
              So'nggi studentlar
            </div>

            <div className="card-subtitle">
              Oxirgi qo'shilgan studentlar
            </div>
          </div>
        }
      >

        <Table
          rowKey="id"
          columns={studentColumns}
          dataSource={recentStudents}
          pagination={false}
          scroll={{ x: 700 }}
        />

      </Card>


      {/* GROUPS */}

      <div className="groups-section">

        <div className="section-title">
          So'nggi guruhlar
        </div>

        <div className="section-subtitle">
          CRM tizimidagi oxirgi guruhlar
        </div>


        <Row
          gutter={[18, 18]}
          style={{ marginTop: 18 }}
        >

          {recentGroups.map((group) => (

            <Col
              xs={24}
              sm={12}
              lg={8}
              key={group.id}
            >

              <Card
                className="group-card"

                title={
                  <span className="group-title">
                    {group.name}
                  </span>
                }

                extra={
                  <Tag className="status-active">
                    {group.status}
                  </Tag>
                }
              >

                <div className="group-row">
                  <Text className="group-label">
                    Direction
                  </Text>

                  <Tag className="direction-tag">
                    {group.direction.name}
                  </Tag>
                </div>


                <div className="group-row">
                  <Text className="group-label">
                    Teacher
                  </Text>

                  <Text className="group-value">
                    {group.teacher.fullName}
                  </Text>
                </div>


                <div className="group-row">
                  <Text className="group-label">
                    Students
                  </Text>

                  <span className="student-count">
                    {group.studentsCount}
                  </span>
                </div>


                <div className="group-row">
                  <Text className="group-label">
                    Lesson days
                  </Text>

                  <Text className="group-value">
                    {group.lessonDays
                      .map((day) => day.slice(0, 3))
                      .join(" / ")}
                  </Text>
                </div>


                <div className="group-row">
                  <Text className="group-label">
                    <ClockCircleOutlined /> Time
                  </Text>

                  <Text className="group-value">
                    {group.startTime}
                  </Text>
                </div>

              </Card>

            </Col>

          ))}

        </Row>

      </div>

    </div>
  );
}