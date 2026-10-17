import { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  Empty,
  Pagination,
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
} from "@ant-design/icons";

import { studentService } from "./services/student";

import type { Student } from "./types/student";

const { Title, Text } = Typography;

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const getStudents = async (
    page = 1,
    limit = 10
  ) => {
    try {
      setLoading(true);

      const res = await studentService.getStudents(
        page,
        limit
      );

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
    getStudents();
  }, []);

  const handlePageChange = (page: number, pageSize: number) => {
    getStudents(page, pageSize);
  };

  const columns = [
    {
      title: "STUDENT",
      key: "student",

      render: (_: unknown, record: Student) => (
        <Space size={12}>
          <Avatar
            size={44}
            style={{
              backgroundColor: "#172020",
              color: "#4ADE80",
            }}
            icon={<UserOutlined />}
          />

          <div>
            <Text
              strong
              style={{
                color: "#F5F5F5",
                fontSize: 14,
              }}
            >
              {record.fullName}
            </Text>

            <div
              style={{
                marginTop: 3,
              }}
            >
              <Text
                style={{
                  color: "#737373",
                  fontSize: 12,
                }}
              >
                ID: #{record.id}
              </Text>
            </div>
          </div>
        </Space>
      ),
    },

    {
      title: "PHONE",
      key: "phone",

      render: (_: unknown, record: Student) => (
        <Space>
          <PhoneOutlined
            style={{
              color: "#737373",
            }}
          />

          <Text
            style={{
              color: "#A3A3A3",
            }}
          >
            {record.phone}
          </Text>
        </Space>
      ),
    },

    {
      title: "DIRECTION",
      key: "direction",

      render: (_: unknown, record: Student) => (
        <Tag
          icon={<BookOutlined />}
          style={{
            background: "#101D1D",
            borderColor: "#164E4E",
            color: "#4ADE80",
            padding: "4px 9px",
            borderRadius: 6,
          }}
        >
          {record.direction?.name}
        </Tag>
      ),
    },

    {
      title: "LEVEL",
      dataIndex: "level",
      key: "level",

      render: (level: string) => (
        <Tag
          style={{
            background: "#151818",
            borderColor: "#292D2D",
            color: "#D4D4D4",
            borderRadius: 6,
          }}
        >
          {(level ?? "").replaceAll("_", " ")}
        </Tag>
      ),
    },

    {
      title: "GENDER",
      dataIndex: "gender",
      key: "gender",

      render: (gender: string) => (
        <Text
          style={{
            color: "#A3A3A3",
          }}
        >
          {gender === "MALE" ? "Male" : "Female"}
        </Text>
      ),
    },

    {
      title: "GROUPS",
      key: "groups",

      render: (_: unknown, record: Student) => (
        <Space>
          <TeamOutlined
            style={{
              color: "#737373",
            }}
          />

          <Text
            style={{
              color: "#D4D4D4",
            }}
          >
            {record.groups?.length || 0}
          </Text>
        </Space>
      ),
    },

    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",

      render: (status: string) => (
        <Tag
          style={{
            background:
              status === "ACTIVE"
                ? "#102318"
                : "#211A10",

            borderColor:
              status === "ACTIVE"
                ? "#245C3A"
                : "#60451C",

            color:
              status === "ACTIVE"
                ? "#4ADE80"
                : "#FBBF24",

            borderRadius: 6,
            padding: "3px 9px",
          }}
        >
          {status}
        </Tag>
      ),
    },

    {
      title: "BIRTH DATE",
      key: "birthDate",

      render: (_: unknown, record: Student) => (
        <Space>
          <CalendarOutlined
            style={{
              color: "#737373",
            }}
          />

          <Text
            style={{
              color: "#A3A3A3",
            }}
          >
            {new Date(record.birthDate).toLocaleDateString(
              "uz-UZ"
            )}
          </Text>
        </Space>
      ),
    },
  ];

  return (
    <div
      style={{
        minHeight: "100%",
        background: "#0A0C0C",
        padding: 24,
      }}
    >
      {/* HEADER */}

      <div
        style={{
          marginBottom: 24,
        }}
      >
        <Title
          level={2}
          style={{
            color: "#F5F5F5",
            margin: 0,
          }}
        >
          Students
        </Title>

        <Text
          style={{
            color: "#737373",
          }}
        >
          Barcha studentlar ro'yxati
        </Text>
      </div>

      {/* MAIN CARD */}

      <Card
        style={{
          background: "#0A0C0C",
          border: "1px solid #1C2222",
          borderRadius: 12,
        }}
        styles={{
          body: {
            padding: 0,
          },
          header: {
            background: "#0A0C0C",
            borderBottom: "1px solid #1C2222",
          },
        }}
        title={
          <div>
            <div
              style={{
                color: "#F5F5F5",
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              Studentlar
            </div>

            <div
              style={{
                color: "#737373",
                fontSize: 12,
                fontWeight: 400,
                marginTop: 3,
              }}
            >
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
          scroll={{
            x: 1100,
          }}
          rowClassName={() => "dark-student-row"}
          locale={{
            emptyText: loading ? (
              <span />
            ) : (
              <Empty
                description={
                  <span style={{ color: "#737373" }}>
                    Studentlar topilmadi
                  </span>
                }
              />
            ),
          }}
        />

        <div
          style={{
            padding: "18px 20px",
            display: "flex",
            justifyContent: "flex-end",
            borderTop: "1px solid #1C2222",
            background: "#0A0C0C",
          }}
        >
          <Pagination
            current={pagination.page}
            pageSize={pagination.limit}
            total={pagination.total}
            showSizeChanger
            pageSizeOptions={[10, 20, 50]}
            onChange={handlePageChange}
            disabled={loading}
            showTotal={(total) => `Jami ${total} ta`}
          />
        </div>
      </Card>

      {/* CUSTOM TABLE STYLE */}

      <style>
        {`
          .dark-student-row > td {
            background: #0A0C0C !important;
            border-bottom: 1px solid #1C2222 !important;
          }

          .dark-student-row:hover > td {
            background: #101414 !important;
          }

          .ant-table {
            background: #0A0C0C !important;
            color: #F5F5F5 !important;
          }

          .ant-table-container {
            background: #0A0C0C !important;
          }

          .ant-table-thead > tr > th {
            background: #101414 !important;
            color: #737373 !important;
            border-bottom: 1px solid #1C2222 !important;
            font-size: 11px !important;
            font-weight: 600 !important;
            letter-spacing: .5px;
          }

          .ant-table-tbody > tr > td {
            background: #0A0C0C !important;
          }

          .ant-table-cell {
            border-inline-end: none !important;
          }

          .ant-table-tbody > tr:hover > td {
            background: #101414 !important;
          }

          .ant-pagination-item {
            background: #101414 !important;
            border-color: #292D2D !important;
          }

          .ant-pagination-item a {
            color: #A3A3A3 !important;
          }

          .ant-pagination-item-active {
            background: #102318 !important;
            border-color: #245C3A !important;
          }

          .ant-pagination-item-active a {
            color: #4ADE80 !important;
          }

          .ant-pagination-prev button,
          .ant-pagination-next button {
            background: #101414 !important;
            color: #A3A3A3 !important;
            border-color: #292D2D !important;
          }

          .ant-pagination-options .ant-select-selector {
            background: #101414 !important;
            border-color: #292D2D !important;
            color: #A3A3A3 !important;
          }
        `}
      </style>
    </div>
  );
}