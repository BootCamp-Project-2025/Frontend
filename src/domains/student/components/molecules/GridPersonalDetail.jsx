import RowDetail from "../atoms/RowDetail";

const GridPersonalDetail = () => {
  /* const {
    fullname,
    dateOfBirth,
    gender,
    country,
    city,
    phoneNumber,
    languagePreference,
  } = user; */
  return (
    <div className="grid grid-cols-1 gap-y-2 w-full max-w-[50vw] p-2 text-[color:var(--color-default-300)]">
      <RowDetail title="Full name" value={"Isaac Smith"} />
      <RowDetail title="Date of Birth" value={"fullname"} />
      <RowDetail title="Gender" value={"fullname"} />
      <RowDetail title="Country" value={"fullname"} />
      <RowDetail title="City" value={"fullname"} />
      <RowDetail title="Phone number" value={"fullname"} />
      <RowDetail title="Language preference" value={"fullname"} />
    </div>
  );
};

export default GridPersonalDetail;
