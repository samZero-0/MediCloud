import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const InvoicePage = ({ invoiceData }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Invoice_${invoiceData?.invoiceNumber}`,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-8" ref={componentRef}>
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <img src="/path-to-your-logo.png" alt="Company Logo" className="h-16" />
            </div>
            <div className="text-right">
              <h1 className="text-2xl font-bold text-gray-800">INVOICE</h1>
              <p className="text-gray-600">#{invoiceData?.invoiceNumber}</p>
            </div>
          </div>

          {/* Customer Information */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Bill To:</h2>
            <p className="text-gray-600">{invoiceData?.customerName}</p>
            <p className="text-gray-600">{invoiceData?.customerAddress}</p>
            <p className="text-gray-600">{invoiceData?.customerEmail}</p>
          </div>

          {/* Invoice Details */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Invoice Details:</h2>
            <div className="flex justify-between text-gray-600">
              <p>Invoice Date:</p>
              <p>{invoiceData?.invoiceDate}</p>
            </div>
            <div className="flex justify-between text-gray-600">
              <p>Due Date:</p>
              <p>{invoiceData?.dueDate}</p>
            </div>
          </div>

          {/* Purchase Information */}
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
              {invoiceData?.items?.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4">{item.name}</td>
                  <td className="text-right py-2 px-4">{item.quantity}</td>
                  <td className="text-right py-2 px-4">${item.price.toFixed(2)}</td>
                  <td className="text-right py-2 px-4">${(item.quantity * item.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Total */}
          <div className="flex justify-end mb-8">
            <div className="text-right">
              <div className="flex justify-between w-64">
                <p className="font-semibold text-gray-700">Subtotal:</p>
                <p className="text-gray-600">${invoiceData?.subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between w-64">
                <p className="font-semibold text-gray-700">Tax:</p>
                <p className="text-gray-600">${invoiceData?.tax.toFixed(2)}</p>
              </div>
              <div className="flex justify-between w-64 text-xl font-bold mt-2">
                <p>Total:</p>
                <p>${invoiceData?.total.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Thank You Note */}
          <div className="text-center text-gray-600 mt-8">
            <p>Thank you for your business!</p>
          </div>
        </div>

        {/* Print Button - This will not be included in the printed version */}
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