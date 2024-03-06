import Breadcrumb from '../../Dashboard/src/components/Breadcrumbs/Breadcrumb';
import TableOne from '../../Dashboard/src/components/Tables/TableOne';
import TableThree from '../../Dashboard/src/components/Tables/TableThree';
import TableTwo from '../../Dashboard/src/components/Tables/TableTwo';
import DefaultLayout from '../../Dashboard/src/layout/DefaultLayout';
import UsersTable from './UsersTable'

const Tables = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="" />

      <div className="flex flex-col gap-10">
        {/* <TableOne /> */}
        <UsersTable />
        {/* <TableTwo />
        <TableThree /> */}
      </div>
    </DefaultLayout>
  );
};

export default Tables;
