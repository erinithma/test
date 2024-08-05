import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import style from "../../App.module.scss";
import { ERROR_REQUIRED, URL_JOBS } from "../../common/const";
import { useNavigate } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { Request } from "../../common/request";
import { useDispatch, useSelector } from "react-redux";
import { RootState, selectState } from "../../redux/store";
import { set } from "../../redux/slices";

interface IForm extends Record<string, string> {
  job: string;
  address: string;
}

export const Step2 = () => {
  const initial = useSelector((state: RootState) => selectState(state));
  const [places, setPlaces] = useState<string[]>([]);

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
    nav("/3");
  };

  const getPlaces = async () => {
    setPlaces(await Request.get(URL_JOBS));
  };

  useEffect(() => {
    getPlaces();
  }, []);

  const dispatch = useDispatch();

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
        <Button type="button" onClick={() => nav("/")}>
          Назад
        </Button>
        <Button type="submit">Далее</Button>
      </div>
    </form>
  );
};
