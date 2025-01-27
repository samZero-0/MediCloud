import { useContext, useRef } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // For table support in PDF
import { Download } from "lucide-react"; // For the download icon
import { Helmet } from "react-helmet";

const InvoicePage = () => {
  const { invoice } = useContext(AuthContext);
  const componentRef = useRef();

  // Handle export to PDF
  const handleExportPDF = () => {
    if (!invoice) {
      console.error("No invoice data available.");
      return;
    }

    const doc = new jsPDF();

    // Add invoice header
    doc.setFontSize(18);
    doc.text(`INVOICE #${invoice.transactionId || "N/A"}`, 10, 20);

    // Add invoice details
    doc.setFontSize(12);
    doc.text(`Invoice Date: ${invoice.invoiceDate || "N/A"}`, 10, 30);
    doc.text(`Due Date: ${invoice.dueDate || "N/A"}`, 10, 40);
    doc.text(`Bill To: ${invoice.user || "Customer Name"}`, 10, 50);

    // Add items table
    const tableData = invoice.items.map((item) => [
      item.medicineName,
      item.quantity || 1,
      `$${item.price}`,
      `$${item.quantity * item.price || item.price}`,
    ]);

    doc.autoTable({
      startY: 60,
      head: [["Item", "Quantity", "Price", "Total"]],
      body: tableData,
    });

    // Add total section
    doc.setFontSize(14);
    doc.text(`Total: $${invoice.total || "0.00"}`, 10, doc.autoTable.previous.finalY + 10);

    // Save the PDF
    doc.save(`Invoice_${invoice.transactionId || "Unknown"}.pdf`);
  };

  if (!invoice) {
    return <div>Loading invoice data...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8" ref={componentRef}>
        <Helmet>
               
               <title>Invoice</title>
             
           </Helmet>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-8">
          {/* Invoice Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <img src="/logo.png" alt="Company Logo" className="h-16" />
            </div>
            <div className="text-right">
              <h1 className="text-2xl font-bold text-gray-800">INVOICE</h1>
              <p className="text-gray-600">#{invoice?.transactionId || "N/A"}</p>
            </div>
          </div>

          {/* Customer Information */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Bill To:</h2>
            <p className="text-gray-600">{invoice?.user || "Customer Name"}</p>
          </div>

          {/* Invoice Details */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Invoice Details:</h2>
            <div className="flex justify-between text-gray-600">
              <p>Invoice Date:</p>
              <p>{invoice?.invoiceDate || "N/A"}</p>
            </div>
            <div className="flex justify-between text-gray-600">
              <p>Due Date:</p>
              <p>{invoice?.dueDate || "N/A"}</p>
            </div>
          </div>

          {/* Items Table */}
          <table className="w-full mb-8">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left py-2 px-4">Item</th>
                <th className="text-right py-2 px-4">Quantity</th>
                <th className="text-right py-2 px-4">Price</th>
                <th className="text-right py-2 px-4">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice?.items?.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4">{item.medicineName}</td>
                  <td className="text-right py-2 px-4">{item.quantity || 1}</td>
                  <td className="text-right py-2 px-4">${item.price}</td>
                  <td className="text-right py-2 px-4">
                    ${item.quantity * item.price || item.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Total Section */}
          <div className="flex justify-end mb-8">
            <div className="text-right">
              <div className="flex justify-between w-64 text-xl font-bold mt-2">
                <p>Total:</p>
                <p>${invoice?.total || "0.00"}</p>
              </div>
            </div>
          </div>

          {/* Thank You Note */}
          <div className="text-center text-gray-600 mt-8">
            <p>Thank you for your business!</p>
          </div>
        </div>

        {/* Download PDF Button */}
        <div className="p-8 bg-gray-50 border-t">
          <button
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-5 h-5" />
            Download Invoice as PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;