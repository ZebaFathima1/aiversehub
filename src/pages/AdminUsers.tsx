import { Helmet } from "react-helmet-async";
import DashboardLayout from "@/components/admin/DashboardLayout";
import UsersTable from "@/components/admin/UsersTable";

export default function AdminUsers() {
    return (
        <>
            <Helmet>
                <title>User Management - Admin Dashboard</title>
            </Helmet>

            <DashboardLayout>
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold gradient-text mb-2">
                            User Management
                        </h1>
                        <p className="text-muted-foreground">
                            Manage and monitor all registered users on the platform.
                        </p>
                    </div>

                    <UsersTable />
                </div>
            </DashboardLayout>
        </>
    );
}
