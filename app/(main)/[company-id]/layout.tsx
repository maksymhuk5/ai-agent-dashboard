import Sidebar from "../this/components/sidebar"
import CompanyGuard from "../this/components/company-guard"
import MainLayout from "../this/components/main-layout";

export default function CompanyLayout({ children, params }: { children: React.ReactNode, params: { 'company-id': string } }) {
    return (
        <div className="flex h-screen">
            <CompanyGuard urlCompanyId={params['company-id']} />
            <Sidebar />
            <MainLayout>
                {children}
            </MainLayout>
        </div>
    );
}