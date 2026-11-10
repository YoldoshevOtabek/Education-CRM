import { useState } from "react";
import {
  Button,
  Card,
  Empty,
  Form,
  Input,
  Modal,
  Select,
  Table,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

type ReceptionItem = {
  id: number;
  fullName: string;
  phone: string;
  note?: string;
  status: "NEW" | "CALLED";
};

export default function Reception() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<ReceptionItem[]>([]);
  const [form] = Form.useForm<Omit<ReceptionItem, "id">>();

  const handleAdd = async () => {
    try {
      const values = await form.validateFields();
      setItems((prev) => [
        {
          id: Date.now(),
          fullName: values.fullName,
          phone: values.phone,
          note: values.note,
          status: values.status ?? "NEW",
        },
        ...prev,
      ]);
      message.success("Qabul yozuvi qo'shildi");
      setOpen(false);
      form.resetFields();
    } catch {
      return;
    }
  };

  return (
    <div className="simple-page">
      <div className="simple-page-header">
        <div>
          <h1 className="text-2xl font-semibold m-0">Reception</h1>
          <p className="text-[var(--text-muted)] mt-1 mb-0">
            Qabuldagi murojaatlarni boshqarish
          </p>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>
          Add Reception
        </Button>
      </div>

      <Card>
        {items.length === 0 ? (
          <Empty description="Hozircha qabul yozuvlari yo'q" />
        ) : (
          <Table
            rowKey="id"
            dataSource={items}
            pagination={false}
            columns={[
              { title: "Ism", dataIndex: "fullName" },
              { title: "Telefon", dataIndex: "phone" },
              { title: "Izoh", dataIndex: "note" },
              { title: "Status", dataIndex: "status" },
            ]}
          />
        )}
      </Card>

      <Modal
        title="Add Reception"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={handleAdd}
        okText="Saqlash"
        destroyOnHidden
      >
        <Form form={form} layout="vertical" initialValues={{ status: "NEW" }}>
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
          <Form.Item name="note" label="Izoh">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="status" label="Status">
            <Select
              options={[
                { value: "NEW", label: "NEW" },
                { value: "CALLED", label: "CALLED" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
