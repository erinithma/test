import { FC } from "react";
import { Controller } from "react-hook-form";
import { Label } from "reactstrap";
import { InputType } from "reactstrap/types/lib/Input";
import InputSlider from "react-input-slider";

interface SliderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  handleBlur: () => void;
  name: string;
  type?: InputType;
  title: string;
  max: number;
  min: number;
  step: number;
}

export const Slider: FC<SliderProps> = ({
  control,
  handleBlur = () => {},
  name,
  title,
  max,
  min,
  step,
}) => (
  <>
    <Label>{title}</Label>
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <div>
          <InputSlider
            xmax={max}
            xmin={min}
            xstep={step}
            axis="x"
            x={Number(value)}
            onChange={({ x }) => {
              onChange(x.toString());
              handleBlur();
              onBlur();
            }}
          />
          <br />
          {value}
        </div>
      )}
      name={name}
    />
  </>
);
