import { Canvas } from "./_components/canvas";
import { Room } from "@/components/room";
import { Loading } from "./_components/loading";

interface Board_Id_Page_Props {
  params: {
    board_id: string;
  };
}

const Board_Id_Page = ({ params }: Board_Id_Page_Props) => {
  return (
    <Room room_id={params.board_id} fallback={<Loading />}>
      <Canvas board_id={params.board_id} />
    </Room>
  );
};

export default Board_Id_Page;
