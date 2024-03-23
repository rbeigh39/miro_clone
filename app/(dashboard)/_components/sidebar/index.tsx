import New_Button from "./new-button";
import List from "./list";

const Sidebar = () => {
  return (
    <aside className="fixed z-[1] left-0 bg-blue-950 h-full w-[60px] flex p-3 flex-col gap-y-4 text-white">
      <List />
      <New_Button />
    </aside>
  );
};

export default Sidebar;
