import React, { useRef } from 'react';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import htmlToPdfmake from 'html-to-pdfmake';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import './index.css';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PdfExport = () => {
  const editorRef = useRef(null);

  const handleExportPDF = () => {
    if (editorRef.current) {
      const editorContent = editorRef.current.getEditor().html.get();
      const pdfMakeContent = htmlToPdfmake(editorContent);
      const documentDefinition = { content: pdfMakeContent };
      pdfMake.createPdf(documentDefinition).download('document.pdf');
    }
  };

  return (
    <div>
      <FroalaEditorComponent ref={editorRef} tag="textarea" />
      <button className="button" onClick={handleExportPDF}>
        Export to PDF
      </button>
    </div>
  );
};

export default PdfExport;
