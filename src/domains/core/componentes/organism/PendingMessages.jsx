import { useEffect, useState } from "react";
import { Icon } from "../../../../shared/components/atoms/Icon";
import { EventCard } from "../molecules/EventCard";
import { useToastContext } from "../../../../shared/contexts/ToastContext";
import { Alert } from "../../../../shared/components/molecules/Alert";
import { useAuth } from "../../../../shared/hooks/useAuth";
import { getRequest } from "../../../../shared/api/getRequest";

export const PendingMessages = () => {
  const [data, setData] = useState([]);
  const { user } = useAuth();

  const { showToast } = useToastContext();

  useEffect(() => {
    if (user && user.id) {
      getRequest(`/users/${user.id}/chats`)
        .then((response) => {
          if (response.success) {
            if (response.data.data.length === 0) return;

            const pendingMessages = response.data.data.filter(
              (row) =>
                row.messages.length > 0 &&
                row.messages[0].senderId !== user.id &&
                row.messages[0].status === "DELIVERED"
            );
            const chatNames = pendingMessages.map((row) =>
              getRequest(`/users/${row.messages[0].senderId}`).catch(() => ({
                userName: "Unknown",
              }))
            );

            Promise.all(chatNames).then((result) => {
              const chatsData = pendingMessages.map((row, idx) => {
                return {
                  id: row.messages[0].id,
                  userName: result[idx].data.userName,
                };
              });

              setData(chatsData);
            });
          } else {
            console.log(response);
            showToast(response.error.message, "error");
          }
        })
        .catch((err) => {
          console.log(err);
          showToast(err, "error");
        });
    }
  }, []);

  return (
    <div className="flex flex-col items-start gap-2 mt-10">
      <em className="text-2xl font-semibold not-italic">Pending messages</em>
      {data.length > 0 ? (
        <ul className="flex items-center gap-4 flex-wrap w-full">
          {data.map((row, idx) => (
            <EventCard key={idx} id={row.id} color="blue" type="top">
              <div className="flex items-center justify-between p-2 py-4 w-50 bg-[color:var(--color-secondary-50)] hover:bg-[color:var(--color-secondary-100)] disabled:bg-[color:var(--color-secondary-150)]">
                <Icon
                  icon={"message"}
                  className={"min-h-[1rem] h-[1rem] w-[1rem] min-w-[1rem]"}
                ></Icon>
                <span className="overflow-hidden text-ellipsis break-words break-all font-semibold overflow-hidden text-ellipsis break-words [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical] mx-1">
                  {row.userName}
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
        <Alert
          type="info"
          title="No pendings messages found"
          description="You don´t have pending messages."
        />
      )}
    </div>
  );
};
