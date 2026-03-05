import { Form, DatePicker } from 'antd';
import type { Dayjs } from 'dayjs';
import type { Rule } from 'antd/es/form';

interface FormDateFieldProps {
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  disabledDate?: (current: Dayjs) => boolean;
  rules?: Rule[];
  minDate?: Dayjs;
  onChange?: () => void;
}

export function FormDateField({
  name,
  label,
  required,
  disabled,
  placeholder = 'Tarih seçin',
  disabledDate,
  rules,
  minDate,
  onChange,
}: FormDateFieldProps) {
  const defaultRules: Rule[] = rules ?? [{ required: required ?? true, message: `${label} gerekli` }];

  return (
    <Form.Item
      name={name}
      label={label}
      rules={defaultRules}
    >
      <DatePicker
        style={{ width: '100%' }}
        format="DD.MM.YYYY"
        placeholder={placeholder}
        disabled={disabled}
        disabledDate={disabledDate}
        onChange={() => onChange?.()}
        minDate={minDate}
      />
    </Form.Item>
  );
}
