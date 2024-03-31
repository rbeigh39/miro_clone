"use client";

import { useOrganization } from "@clerk/nextjs";

import Empty_Org from "./_components/empty-org";
import Board_List from "./_components/board-list";

interface Dashboard_Page_Props {
  searchParams: {
    search?: string;
    favourites?: string;
  };
}

const Dashboard_Page = ({ searchParams }: Dashboard_Page_Props) => {
  const { organization } = useOrganization();

  return (
    <div className="flex-1 h-[calc(100%-80px)] p-6">
      {!organization ? (
        <Empty_Org />
      ) : (
        <Board_List org_id={organization.id} query={searchParams} />
      )}
    </div>
  );
};

export default Dashboard_Page;
