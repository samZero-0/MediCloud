import { useContext, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { AuthContext } from "../providers/AuthProvider";

const InvoicePage = () => {
  const { invoice } = useContext(AuthContext);
  console.log(invoice);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Invoice_${invoice?.transactionId || "Unknown"}`,
    onBeforePrint: () => {
      if (!componentRef.current) {
        console.error("Nothing to print, componentRef is null.");
      }
    },
    onPrintError: (err) => {
      console.error("Printing error:", err);
    },
  });
  if (!invoice) {
    return <div>Loading invoice data...</div>;
  }
  return (

    <div className="container mx-auto px-4 py-8 " ref={componentRef}>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-8" >
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
                  <td className="text-right py-2 px-4">${item.price?.toFixed(2)}</td>
                  <td className="text-right py-2 px-4">
                    ${(item.quantity * item.price || item.price)?.toFixed(2)}
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
                <p>${invoice?.total?.toFixed(2) || "0.00"}</p>
              </div>
            </div>
          </div>

          {/* Thank You Note */}
          <div className="text-center text-gray-600 mt-8">
            <p>Thank you for your business!</p>
          </div>
        </div>

        {/* Print Button */}
        <div className="p-8 bg-gray-50 border-t">
          <button
            onClick={handlePrint}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Download Invoice as PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
