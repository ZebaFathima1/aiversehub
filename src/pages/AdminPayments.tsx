import { Helmet } from "react-helmet-async";
import DashboardLayout from "@/components/admin/DashboardLayout";
import PaymentsTable from "@/components/admin/PaymentsTable";

export default function AdminPayments() {
    return (
        <>
            <Helmet>
                <title>Payment Management - Admin Dashboard</title>
            </Helmet>

            <DashboardLayout>
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold gradient-text mb-2">
                            Payment Management
                        </h1>
                        <p className="text-muted-foreground">
                            Track and manage all payment transactions on the platform.
                        </p>
                    </div>

                    <PaymentsTable />
                </div>
            </DashboardLayout>
        </>
    );
}
