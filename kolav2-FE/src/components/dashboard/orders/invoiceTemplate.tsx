import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Button, Typography } from "@material-tailwind/react";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatDate } from "@/utils/helpers";

interface InvoiceTemplateProps {
  itemData: any;
  title: string;
}
const InvoiceTemplate = ({ itemData, title = "Invoice" }: InvoiceTemplateProps) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const subtotal = itemData?.total_sale_amount || 0;
  const discount = itemData?.discount_value
    ? parseFloat(itemData.discount_value)
    : 0;
  const vat = 0;
  const total = subtotal - discount;

  const handleDownloadPDF = async () => {
    try {
      // Find the invoice content starting from the "INVOICE" header
      const invoiceHeaderElement = document.querySelector('[data-invoice-start="true"]') || 
                                 document.querySelector('header.text-center.uppercase');
      
      if (!invoiceHeaderElement) {
        return;
      }

      // Get the parent element that contains all invoice content
      const invoiceContent = invoiceHeaderElement.parentElement;
      
      if (!invoiceContent) {
        return;
      }

      // Create a wrapper div that excludes the top navigation but includes everything from "INVOICE" downwards
      const elementsToCapture = [];
      let foundStart = false;
      
      for (const child of Array.from(invoiceContent.children)) {
        if (child === invoiceHeaderElement || foundStart) {
          foundStart = true;
          elementsToCapture.push(child);
        }
      }

      if (elementsToCapture.length === 0) {
        return;
      }

      // Create a temporary container with only the invoice content
      const tempContainer = document.createElement('div');
      tempContainer.style.backgroundColor = '#ffffff';
      tempContainer.style.padding = '20px';
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '0';
      tempContainer.style.width = `${invoiceContent.offsetWidth}px`;
      
      // Clone and append elements
      elementsToCapture.forEach(element => {
        tempContainer.appendChild(element.cloneNode(true));
      });
      
      document.body.appendChild(tempContainer);

      // Create canvas from the invoice content
      const canvas = await html2canvas(tempContainer, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: tempContainer.scrollWidth,
        height: tempContainer.scrollHeight,
        scrollX: 0,
        scrollY: 0
      });

      // Remove temporary container
      document.body.removeChild(tempContainer);

      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Calculate dimensions to fit the page
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const availableWidth = pageWidth - (2 * margin);
      const availableHeight = pageHeight - (2 * margin);

      // Calculate scaled dimensions
      const imgAspectRatio = canvas.width / canvas.height;
      let imgWidth = availableWidth;
      let imgHeight = availableWidth / imgAspectRatio;

      // If height exceeds available space, scale based on height
      if (imgHeight > availableHeight) {
        imgHeight = availableHeight;
        imgWidth = availableHeight * imgAspectRatio;
      }

      // Center the image on the page
      const xPosition = (pageWidth - imgWidth) / 2;
      const yPosition = margin;
      
      pdf.addImage(imgData, 'PNG', xPosition, yPosition, imgWidth, imgHeight);

      // Generate filename
      const orderNumber = itemData?.order_number || 'invoice';
      const fileName = `${title.replace(/\s+/g, '_')}_${orderNumber}_${new Date().toISOString().split('T')[0]}.pdf`;
      
      // Download the PDF
      pdf.save(fileName);
      
    } catch (error) {
      // Silent failure - PDF generation failed
    }
  };

  return (
    <main>
      <header className="flex justify-between mb-[1.5em] items-center">
        <div className="flex gap-10 items-center">
          <div className="flex gap-4 items-center">
            <Button
              onClick={handleGoBack}
              className="bg-pry2 flex px-2 items-center normal-case py-2"
            >
              <ChevronLeft />
              <Typography className="text-white font-normal">Back</Typography>
            </Button>
            <Typography variant="h4" className="font-medium">
              {title}
            </Typography>
          </div>
          <div
            className={`rounded-md p-2 font-semibold ${itemData?.order_status === "pending"
              ? "bg-[#F9F5FF] text-[#6941C6]"
              : itemData?.order_status === "Approved"
                ? "bg-[#F2FEF7] text-[#027A48]"
                : "bg-[#F9F5FF] text-[#6941C6]"
              }`}
          >
            {itemData?.order_status === "pending"
              ? "Awaiting Approval"
              : itemData?.order_status || "-"}
          </div>
        </div>
        <Button 
          onClick={handleDownloadPDF}
          className="inline-flex items-center justify-center whitespace-nowrap normal-case gap-2 bg-inherit border border-text-gray-300 font-normal shadow-none hover:shadow-none py-2 px-4"
        >
          <Typography className="text-[#434343] font-normal">
            Download
          </Typography>
        </Button>
      </header>
      <header className="text-center uppercase mb-[2em] font-extrabold text-2xl" data-invoice-start="true">
        invoice
      </header>
      <section className="flex mb-[2.5em] justify-between ">
        <Image src={logo} alt="logo" className="w-[116px] object-contain" />
      </section>

      <section className="flex mb-8 items-center justify-between">
        <div className="flex flex-col">
          <Typography className="font-bold text-pry2">Supplier</Typography>
          <Typography className="font-normal text-gray_7">
            {itemData?.business_name || "-"}
          </Typography>
          <Typography className="font-normal text-gray_7">
            {itemData?.delivery_location || "-"}
          </Typography>
        </div>
        <div className="flex flex-col">
          <Typography className="font-bold text-pry2">Customer</Typography>
          <Typography className="font-normal text-gray_7">
            {itemData?.customer_name || "-"}
          </Typography>
          <Typography className="font-normal text-gray_7">
            {itemData?.customer_email || "-"}
          </Typography>
          <Typography className="font-normal text-gray_7">
            {itemData?.customer_address || "-"}
          </Typography>
          <Typography className="font-normal text-gray_7">
            Tel: {itemData?.customer_phone_number || "-"} |
          </Typography>
        </div>
      </section>

      <section className="flex border-b border-t py-6 border-[#DEE2E6] justify-between mb-[1em] gap-[3em]">
        <div>
          <Typography className="font-bold text-lg text-pry2">
            Invoice Number
          </Typography>
          <Typography className="font-medium text-gray_7 text-lg">
            {itemData?.order_number || "-"}
          </Typography>
        </div>

        <div>
          <Typography className="font-bold text-lg text-pry2">
            Payment Due Date
          </Typography>
          <Typography className="font-medium text-gray_7 text-lg">
            {itemData?.due_date ? formatDate(itemData.due_date) : "-"}
          </Typography>
        </div>

        <div>
          <Typography className="font-bold text-lg text-pry2">
            Amount Due
          </Typography>
          <Typography className="font-extrabold text-gray_7 text-lg">
            GHS {total.toFixed(2)}
          </Typography>
        </div>
      </section>

      <section className="flex justify-between mb-[2em] gap-[3em]">
        <div className="flex max-w-sm w-full flex-col gap-1">
          <Typography className="font-bold text-lg text-pry2">
            Payment Details
          </Typography>
          <div className="flex justify-between">
            <Typography className="font-normal text-gray_7">
              Payment Method:
            </Typography>
            <Typography className="font-normal text-gray_7">
              {itemData?.payment_mode
                ? itemData.payment_mode.charAt(0).toUpperCase() +
                itemData.payment_mode.slice(1)
                : "-"}
            </Typography>
          </div>

          <div className="flex justify-between">
            <Typography className="font-normal text-gray_7">
              Payment terms:
            </Typography>
            <Typography className="font-normal text-gray_7">
              Pay with{" "}
              {itemData?.payment_mode
                ? itemData.payment_mode.charAt(0).toUpperCase() +
                itemData.payment_mode.slice(1)
                : "-"}
            </Typography>
          </div>
        </div>

        <div className="flex max-w-sm w-full flex-col gap-1">
          <Typography className="font-bold text-lg text-pry2">
            Order Details
          </Typography>
          <div className="flex justify-between">
            <Typography className="font-normal text-gray_7">
              Order Number:
            </Typography>
            <Typography className="font-normal text-gray_7">
              #{itemData?.order_number || "-"}
            </Typography>
          </div>

          <div className="flex justify-between">
            <Typography className="font-normal text-gray_7">
              Issue Date:
            </Typography>
            <Typography className="font-normal text-gray_7">
              {itemData?.created_at ? formatDate(itemData.created_at) : "-"}
            </Typography>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <Typography className="font-bold text-lg text-pry2">
            Shopping Detail
          </Typography>

          <Typography className="font-normal text-gray_7">
            {itemData?.delivery_location || "-"}
          </Typography>

          <Typography className="font-normal text-gray_7">
            Tel {itemData?.business_phone_number || "-"}
          </Typography>
        </div>
      </section>

      <section className="mb-[2em]">
        <div className="grid grid-cols-[1fr_190px_190px_190px] border border-gray-300">
          <div className="bg-pry2 text-white p-2 border-r border-white">
            <Typography className="font-semibold">Item(s)</Typography>
          </div>
          <div className="bg-pry2 text-white p-2 text-center border-r border-white">
            <Typography className="font-semibold">Quantity</Typography>
          </div>
          <div className="bg-pry2 text-white p-2 text-center border-r border-white">
            <Typography className="font-semibold">Unit Price</Typography>
          </div>
          <div className="bg-pry2 text-white p-2 text-center">
            <Typography className="font-semibold">Amount</Typography>
          </div>

          {itemData?.products ? (
            itemData.products.map((product: any, index: number) => (
              <React.Fragment key={index}>
                <div className="p-2 border-r border-b border-gray-300">
                  {product.product_name}
                </div>
                <div className="p-2 text-center border-r border-b border-gray-300">
                  {product.quantity}
                </div>
                <div className="p-2 text-center border-r border-b border-gray-300">
                  GHS {product.unit_price.toFixed(2)}
                </div>
                <div className="p-2 text-center border-b border-gray-300">
                  GHS {product.total_price.toFixed(2)}
                </div>
              </React.Fragment>
            ))
          ) : (
            <>
              <div className="p-2 border-r border-b border-gray-300">-</div>
              <div className="p-2 text-center border-r border-b border-gray-300">
                -
              </div>
              <div className="p-2 text-center border-r border-b border-gray-300">
                -
              </div>
              <div className="p-2 text-center border-b border-gray-300">-</div>
            </>
          )}
        </div>
      </section>
      <section className="w-full mb-[2.5em] gap-2 flex flex-col">
        <div className="flex items-center justify-between">
          <Typography className="font-normal text-[#212529]">
            Sub Total
          </Typography>
          <Typography className="font-normal text-[#212529]">
            GHS {subtotal.toFixed(2)}
          </Typography>
        </div>
        <div className="flex items-center justify-between">
          <Typography className="uppercase font-normal text-[#212529]">
            vat 0%
          </Typography>
          <Typography className="font-normal text-[#212529]">0</Typography>
        </div>
        <div className="flex justify-between">
          <Typography className="font-normal text-[#212529]">
            Discount ({itemData?.discount_type || "amount"})
          </Typography>
          <Typography className="font-normal text-[#212529]">
            {discount.toFixed(2)}
          </Typography>
        </div>
        <div className="flex items-center justify-between">
          <Typography className="font-normal text-[#212529]">
            Total + VAT - Discount
          </Typography>
          <Typography className="font-normal text-[#212529]">
            GHS {total.toFixed(2)}
          </Typography>
        </div>
      </section>

      <section className="flex mb-[3em] justify-between">
        <Typography className="font-normal text-[#212529]">
          Total Amount
        </Typography>
        <Typography className="font-bold text-[#212529]">
          GHS {total.toFixed(2)}
        </Typography>
      </section>

      <section className="flex justify-between">
        <div>
          <div className="flex flex-col items-start">
            <div
              className="mb-3 py-4"
              style={{
                width: "fit-content",
                borderTop: "3px dotted #000",
              }}
            >
              <Typography className="font-normal text-lg text-gray_7">
                Finance's Signature
              </Typography>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col items-start">
            <div
              className="mb-3 py-4"
              style={{
                width: "fit-content",
                borderTop: "3px dotted #000",
              }}
            >
              <Typography className="font-normal text-lg text-gray_7 ">
                Warehouse Manager's Signature
              </Typography>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default InvoiceTemplate;
