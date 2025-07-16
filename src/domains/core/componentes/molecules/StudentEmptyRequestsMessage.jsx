import { Title } from "../../../../shared/components/atoms/Title";
import { Button } from "../../../../shared/components/atoms/Button";

export default function StudentEmptyRequestsMessage() {
  return (
    <div className="flex mt-10 gap-4 flex-col items-center">
      <Title color="black" size="md">
        Post your first request
      </Title>
      <p className="max-w-11/12">
        Describe your needs and create a request. Then get a curated list of
        offers to choose from
      </p>
      <Button className={"mt-5"}>Create a new request</Button>
    </div>
  );
}
