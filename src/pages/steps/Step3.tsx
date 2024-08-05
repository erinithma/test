import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  Button,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import style from "../../App.module.scss";
import { ERROR_REQUIRED, URL_SEND } from "../../common/const";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, selectState } from "../../redux/store";
import { set } from "../../redux/slices";
import InputSlider from "react-input-slider";
import { Request } from "../../common/request";

interface IForm extends Record<string, string> {
  count: string;
  period: string;
}

export const Step3 = () => {
  const initial = useSelector((state: RootState) => selectState(state));

  const { handleSubmit, control, getValues } = useForm<IForm>({
    defaultValues: useMemo(() => {
      return initial;
    }, [initial]),
  });

  const onSubmit: SubmitHandler<IForm> = () => {
    Request.post(URL_SEND, {
      title: name + " " + surname,
    }).then(() => toggle());
  };

  const dispatch = useDispatch();

  const handleBlur = () => {
    dispatch(set(getValues()));
  };

  const { name, surname, count, period } = initial;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal((m) => !m);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={style.mainForm}>
        <FormGroup>
          <Label htmlFor="count">Сумма займа</Label>
          <Controller
            control={control}
            rules={{
              required: { value: true, message: ERROR_REQUIRED },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <InputSlider
                  xmax={1000}
                  xmin={200}
                  xstep={100}
                  axis="x"
                  x={Number(value)}
                  onChange={({ x }) => {
                    onChange(x.toString());
                    handleBlur();
                    onBlur();
                  }}
                />
                <br />${value}
              </>
            )}
            name="count"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="period">Период займа</Label>
          <Controller
            control={control}
            rules={{
              required: { value: true, message: ERROR_REQUIRED },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <InputSlider
                  xmin={10}
                  xmax={30}
                  xstep={1}
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
              </>
            )}
            name="period"
          />
        </FormGroup>

        <div className="d-flex justify-content-between">
          <Button type="submit">Подать заявку</Button>
        </div>
      </form>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Успех!</ModalHeader>
        <ModalBody>
          Поздравляем, {surname} {name}, вам одобрена сумма ${count} на {period}{" "}
          дней
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Ok
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
