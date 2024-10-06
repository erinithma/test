import { useForm, SubmitHandler } from "react-hook-form";
import { Button, FormGroup } from "reactstrap";
import style from "../App.module.scss";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { set } from "../redux/slices";
import { getState } from "../redux/selectors";
import { Input } from "../shared/input";
import { Page } from "../common/const";
import { i18n } from "../locale/i18n";

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
    nav(Page.Step2);
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
          title={i18n.t("field.phone")}
          error={errors.phone}
          name="phone"
          handleBlur={handleBlur}
        />
      </FormGroup>

      <FormGroup>
        <Input
          control={control}
          required
          title={i18n.t("field.name")}
          error={errors.name}
          name="name"
          handleBlur={handleBlur}
        />
      </FormGroup>

      <FormGroup>
        <Input
          control={control}
          required
          title={i18n.t("field.surname")}
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
          title={i18n.t("field.gender")}
          name="gender"
          handleBlur={handleBlur}
        >
          <option value="m">{i18n.t("gender.m")}</option>
          <option value="f">{i18n.t("gender.f")}</option>
        </Input>
      </FormGroup>

      <Button type="submit">{i18n.t("button.next")}</Button>
    </form>
  );
};
