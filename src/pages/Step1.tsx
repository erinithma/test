import { useForm, SubmitHandler } from "react-hook-form";
import { Button, FormGroup } from "reactstrap";
import style from "../App.module.scss";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { set } from "../redux/slices";
import { getState } from "../redux/selectors";
import { Input } from "../shared/input";

interface IForm extends Record<string, string> {
  phone: string;
  name: string;
  surname: string;
  gender: string;
}

export const Step1 = () => {
  const initial = useSelector(getState);

  const {
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm<IForm>({
    defaultValues: initial,
  });

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<IForm> = () => {
    nav("/test/2");
  };

  const handleBlur = () => {
    dispatch(set(getValues()));
  };

  const nav = useNavigate();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.mainForm}>
      <FormGroup>
        <Input
          control={control}
          required
          pattern={/\d{3}\s\d{3}\s\d{3}/}
          type="tel"
          placeholder="0999 999 999"
          title="Телефон"
          error={errors.phone}
          name="phone"
          handleBlur={handleBlur}
        />
      </FormGroup>

      <FormGroup>
        <Input
          control={control}
          required
          title="Имя"
          error={errors.name}
          name="name"
          handleBlur={handleBlur}
        />
      </FormGroup>

      <FormGroup>
        <Input
          control={control}
          required
          title="Фамилия"
          error={errors.surname}
          name="surname"
          handleBlur={handleBlur}
        />
      </FormGroup>

      <FormGroup>
        <Input
          control={control}
          type="select"
          error={errors.gender}
          title="Пол"
          name="gender"
          handleBlur={handleBlur}
        >
          <option value="m">Мужской</option>
          <option value="f">Женский</option>
        </Input>
      </FormGroup>

      <Button type="submit">Далее</Button>
    </form>
  );
};
