import withAdminLayout from "../common/AdminLayout";
import Loader from "../common/Loader";
import { SEO } from "../common/SEO";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { LuUsers } from "react-icons/lu";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { FaFileInvoice } from "react-icons/fa";
import { MdUpload } from "react-icons/md";

function Home() {
  const { data: session, status } = useSession();
  const userName = session?.user?.firstName;
  if (status === "loading") return <div className="flex items-center justify-center w-full min-h-[200px]"><Loader /></div>;

  const cards = [
    { name: "CRM", description: "Leads & pipeline", href: "/crm", icon: <LuUsers className="w-8 h-8 text-[#2f80ed]" /> },
    { name: "Cost Estimator", description: "Interior cost estimates", href: "/cost-estimator", icon: <RiMoneyRupeeCircleFill className="w-8 h-8 text-[#2f80ed]" /> },
    { name: "Invoice", description: "Invoices & billing", href: "/invoice", icon: <FaFileInvoice className="w-8 h-8 text-[#2f80ed]" /> },
    { name: "Interior Progress", description: "Upload progress for customer projects", href: "/interior-progress", icon: <MdUpload className="w-8 h-8 text-[#2f80ed]" /> },
  ];

  return (
    <div className="w-full">
      <SEO
        title="Houznext Admin - Dashboard"
        description="Admin dashboard for Houznext. Manage CRM, cost estimates, and invoices."
        keywords="Houznext, Admin, Dashboard, CRM, Cost estimator, Invoice"
        favicon="/images/background/newlogo.png"
      />

      <div className="p-6 md:px-10 md:py-10 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Hi, {userName ? userName.charAt(0).toUpperCase() + userName.slice(1) : "Admin"} 👋
          </h1>
          <p className="text-slate-600 mt-1">
            Manage leads, cost estimates, invoices, and interior progress from one place.
          </p>
          {session?.lastLogin && (
            <p className="text-sm text-slate-500 mt-2">
              Last login: {new Date(session.lastLogin * 1000).toLocaleString()}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {cards.map((card) => (
            <Link
              key={card.name}
              href={card.href}
              className="flex items-center gap-5 p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-[#2f80ed]/30 hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[#e8f1ff] flex items-center justify-center group-hover:bg-[#2f80ed]/10 transition-colors">
                {card.icon}
              </div>
              <div className="min-w-0">
                <h2 className="text-lg font-semibold text-slate-900 group-hover:text-[#2f80ed] transition-colors">{card.name}</h2>
                <p className="text-sm text-slate-500 mt-0.5">{card.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default withAdminLayout(Home);
