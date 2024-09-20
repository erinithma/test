import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import style from "../../App.module.scss";
import { ERROR_REQUIRED } from "../../common/const";
import { useNavigate } from "react-router";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaces, set } from "../../redux/slices";
import { getPlaces, getState } from "../../redux/selectors";
import { store } from "../../redux/store";

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
        <Label htmlFor="job">Место работы</Label>
        <Controller
          control={control}
          rules={{
            required: { value: true, message: ERROR_REQUIRED },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              id="job"
              type="select"
              onChange={onChange}
              onBlur={() => {
                handleBlur(), onBlur();
              }}
              value={value}
              invalid={!!errors.job}
            >
              {places.map((place) => (
                <option key={place} value={place}>
                  {place}
                </option>
              ))}
            </Input>
          )}
          name="job"
        />
        {errors.job && <FormFeedback>{errors.job.message}</FormFeedback>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="address">Адрес проживания</Label>
        <Controller
          control={control}
          rules={{
            required: { value: true, message: ERROR_REQUIRED },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              id="address"
              onChange={onChange}
              onBlur={() => {
                handleBlur(), onBlur();
              }}
              value={value}
              invalid={!!errors.job}
            />
          )}
          name="address"
        />
        {errors.address && (
          <FormFeedback>{errors.address.message}</FormFeedback>
        )}
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
