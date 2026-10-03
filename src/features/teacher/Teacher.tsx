import React, { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Button,
  Input,
  Modal,
  Space,
  Avatar,
  Empty,
} from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  TeamOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import "./styles/teacher.css";
import type { TeacherType } from "./types/teacher";
import { teacherService } from "./services/teacher";

const Teacher: React.FC = () => {
  const [teachers, setTeachers] = useState<TeacherType[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [selectedTeacher, setSelectedTeacher] =
    useState<TeacherType | null>(null);

  const [open, setOpen] = useState(false);

  const getTeachers = async () => {
    try {
      setLoading(true);

      const res = await teacherService.getTeachers(1, 50);
      setTeachers(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Teachers error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTeachers();
  }, []);

  const filteredTeachers = teachers.filter((teacher) =>
    `${teacher.fullName} ${teacher.phone} ${teacher.direction?.name ?? ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const columns = [
    {
      title: "Teacher",
      key: "teacher",
      render: (_: unknown, record: TeacherType) => (
        <div className="teacher-user">
          <Avatar
            size={42}
            icon={<UserOutlined />}
            className="teacher-avatar"
          />

          <div>
            <div className="teacher-name">
              {record.fullName}
            </div>

            <div className="teacher-id">
              ID: #{record.id}
            </div>
          </div>
        </div>
      ),
    },

    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (phone: string) => (
        <div className="phone">
          <PhoneOutlined />
          {phone}
        </div>
      ),
    },

    {
      title: "Direction",
      key: "direction",
      render: (_: unknown, record: TeacherType) => (
        <Tag className="direction-tag">
          {record.direction?.name ?? "-"}
        </Tag>
      ),
    },

    {
      title: "Experience",
      key: "experience",
      render: (_: unknown, record: TeacherType) => (
        <span className="experience">
          {record.experience} yil
        </span>
      ),
    },

    {
      title: "Groups",
      key: "groups",
      render: (_: unknown, record: TeacherType) => (
        <div className="groups-count">
          <TeamOutlined />
          {record.groups?.length ?? 0}
        </div>
      ),
    },

    {
      title: "Status",
      key: "status",
      render: (_: unknown, record: TeacherType) => (
        <Tag
          className={
            record.status === "ACTIVE"
              ? "status-active"
              : "status-inactive"
          }
        >
          <span className="status-dot" />
          {record.status}
        </Tag>
      ),
    },

    {
      title: "Actions",
      key: "actions",
      width: 160,
      render: (_: unknown, record: TeacherType) => (
        <Space>
          <Button
            className="action-btn"
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedTeacher(record);
              setOpen(true);
            }}
          />

          <Button
            className="action-btn edit"
            icon={<EditOutlined />}
          />

          <Button
            className="action-btn delete"
            danger
            icon={<DeleteOutlined />}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="teacher-page">

      {/* HEADER */}

      <div className="teacher-header">

        <div>
          <h1>Teachers</h1>

          <p>
            O'qituvchilar va ularning guruhlarini boshqarish
          </p>
        </div>

        <Button
          type="primary"
          className="add-teacher-btn"
          icon={<UserOutlined />}
        >
          Add Teacher
        </Button>

      </div>

      {/* STATISTICS */}

      <div className="teacher-stats">

        <div className="stat-card">
          <div className="stat-icon">
            <UserOutlined />
          </div>

          <div>
            <span>Total Teachers</span>
            <strong>{teachers.length}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <TeamOutlined />
          </div>

          <div>
            <span>Active Teachers</span>

            <strong>
              {
                teachers.filter(
                  (item) => item.status === "ACTIVE"
                ).length
              }
            </strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <TeamOutlined />
          </div>

          <div>
            <span>Total Groups</span>

            <strong>
              {teachers.reduce(
                (sum, teacher) =>
                  sum + (teacher.groups?.length ?? 0),
                0
              )}
            </strong>
          </div>
        </div>

      </div>

      {/* TABLE CARD */}

      <div className="teacher-table-card">

        <div className="table-top">

          <div>
            <h2>All Teachers</h2>

            <span>
              {filteredTeachers.length} ta teacher
            </span>
          </div>

          <Input
            className="teacher-search"
            prefix={<SearchOutlined />}
            placeholder="Search teacher..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <Table
          rowKey="id"
          loading={loading}
          columns={columns}
          dataSource={filteredTeachers}
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
          }}
          className="teacher-table"
        />

      </div>

      {/* TEACHER DETAILS */}

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={750}
        centered
        className="teacher-modal"
      >

        {selectedTeacher && (
          <div className="teacher-details">

            <div className="details-header">

              <Avatar
                size={64}
                icon={<UserOutlined />}
                className="details-avatar"
              />

              <div>
                <h2>
                  {selectedTeacher.fullName}
                </h2>

                <p>
                  {selectedTeacher.direction?.name ?? "-"} Teacher
                </p>
              </div>

            </div>

            <div className="details-info">

              <div>
                <span>Phone</span>
                <strong>
                  {selectedTeacher.phone}
                </strong>
              </div>

              <div>
                <span>Experience</span>
                <strong>
                  {selectedTeacher.experience} yil
                </strong>
              </div>

              <div>
                <span>Direction</span>
                <strong>
                  {selectedTeacher.direction?.name ?? "-"}
                </strong>
              </div>

              <div>
                <span>Status</span>

                <Tag
                  className={
                    selectedTeacher.status === "ACTIVE"
                      ? "status-active"
                      : "status-inactive"
                  }
                >
                  {selectedTeacher.status}
                </Tag>
              </div>

            </div>

            <div className="groups-section">

              <div className="groups-title">
                <h3>Groups</h3>

                <span>
                  {selectedTeacher.groups?.length ?? 0} groups
                </span>
              </div>

              {!selectedTeacher.groups?.length ? (
                <Empty
                  description="Teacherda guruh mavjud emas"
                />
              ) : (
                selectedTeacher.groups.map((group) => (

                  <div
                    className="group-card"
                    key={group.id}
                  >

                    <div className="group-main">

                      <div>
                        <h4>{group.name}</h4>

                        <span>
                          {(group.lessonDays ?? []).join(" · ")}
                        </span>
                      </div>

                      <strong>
                        {group.startTime}
                      </strong>

                    </div>

                    <div className="group-bottom">

                      <span>
                        <TeamOutlined />
                        {group.students?.length ?? 0} students
                      </span>

                      <Tag className="status-active">
                        {group.status}
                      </Tag>

                    </div>

                  </div>

                ))
              )}

            </div>

          </div>
        )}

      </Modal>

    </div>
  );
};

export default Teacher;