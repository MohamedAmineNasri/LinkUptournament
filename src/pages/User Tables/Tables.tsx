import Breadcrumb from "../../Dashboard/src/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../Dashboard/src/layout/DefaultLayout";
import UsersTable from "./UsersTable";

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
