import { useForm, SubmitHandler } from "react-hook-form";
import {
  Button,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import style from "../App.module.scss";
import { Url } from "../common/const";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { set } from "../redux/slices";
import { Request } from "../common/request";
import { getState } from "../redux/selectors";
import { Slider } from "../shared/slider";

interface IForm extends Record<string, string> {
  count: string;
  period: string;
}

export const Step3 = () => {
  const initial = useSelector(getState);

  const { handleSubmit, control, getValues } = useForm<IForm>({
    defaultValues: useMemo(() => {
      return initial;
    }, [initial]),
  });

  const onSubmit: SubmitHandler<IForm> = () => {
    Request.post(Url.Send, {
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
          <Slider
            title="Сумма займа"
            control={control}
            max={1000}
            min={200}
            step={100}
            handleBlur={handleBlur}
            name="count"
          />
        </FormGroup>

        <FormGroup>
          <Slider
            title="Период займа"
            control={control}
            max={30}
            min={10}
            step={1}
            handleBlur={handleBlur}
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
