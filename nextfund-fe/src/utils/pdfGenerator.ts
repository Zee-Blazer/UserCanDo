import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface TableColumn {
  header: string;
  dataKey: string;
}

interface PDFGeneratorOptions {
  title: string;
  filename: string;
  columns: TableColumn[];
  data: any[];
  orientation?: 'portrait' | 'landscape';
  pageSize?: 'a4' | 'letter';
}

export const generateTablePDF = ({
  title,
  filename,
  columns,
  data,
  orientation = 'landscape',
  pageSize = 'a4'
}: PDFGeneratorOptions): void => {
  try {
    const doc = new jsPDF({
      orientation,
      unit: 'mm',
      format: pageSize
    });

    // Add title
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text(title, 14, 22);

    // Add subtitle with date and time
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    doc.text(`Generated on ${currentDate}`, 14, 30);

    const headers = columns.map(col => col.header);

    const rows = data.map(item => 
      columns.map(col => {
        const value = item[col.dataKey];
        
        if (value === null || value === undefined) {
          return '';
        }
        
        if (typeof value === 'string') {
          return value;
        }
        
        if (typeof value === 'number') {
          return value.toString();
        }
        
        if (typeof value === 'boolean') {
          return value ? 'Yes' : 'No';
        }
        
        return String(value);
      })
    );

    autoTable(doc, {
      head: [headers],
      body: rows,
      startY: 40,
      theme: 'grid',
      styles: {
        fontSize: 8,
        cellPadding: 3,
        textColor: [40, 40, 40],
        lineColor: [200, 200, 200],
        lineWidth: 0.1
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 9
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      margin: { top: 40, right: 14, bottom: 20, left: 14 },
      tableWidth: 'auto',
      columnStyles: {
        // Auto-adjust column widths based on content
      }
    });

    const pageCount = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.getWidth() - 30,
        doc.internal.pageSize.getHeight() - 10
      );
    }

    doc.save(`${filename}.pdf`);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
};

export const generateDueDiligencePDF = (data: any[]): void => {
  const columns: TableColumn[] = [
    { header: 'Business Name', dataKey: 'businessName' },
    { header: 'Category', dataKey: 'category' },
    { header: 'Owner', dataKey: 'owner' },
    { header: 'Last Updated', dataKey: 'lastUpdated' },
    { header: 'Status', dataKey: 'status' }
  ];

  const currentDate = new Date().toISOString().split('T')[0];
  
  generateTablePDF({
    title: 'Due Diligence Records',
    filename: `due-diligence-records-${currentDate}`,
    columns,
    data,
    orientation: 'landscape'
  });
};

export const generateUserManagementPDF = (data: any[]): void => {
  const columns: TableColumn[] = [
    { header: 'Name', dataKey: 'name' },
    { header: 'Category', dataKey: 'category' },
    { header: 'Email', dataKey: 'email' },
    { header: 'Status', dataKey: 'status' }
  ];

  const currentDate = new Date().toISOString().split('T')[0];
  
  generateTablePDF({
    title: 'User Management Records',
    filename: `user-management-records-${currentDate}`,
    columns,
    data,
    orientation: 'landscape'
  });
};

export const generateInvestmentsPDF = (data: any[]): void => {
  const columns: TableColumn[] = [
    { header: 'Investor', dataKey: 'investor' },
    { header: 'Business Name', dataKey: 'businessName' },
    { header: 'Amount Invested', dataKey: 'amountInvested' },
    { header: 'Date', dataKey: 'date' },
    { header: 'Status', dataKey: 'status' }
  ];

  const currentDate = new Date().toISOString().split('T')[0];
  
  generateTablePDF({
    title: 'Investment Records',
    filename: `investment-records-${currentDate}`,
    columns,
    data,
    orientation: 'landscape'
  });
};

export const generateFundManagementPDF = (data: any[]): void => {
  const columns: TableColumn[] = [
    { header: 'Investor', dataKey: 'investor' },
    { header: 'Business Name', dataKey: 'businessName' },
    { header: 'Amount', dataKey: 'amount' },
    { header: 'Payment Method', dataKey: 'paymentMethod' },
    { header: 'Status', dataKey: 'status' }
  ];

  const currentDate = new Date().toISOString().split('T')[0];
  
  generateTablePDF({
    title: 'Fund Management Records',
    filename: `fund-management-records-${currentDate}`,
    columns,
    data,
    orientation: 'landscape'
  });
};

export const generateTeamsPDF = (data: any[]): void => {
  const columns: TableColumn[] = [
    { header: 'Name', dataKey: 'full_name' },
    { header: 'Email', dataKey: 'email' },
    { header: 'Role', dataKey: 'role' }
  ];

  const currentDate = new Date().toISOString().split('T')[0];
  
  generateTablePDF({
    title: 'Team Management Records',
    filename: `team-management-records-${currentDate}`,
    columns,
    data,
    orientation: 'landscape'
  });
};