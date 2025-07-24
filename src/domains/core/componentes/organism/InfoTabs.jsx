/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { Icon } from "../../../../shared/components/atoms/Icon";
import { Table } from "../molecules/Table";
import { TableItem } from "../molecules/TableItem";
import { Tabs } from "../molecules/Tabs";
import { useEffect, useState } from "react";
import { Chart } from "../molecules/Chart";
import { Link } from "react-router-dom";
import { getRequest } from "../../../../shared/api/getRequest";
import { useToastContext } from "../../../../shared/contexts/ToastContext";

export const InfoTabs = ({
  title,
  icon = "add",
  path = "",
  get = "",
  tabs = true,
}) => {
  const [selected, setSelected] = useState("table");
  const [data, setData] = useState([
    { title: "Courses Created", value: 3 },
    { title: "Students", value: 3 },
    { title: "Sessions", value: 10 },
  ]);
  const { showToast } = useToastContext();

  const handleTabs = (type) => {
    setSelected(type);
  };

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
    <div className="space-y-4 mt-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <em className="text-2xl font-semibold not-italic">{title}</em>
        {tabs ? <Tabs selected={selected} onClick={handleTabs}></Tabs> : null}
        <Link
          to={path}
          className="rounded-full bg-blue-500 transition-colors duration-300 ease-in-out focus:outline-none p-2 font-medium focus:outline-none transition-colors cursor-pointer duration-200 active:brightness-115 bg-[color:var(--color-primary-600)] text-white hover:bg-[color:var(--color-primary-700)] disabled:bg-[color:var(--color-primary-400)]"
        >
          <Icon
            icon={icon}
            className={"min-h-[1rem] h-[1rem] w-[1rem] min-w-[1rem]"}
          ></Icon>
        </Link>
      </div>
      <div>
        {selected === "table" && data.length > 0 ? (
          <Table>
            {data.map((row, idx) => (
              <TableItem key={idx} title={row.title} value={row.value} />
            ))}
          </Table>
        ) : null}
        {selected === "graphic" ? <Chart></Chart> : null}
      </div>
    </div>
  );
};

InfoTabs.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  path: PropTypes.string,
  get: PropTypes.string,
  tabs: PropTypes.bool,
};
