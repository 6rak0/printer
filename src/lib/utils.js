function printImage(img) {
    var printWindow = window.open("", "_blank", "height=400,width=600");
    printWindow.document.write(
      '<html><head><title>imprimir qr</title></head><body><img src="' +
        img +
        '"></body></html>'
    );
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
}

export {printImage}