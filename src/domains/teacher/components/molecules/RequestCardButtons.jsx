import { Button } from "../../../../shared/components/atoms/Button";

export default function RequestCardButtons({ ...props }) {
  return (
    <div {...props}>
      <Button
        contentClassName={"m-auto w-fit whitespace-nowrap"}
        variant="bordered"
      >
        Open request
      </Button>
      <Button contentClassName={"m-auto w-fit"} variant="bordered">
        Edit
      </Button>
      <Button contentClassName={"m-auto w-fit"} variant="bordered">
        Delete
      </Button>
    </div>
  );
}
