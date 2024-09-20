import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import style from "../App.module.scss";
import { ERROR_INVALID_FORMAT, ERROR_REQUIRED } from "../common/const";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { set } from "../redux/slices";
import { getState } from "../redux/selectors";

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
        <Label htmlFor="phone">Телефон</Label>
        <Controller
          rules={{
            required: { value: true, message: ERROR_REQUIRED },
            pattern: {
              value: /\d{3}\s\d{3}\s\d{3}/,
              message: ERROR_INVALID_FORMAT,
            },
          }}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              type="tel"
              placeholder="0999 999 999"
              id="phone"
              onChange={onChange}
              onBlur={() => {
                handleBlur(), onBlur();
              }}
              value={value}
              invalid={!!errors.phone}
            />
          )}
          name="phone"
        />
        {errors.phone && <FormFeedback>{errors.phone.message}</FormFeedback>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="name">Имя</Label>
        <Controller
          control={control}
          rules={{
            required: { value: true, message: ERROR_REQUIRED },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              id="name"
              onChange={onChange}
              onBlur={() => {
                handleBlur(), onBlur();
              }}
              value={value}
              invalid={!!errors.name}
            />
          )}
          name="name"
        />
        {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="surname">Фамилия</Label>
        <Controller
          control={control}
          rules={{
            required: { value: true, message: ERROR_REQUIRED },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              id="surname"
              onChange={onChange}
              onBlur={() => {
                handleBlur(), onBlur();
              }}
              value={value}
              invalid={!!errors.surname}
            />
          )}
          name="surname"
        />
        {errors.surname && (
          <FormFeedback>{errors.surname.message}</FormFeedback>
        )}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="gender">Пол</Label>
        <div>
          <Controller
            rules={{
              required: { value: true, message: ERROR_REQUIRED },
            }}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                id="gender"
                type="select"
                onChange={onChange}
                onBlur={() => {
                  handleBlur(), onBlur();
                }}
                value={value}
                invalid={!!errors.gender}
              >
                <option value="m">Мужской</option>
                <option value="f">Женский</option>
              </Input>
            )}
            name="gender"
          />
        </div>
        {errors.gender && <FormFeedback>{errors.gender.message}</FormFeedback>}
      </FormGroup>

      <Button type="submit">Далее</Button>
    </form>
  );
};
