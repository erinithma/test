import { useForm, SubmitHandler } from "react-hook-form";
import { Button, FormGroup } from "reactstrap";
import style from "../App.module.scss";
import { useNavigate } from "react-router";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaces, set } from "../redux/slices";
import { getPlaces, getState } from "../redux/selectors";
import { store } from "../redux/store";
import { Input } from "../shared/input";

interface IForm extends Record<string, string> {
  job: string;
  address: string;
}

export const Step2 = () => {
  const initial = useSelector(getState);
  const places = useSelector(getPlaces);

  const {
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm<IForm>({
    defaultValues: useMemo(() => {
      return initial;
    }, [initial, places]),
  });

  const nav = useNavigate();

  const onSubmit: SubmitHandler<IForm> = () => {
    nav("/test/3");
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
      <FormGroup>
        <Input
          control={control}
          title="Место работы"
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
          title="Адрес проживания"
          control={control}
          required
          handleBlur={handleBlur}
          error={errors.job}
          name="address"
        />
      </FormGroup>

      <div className="d-flex justify-content-between">
        <Button type="button" onClick={() => nav("/test/")}>
          Назад
        </Button>
        <Button type="submit">Далее</Button>
      </div>
    </form>
  );
};
