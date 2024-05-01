import { Canvas } from "./_components/canvas";

interface Board_Id_Page_Props {
  params: {
    board_id: string;
  };
}

const Board_Id_Page = ({ params }: Board_Id_Page_Props) => {
  return <Canvas board_id={params.board_id} />;
};

export default Board_Id_Page;
