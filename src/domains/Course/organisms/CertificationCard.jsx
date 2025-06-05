import PropTypes from "prop-types";
import { Button } from "../../../shared/components/atoms/Button";

export default function CertificationCard({ certification, onEdit }) {
  const handleEditClick = () => {
    onEdit(certification);
  };

  return (
    <div className="flex p-4 m-2 w-4/5 gap-3 justify-between bg-[#D7E6FD] text-[#2525252] rounded-2xl">
      <div className="flex gap-5">
        <svg
          width="19"
          height="25"
          viewBox="0 0 19 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mt-1"
        >
          <path
            d="M6.73906 13.9286L7.77812 10.5357L5.04688 8.33333H8.43125L9.5 5L10.5687 8.33333H13.9531L11.1922 10.5357L12.2312 13.9286L9.5 11.8155L6.73906 13.9286ZM2.375 25V15.8036C1.62292 14.9702 1.03906 14.0179 0.623437 12.9464C0.207813 11.875 0 10.7341 0 9.52381C0 6.86508 0.920312 4.6131 2.76094 2.76786C4.60156 0.922619 6.84792 0 9.5 0C12.1521 0 14.3984 0.922619 16.2391 2.76786C18.0797 4.6131 19 6.86508 19 9.52381C19 10.7341 18.7922 11.875 18.3766 12.9464C17.9609 14.0179 17.3771 14.9702 16.625 15.8036V25L9.5 22.619L2.375 25ZM9.5 16.6667C11.4792 16.6667 13.1615 15.9722 14.5469 14.5833C15.9323 13.1944 16.625 11.5079 16.625 9.52381C16.625 7.53968 15.9323 5.85317 14.5469 4.46429C13.1615 3.0754 11.4792 2.38095 9.5 2.38095C7.52083 2.38095 5.83854 3.0754 4.45312 4.46429C3.06771 5.85317 2.375 7.53968 2.375 9.52381C2.375 11.5079 3.06771 13.1944 4.45312 14.5833C5.83854 15.9722 7.52083 16.6667 9.5 16.6667ZM4.75 21.4583L9.5 20.2381L14.25 21.4583V17.7679C13.5573 18.1647 12.8102 18.4772 12.0086 18.7054C11.207 18.9335 10.3708 19.0476 9.5 19.0476C8.62917 19.0476 7.79297 18.9335 6.99141 18.7054C6.18984 18.4772 5.44271 18.1647 4.75 17.7679V21.4583Z"
            fill="#565656"
          />
        </svg>

        <div className="">
          <div className="text-xl font-bold justify-between">
            {certification.name} - {certification.year}
          </div>
          <span className="text-lg font-light">
            {certification.acreditedBy}
          </span>
        </div>
      </div>
      <Button
        styleType="editBtn"
        classname="w-12 h-8"
        onClick={handleEditClick}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.77778 14.2222H3.04444L11.7333 5.53333L10.4667 4.26667L1.77778 12.9556V14.2222ZM0 16V12.2222L11.7333 0.511111C11.9111 0.348148 12.1074 0.222222 12.3222 0.133333C12.537 0.0444444 12.763 0 13 0C13.237 0 13.4667 0.0444444 13.6889 0.133333C13.9111 0.222222 14.1037 0.355556 14.2667 0.533333L15.4889 1.77778C15.6667 1.94074 15.7963 2.13333 15.8778 2.35556C15.9593 2.57778 16 2.8 16 3.02222C16 3.25926 15.9593 3.48519 15.8778 3.7C15.7963 3.91481 15.6667 4.11111 15.4889 4.28889L3.77778 16H0ZM11.0889 4.91111L10.4667 4.26667L11.7333 5.53333L11.0889 4.91111Z"
            fill="white"
          />
        </svg>
      </Button>
    </div>
  );
}

CertificationCard.propTypes = {
  certification: PropTypes.shape({
    year: PropTypes.number.isRequired,
    name: PropTypes.string,
    acreditedBy: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func,
};
