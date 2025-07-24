import { useEffect } from "react";
import { Button } from "../../../../shared/components/atoms/Button";
import { useAuth } from "../../../../shared/hooks/useAuth";
import { useChat } from "../../hooks/useChat";
// import { useNavigate } from "react-router-dom";

export default function CreateChatButtonTest() {
  const { user, isAuthenticated } = useAuth();
  const { setUserId, createChat } = useChat();
  // const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) setUserId(user.id);
  }, [user]);

  const handleChatCreation = () => {
    createChat([
      "b0b2855e-03b8-4099-a00a-4f6db7b9ea17",
      "27b60ea3-5bd0-44ba-8ea1-3efcf128c1d3",
    ]);
    // .then((chat) => {
    // navigate(`/teacher/chats/${chat.id}`);
    // });
  };
  return (
    <div>
      <Button onClick={handleChatCreation}>Create chat</Button>
    </div>
  );
}
