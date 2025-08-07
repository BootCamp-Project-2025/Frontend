import PropTypes from "prop-types";
import { TextInput } from "../../../../shared/components/molecules/TextInput";
import { Button } from "../../../../shared/components/atoms/Button";
import { useForm } from "react-hook-form";
import { DateInput } from "../../../../shared/components/molecules/DateInput";
import { isAvalidateUrl } from "../../utils/Validations";
import { useCallback, useState } from "react";
import { NumberInput } from "../../../../shared/components/molecules/NumberInput";
import { Title } from "../../../../shared/components/atoms/Title";

export default function SessionForm({ saveOrEdit, closePopup, session }) {
  const sessionDate = getDate();
  const [isAM, setIsAM] = useState(sessionDate.getHours() < 12);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      dateOfTheSession: getDateString(sessionDate),
      url: session ? session.url : "",
      hours: session ? sessionDate.getHours() - (isAM ? 0 : 12) : "",
      minutes: session ? sessionDate.getMinutes() : "",
    },
  });

  function getDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function getDate() {
    return session ? new Date(session.dateOfTheSession) : new Date();
  }

  const toAM = useCallback(() => {
    setIsAM(true);
  }, []);

  const toPM = useCallback(() => {
    setIsAM(false);
  }, []);

  const formatDoubleDigits = useCallback(
    (digits, isHour) => {
      if (isHour) {
        digits = Number(digits) + (isAM ? 0 : 12);
      }
      if (digits.toString().length === 1) return `0${digits}`;
      return digits;
    },
    [isAM]
  );

  const isAOldTime = useCallback(
    (completeTime) => {
      console.log(completeTime);
      if (new Date() >= completeTime) {
        setError("hours", {
          message: "This time has passed",
        });
        return true;
      }
      return false;
    },
    [setError]
  );

  const handleSave = useCallback(
    (data) => {
      const minutes = formatDoubleDigits(data.minutes);
      const hours = formatDoubleDigits(data.hours, true);
      const completeTime = new Date(
        `${data.dateOfTheSession}T${hours}:${minutes}:00`
      );
      if (isAOldTime(completeTime)) {
        return;
      }
      saveOrEdit(
        {
          ...session,
          id: session ? session.id : null,
          url: data.url,
          creationDate: session ? session.creationDate : new Date(),
          dateOfTheSession: new Date(completeTime),
        },
        "sessions"
      );
      closePopup();
    },
    [closePopup, formatDoubleDigits, isAOldTime, saveOrEdit, session]
  );

  return (
    <form
      onSubmit={handleSubmit(handleSave)}
      className="flex flex-col w-fit p-5 gap-5"
    >
      <Title className="text-center mt-2" color="default" size="xl">
        {session ? "Edit the session" : "Create a new session"}
      </Title>
      <DateInput
        {...register("dateOfTheSession", {
          required: "This field is required",
          min: {
            value: getDateString(new Date()),
            message: "Date can't be before today",
          },
        })}
        label="Day of the meeting"
        id={"startDate"}
        errorMessage={errors.dateOfTheSession?.message}
      ></DateInput>
      <div className="w-fit m-auto flex gap-3">
        <NumberInput
          label="Hours"
          {...register("hours", {
            required: "This field is required",
            min: { value: 0, message: "Can't have negative hours" },
            max: { value: 11, message: "Can't go over 11:59" },
          })}
          errorMessage={errors.hours?.message}
          placeholder="Hour"
          className="bg-white py-1.5 px-2.5 rounded-md outline-1 focus:outline-2 text-base outline-gray-300 focus:outline-blue-500"
        />
        <span className=" self-center">:</span>
        <NumberInput
          label="Minutes"
          {...register("minutes", {
            required: "This field is required",
            min: { value: 0, message: "Can't have negative minutes" },
            max: { value: 59, message: "Can't go over 59 minutes" },
          })}
          errorMessage={errors.minutes?.message}
          placeholder="Minute"
          className="bg-white py-1.5 px-2.5 rounded-md outline-1 focus:outline-2 text-base outline-gray-300 focus:outline-blue-500"
        />
        <div className="flex h-fit mt-[33px]">
          <Button
            onClick={toAM}
            variant={isAM ? "solid" : "bordered"}
            className="h-[38px] rounded-r-none"
          >
            AM
          </Button>
          <Button
            onClick={toPM}
            variant={isAM ? "bordered" : "solid"}
            className="h-[38px] rounded-l-none"
          >
            PM
          </Button>
        </div>
      </div>
      <TextInput
        {...register("url", {
          validate: (value) => {
            if (isAvalidateUrl(value)) {
              return true;
            }
            return "Not a valid url";
          },
        })}
        label="Room"
        errorMessage={errors.url?.message}
      />
      <div className="flex justify-center gap-5">
        <Button color="secondary" variant="bordered" onClick={closePopup}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}

SessionForm.propTypes = {
  session: PropTypes.shape({
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    creationDate: PropTypes.instanceOf(Date).isRequired,
    dateOfTheSession: PropTypes.instanceOf(Date).isRequired,
    status: PropTypes.string.isRequired,
  }),
  saveOrEdit: PropTypes.func.isRequired,
  closePopup: PropTypes.func.isRequired,
};
