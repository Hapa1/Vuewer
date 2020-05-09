import pdf from 'pdfjs-dist'
    
export const getPdf = (fileURL, page) => {
    //const response = (await FileService.ping()).data
    //const file = new Blob(
    //    [response],
    //    {type: 'application/pdf'}
    //)
    //
    //const fileURL = URL.createObjectURL(file);
    
    //window.open(fileURL);
    var loadingTask = pdf.getDocument(fileURL)
    loadingTask.promise.then(function(pdf) {
    console.log('PDF loaded');
    
    // Fetch the first page
    var pageNumber = page;
    pdf.getPage(pageNumber).then(function(page) {
        console.log('Page loaded');
        
        var scale = 1.5;
        var viewport = page.getViewport({scale: scale});

        // Prepare canvas using PDF page dimensions
        var canvas = document.getElementById('the-canvas');
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render PDF page into canvas context
        var renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        
        var renderTask = page.render(renderContext);
        renderTask.promise.then(function () {
            console.log('Page rendered');
        });
    });
    }, function (reason) {
    // PDF loading error
    console.error(reason);
    });
    
}
