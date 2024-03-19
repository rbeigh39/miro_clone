import Sidebar from "./_components/sidebar";
import Org_Sidebar from "./_components/org-sidebar";
import Navbar from "./_components/navbar";

interface Dashboard_Layout_Props {
  children: React.ReactNode;
}

const Dashboard_Layout = ({ children }: Dashboard_Layout_Props) => {
  return (
    <main className="h-full ">
      <Sidebar />
      <div className="pl-[60px] h-full">
        <div className="flex gap-x-3 h-full">
          <Org_Sidebar />
          <div className="h-full flex-1">
            {/* Add Nav Bar */}
            <Navbar />
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard_Layout;
