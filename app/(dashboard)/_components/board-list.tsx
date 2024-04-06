"use client";

import Empty_Boards from "./empty-boards";
import Empty_Favourites from "./empty-favourites";
import Empty_Search from "./empty-search";

interface Board_List_Props {
  org_id: string;
  query: {
    search?: string;
    favourites?: string;
  };
}

const Board_List = ({ org_id, query }: Board_List_Props) => {
  const data = []; // ToDo: Change to API call

  if (!data?.length && query.search) {
    console.log("this is in this clause!");
    return <Empty_Search />;
  }

  if (!data?.length && query.favourites) {
    return <Empty_Favourites />;
  }

  if (!data?.length) {
    return <Empty_Boards />;
  }

  // return <div className="">{JSON.stringify(query)}</div>;
};

export default Board_List;
