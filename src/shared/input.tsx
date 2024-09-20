import { FC, ReactNode } from "react";
import { Controller, FieldError } from "react-hook-form";
import { FormFeedback, Label, Input as ReactstrapInput } from "reactstrap";
import { ERROR_INVALID_FORMAT, ERROR_REQUIRED } from "../common/const";
import { InputType } from "reactstrap/types/lib/Input";

interface InputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  handleBlur: () => void;
  error?: FieldError;
  name: string;
  required?: boolean;
  pattern?: RegExp;
  type?: InputType;
  placeholder?: string;
  children?: ReactNode;
  title: string;
}

export const Input: FC<InputProps> = ({
  control,
  handleBlur = () => {},
  error,
  name,
  required = false,
  pattern,
  type = "text",
  placeholder = "",
  children,
  title,
}) => (
  <>
    <Label htmlFor={name}>{title}</Label>
    <Controller
      control={control}
      rules={{
        required: required
          ? { value: true, message: ERROR_REQUIRED }
          : undefined,
        pattern: pattern
          ? {
              value: pattern,
              message: ERROR_INVALID_FORMAT,
            }
          : undefined,
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <ReactstrapInput
          id={name}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={() => {
            handleBlur(), onBlur();
          }}
          value={value}
          invalid={!!error}
        >
          {children}
        </ReactstrapInput>
      )}
      name={name}
    />
    {error && <FormFeedback>{error.message}</FormFeedback>}
  </>
);
