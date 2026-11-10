import { useEffect, useState } from "react";
import { Button, Card, Empty, Form, Input, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { directionService } from "../directions/services/directions";
import type { CreateDirectionDto } from "../directions/types/directions";

export default function Course() {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form] = Form.useForm<CreateDirectionDto>();

  useEffect(() => {
    document.title = "Course";
  }, []);

  const handleAdd = async () => {
    try {
      const values = await form.validateFields();
      setSaving(true);
      await directionService.createDirection(values);
      message.success("Course qo'shildi");
      setOpen(false);
      form.resetFields();
    } catch (error) {
      if (error && typeof error === "object" && "errorFields" in error) return;
      message.error("Course qo'shishda xatolik yuz berdi");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="simple-page">
      <div className="simple-page-header">
        <div>
          <h1 className="text-2xl font-semibold m-0">Course</h1>
          <p className="text-[var(--text-muted)] mt-1 mb-0">
            Kurslarni boshqarish
          </p>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>
          Add Course
        </Button>
      </div>

      <Card>
        <Empty description="Kurs qo'shish uchun Add Course tugmasini bosing" />
      </Card>

      <Modal
        title="Add Course"
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
            label="Kurs nomi"
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
}
