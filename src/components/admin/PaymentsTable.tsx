import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { motion } from "framer-motion";
import {
    MoreHorizontal,
    Search,
    Download,
    CheckCircle,
    Clock,
    XCircle,
    Eye,
    Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface Payment {
    id: string;
    transactionId: string;
    user: string;
    event: string;
    amount: string;
    method: "UPI" | "Card" | "Net Banking";
    status: "completed" | "pending" | "failed";
    date: string;
    screenshot?: string; // Data URL for screenshot
}

const mockPayments: Payment[] = [];

export default function PaymentsTable() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("all");
    const [payments, setPayments] = useState<Payment[]>(mockPayments);
    const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(null);

    useEffect(() => {
        // Load payments from localStorage
        const storedPayments = localStorage.getItem("allPayments");
        if (storedPayments) {
            try {
                const parsedPayments = JSON.parse(storedPayments);
                // Merge with mock payments (newest first)
                setPayments([...parsedPayments, ...mockPayments]);
            } catch (error) {
                console.error("Failed to parse payments from localStorage", error);
            }
        }
    }, []);

    const filteredPayments = payments.filter((payment) => {
        const matchesSearch =
            payment.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            payment.user.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTab = activeTab === "all" || payment.status === activeTab;
        return matchesSearch && matchesTab;
    });

    const getStatusIcon = (status: Payment["status"]) => {
        switch (status) {
            case "completed":
                return <CheckCircle className="h-4 w-4" />;
            case "pending":
                return <Clock className="h-4 w-4" />;
            case "failed":
                return <XCircle className="h-4 w-4" />;
        }
    };

    const getStatusColor = (status: Payment["status"]) => {
        switch (status) {
            case "completed":
                return "bg-green-500/10 text-green-500 border-green-500/20";
            case "pending":
                return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
            case "failed":
                return "bg-red-500/10 text-red-500 border-red-500/20";
        }
    };

    const getMethodColor = (method: Payment["method"]) => {
        switch (method) {
            case "UPI":
                return "bg-purple-500/10 text-purple-500 border-purple-500/20";
            case "Card":
                return "bg-blue-500/10 text-blue-500 border-blue-500/20";
            case "Net Banking":
                return "bg-orange-500/10 text-orange-500 border-orange-500/20";
        }
    };

    const handleExport = () => {
        const headers = ["Transaction ID", "User", "Event", "Amount", "Status", "Date"];
        const csvContent = [
            headers.join(","),
            ...payments.map(p => [
                p.transactionId,
                `"${p.user}"`, // Quote to handle commas
                `"${p.event}"`,
                p.amount,
                p.status,
                new Date(p.date).toISOString()
            ].join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "transactions_export.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <CardTitle>Payment Transactions</CardTitle>
                        <div className="flex flex-wrap gap-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search transactions..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9 w-[200px] sm:w-[300px]"
                                />
                            </div>
                            <Button variant="outline" className="gap-2" onClick={handleExport}>
                                <Download className="h-4 w-4" />
                                Export
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
                        <TabsList>
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="completed">Completed</TabsTrigger>
                            <TabsTrigger value="pending">Pending</TabsTrigger>
                            <TabsTrigger value="failed">Failed</TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Transaction ID</TableHead>
                                    <TableHead>User</TableHead>
                                    <TableHead>Event</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Proof</TableHead>
                                    <TableHead>Method</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredPayments.map((payment) => (
                                    <TableRow key={payment.id} className="group">
                                        <TableCell className="font-mono text-sm">
                                            {payment.transactionId}
                                        </TableCell>
                                        <TableCell className="font-medium">{payment.user}</TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {payment.event}
                                        </TableCell>
                                        <TableCell className="font-semibold">
                                            {payment.amount}
                                        </TableCell>
                                        <TableCell>
                                            {payment.screenshot ? (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 gap-2 text-primary"
                                                    onClick={() => setSelectedScreenshot(payment.screenshot!)}
                                                >
                                                    <ImageIcon className="w-4 h-4" />
                                                    View
                                                </Button>
                                            ) : (
                                                <span className="text-xs text-muted-foreground">-</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={getMethodColor(payment.method)}>
                                                {payment.method}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={`${getStatusColor(payment.status)} flex items-center gap-1 w-fit`}
                                            >
                                                {getStatusIcon(payment.status)}
                                                {payment.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {new Date(payment.date).toLocaleString()}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => {
                                                        // Detailed info for dialog
                                                        alert(`Transaction Details:\nID: ${payment.transactionId}\nUser: ${payment.user}\nAmount: ${payment.amount}\nDate: ${payment.date}`);
                                                    }}>
                                                        View Details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => {
                                                        // Generate PDF Receipt
                                                        const doc = new jsPDF();

                                                        // Title
                                                        doc.setFontSize(22);
                                                        doc.setTextColor(44, 62, 80);
                                                        doc.text("Payment Receipt", 105, 20, { align: "center" });

                                                        // Divider
                                                        doc.setLineWidth(0.5);
                                                        doc.line(20, 30, 190, 30);

                                                        // Content
                                                        doc.setFontSize(12);
                                                        doc.setTextColor(0, 0, 0);

                                                        const startY = 50;
                                                        const lineHeight = 10;

                                                        doc.text(`Transaction ID: ${payment.transactionId}`, 20, startY);
                                                        doc.text(`Date: ${new Date(payment.date).toLocaleString()}`, 20, startY + lineHeight);
                                                        doc.text(`Event: ${payment.event}`, 20, startY + lineHeight * 2);
                                                        doc.text(`User: ${payment.user}`, 20, startY + lineHeight * 3);

                                                        // Amount Highlight
                                                        doc.setFontSize(16);
                                                        doc.setTextColor(0, 128, 0); // Green
                                                        doc.text(`Amount Paid: ${payment.amount}`, 20, startY + lineHeight * 5);

                                                        // Status
                                                        doc.setFontSize(12);
                                                        doc.setTextColor(0, 0, 0);
                                                        doc.text(`Status: ${payment.status.toUpperCase()}`, 20, startY + lineHeight * 6);

                                                        // Footer
                                                        doc.setFontSize(10);
                                                        doc.setTextColor(128, 128, 128);
                                                        doc.text("Thank you for your payment!", 105, 280, { align: "center" });
                                                        doc.text("AI Verse Hub", 105, 285, { align: "center" });

                                                        doc.save(`Receipt-${payment.transactionId}.pdf`);
                                                    }}>
                                                        Download Receipt (PDF)
                                                    </DropdownMenuItem>
                                                    {payment.status === "pending" && (
                                                        <DropdownMenuItem
                                                            className="text-green-600 font-medium"
                                                            onClick={() => {
                                                                const updatedPayments = payments.map(p =>
                                                                    p.id === payment.id ? { ...p, status: "completed" as const } : p
                                                                );
                                                                setPayments(updatedPayments);
                                                                localStorage.setItem("allPayments", JSON.stringify(updatedPayments));
                                                                // In real app, send email notification here
                                                            }}
                                                        >
                                                            <CheckCircle className="w-4 h-4 mr-2" />
                                                            Approve Payment
                                                        </DropdownMenuItem>
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {filteredPayments.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={9} className="h-24 text-center">
                                            No payments found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={!!selectedScreenshot} onOpenChange={() => setSelectedScreenshot(null)}>
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>Payment Verification Proof</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4 flex items-center justify-center bg-black/5 rounded-lg border border-border">
                        {selectedScreenshot && (
                            <img
                                src={selectedScreenshot}
                                alt="Payment Proof"
                                className="max-h-[80vh] w-auto object-contain rounded-md"
                            />
                        )}
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" onClick={() => setSelectedScreenshot(null)}>
                            Close
                        </Button>
                        <Button onClick={() => {
                            // In a real app, this would download the image
                            const link = document.createElement('a');
                            link.href = selectedScreenshot!;
                            link.download = 'payment-proof.png';
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                        }}>
                            Download
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </motion.div>
    );
}
