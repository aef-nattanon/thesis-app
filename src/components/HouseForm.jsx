import {
  Button, Form, Input,
  Select
} from 'antd';

import { useNavigate } from 'react-router-dom';


const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const { Option } = Select;

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: 'ต้องระบุ ${label}',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */

const HouseForm = ({
  handleDeleteHouse,
  textSubmit = "เพิ่ม",
  initialValues = {},
  onFinish = (values) => {
    console.log(values);
  },
  isLoading = false }) => {

  const navigate = useNavigate();

  return (
    <Form
      {...layout}
      name="nest-messages"
      initialValues={initialValues}
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
      validateMessages={validateMessages}
    >
      <Form.Item
        name='house_number'
        label="บ้านเลขที่"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='unit_number'
        label="เลขผู้ใช้น้ำ"
        rules={[
          {
            // required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name='address' label="ที่อยู่">
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        name='decimal_places'
        label="จำนวนทศนิยม" rules={[
          {
            required: true,
          },
        ]}>
        <Select placeholder="เลือกจำนวนทศนิยม">
          <Option value="0">0</Option>
          <Option value="1">1</Option>
          <Option value="2">2</Option>
          <Option value="3">3</Option>
          <Option value="4">4</Option>
          <Option value="5">5</Option>
        </Select>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          ...layout.wrapperCol,
          offset: 8,
        }}
      >
        <Button
          className='ml-3'
          disabled={isLoading}
          onClick={() => {
            navigate(`/`);
          }}
          htmlType="button">
          กลับ
        </Button>
        {handleDeleteHouse && <Button
          className='ml-3'
          disabled={isLoading}
          onClick={handleDeleteHouse}
          style={{ backgroundColor: "#F0431E" }}
          type="primary" htmlType="button">
          ลบบ้าน
        </Button>}
        <Button
          className='ml-3'
          loading={isLoading}
          style={{ backgroundColor: "#1890ff" }}
          type="primary" htmlType="submit">
          {textSubmit}
        </Button>

      </Form.Item>
    </Form >
  )
};
export default HouseForm;