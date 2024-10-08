import { useForm, SubmitHandler } from "react-hook-form";
import { Alert, Button, FormGroup } from "reactstrap";
import style from "../App.module.scss";
import { useNavigate } from "react-router";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaces, set } from "../redux/slices";
import { getApiState, getPlaces, getState } from "../redux/selectors";
import { store } from "../redux/store";
import { Input } from "../shared/input";
import { Page } from "../common/const";
import { i18n } from "../locale/i18n";

interface IForm extends Record<string, string> {
  job: string;
  address: string;
}

export const Step2 = () => {
  const initial = useSelector(getState);
  const places = useSelector(getPlaces);
  const apiState = useSelector(getApiState);

  const {
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm<IForm>({
    defaultValues: useMemo(() => {
      return initial;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initial, places]),
  });

  const nav = useNavigate();

  const onSubmit: SubmitHandler<IForm> = () => {
    nav(Page.Step3);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    store.dispatch(fetchPlaces());
  }, []);

  const handleBlur = () => {
    dispatch(set(getValues()));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.mainForm}>
      {!apiState ? (
        <Alert color="danger">{i18n.t("error.httpFail")}</Alert>
      ) : null}

      <FormGroup>
        <Input
          control={control}
          title={i18n.t("field.job")}
          name="job"
          type="select"
          error={errors.job}
          handleBlur={handleBlur}
        >
          {places.map((place) => (
            <option key={place} value={place}>
              {place}
            </option>
          ))}
        </Input>
      </FormGroup>

      <FormGroup>
        <Input
          title={i18n.t("field.address")}
          control={control}
          required
          handleBlur={handleBlur}
          error={errors.address}
          name="address"
        />
      </FormGroup>

      <div className="d-flex justify-content-between">
        <Button type="button" onClick={() => nav(Page.Step1)}>
          {i18n.t("button.back")}
        </Button>
        <Button type="submit">{i18n.t("button.next")}</Button>
      </div>
    </form>
  );
};
