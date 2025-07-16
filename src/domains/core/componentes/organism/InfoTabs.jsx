import PropTypes from 'prop-types';
import { Button } from '../../../../shared/components/atoms/Button';
import { Icon } from '../../../../shared/components/atoms/Icon';
import { Table } from '../molecules/Table';
import { TableItem } from '../molecules/TableItem';
import { Tabs } from '../molecules/Tabs';
import { useState } from 'react';

export const InfoTabs = ({ title, data = [] }) => {
  const [selected, setSelected] = useState('table');

  const handleTabs = (type) => {
    setSelected(type);
  };

  return (
    <div className="space-y-4 mt-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <em className="text-2xl font-semibold not-italic">{title}</em>
        <Tabs selected={selected} onClick={handleTabs}></Tabs>
        <Button radius="full" ><Icon icon={"home"}></Icon></Button>
      </div>
      <div>
        {selected === 'table' && data.length > 0 ?
          <Table quantity={data.length}>
            {data.map((row, idx) => (
              <TableItem key={idx} title={row.title} value={row.value} />
            ))}
          </Table>
        : null}
        {selected === 'graphic' && data.length > 0 ?
          <Table quantity={data.length}>
            {data.map((row, idx) => (
              <TableItem key={idx} title={row.title} value={row.value} />
            ))}
          </Table>
        : null}
      </div>
    </div>
  );
};

InfoTabs.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
};

