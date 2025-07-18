/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Icon } from "../../../../shared/components/atoms/Icon";
import { EventCard } from "../molecules/EventCard";
import { useToastContext } from "../../../../shared/contexts/ToastContext";

export const PendingMessages = () => {
  const [data, setData] = useState([
    { user: "Pepe" },
    { user: "Jorge" },
    { user: "Jose" },
  ]);

  const { showToast } = useToastContext();

  // useEffect(() => {
  //   getRequest(get)
  //     .then((response) => {
  //       if(response.success) {
  //         setData(response.data);
  //       } else {
  //         showToast(response.error.message, "error");
  //       }
  //     })
  //     .catch(err, () => {
  //       showToast(err, "error");
  //     });
  // }, []);

  return (
    <div className="flex flex-col items-start gap-2 mt-10">
      <em className="text-2xl font-semibold not-italic">Pending messages</em>
      {data.length > 0 ? (
        <ul className="flex items-center gap-4 flex-wrap w-full">
          {data.map((row, idx) => (
            <EventCard key={idx} path={``} color="blue" type="top">
              <div className="flex items-center justify-between p-2 py-4 w-40 bg-[color:var(--color-secondary-50)] hover:bg-[color:var(--color-secondary-100)] disabled:bg-[color:var(--color-secondary-150)]">
                <Icon
                  icon={"message"}
                  className={"min-h-[1rem] h-[1rem] w-[1rem] min-w-[1rem]"}
                ></Icon>
                <span className="overflow-hidden text-ellipsis break-words break-all font-semibold">
                  {row.user}
                </span>
                <div
                  className={
                    "min-h-[1rem] h-[1rem] w-[1rem] min-w-[1rem] bg-red-500 rounded-full"
                  }
                ></div>
              </div>
            </EventCard>
          ))}
        </ul>
      ) : (
        <p>Do not have pending messages</p>
      )}
    </div>
  );
};
