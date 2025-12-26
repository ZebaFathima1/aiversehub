import { Helmet } from "react-helmet-async";
import DashboardLayout from "@/components/admin/DashboardLayout";
import EventsManagementTable from "@/components/admin/EventsManagementTable";

export default function AdminEvents() {
    return (
        <>
            <Helmet>
                <title>Event Management - Admin Dashboard</title>
            </Helmet>

            <DashboardLayout>
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold gradient-text mb-2">
                            Event Management
                        </h1>
                        <p className="text-muted-foreground">
                            Create, edit, and manage all events on the platform.
                        </p>
                    </div>

                    <EventsManagementTable />
                </div>
            </DashboardLayout>
        </>
    );
}
