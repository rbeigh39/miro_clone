"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import Empty_Boards from "./empty-boards";
import Empty_Favourites from "./empty-favourites";
import Empty_Search from "./empty-search";
import { Board_Card } from "./board-card";
import { New_Board_Button } from "./new-board-button";

interface Board_List_Props {
  org_id: string;
  query: {
    search?: string;
    favourites?: string;
  };
}

const Board_List = ({ org_id, query }: Board_List_Props) => {
  const data = useQuery(api.boards.get, { org_id });

  if (data === undefined) {
    return (
      <div className="">
        <h2 className="text-3xl">
          {query.favourites ? "Favourite Boards" : "Team Boards"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:gird-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
          <New_Board_Button org_id={org_id} disabled />
          <Board_Card.Skeleton />
          <Board_Card.Skeleton />
          <Board_Card.Skeleton />
          <Board_Card.Skeleton />
          <Board_Card.Skeleton />
        </div>
      </div>
    );
  }

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

  return (
    <div className="">
      <h2 className="text-3xl">
        {query.favourites ? "Favourite Boards" : "Team Boards"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:gird-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        <New_Board_Button org_id={org_id} />
        {data.map((board) => {
          return (
            <Board_Card
              key={board._id}
              id={board._id}
              title={board.title}
              image_url={board.image_url}
              author_id={board.author_id}
              author_name={board.author_name}
              created_at={board._creationTime}
              org_id={board.org_id}
              is_favourite={false}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Board_List;
