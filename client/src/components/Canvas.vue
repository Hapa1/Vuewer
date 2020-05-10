<template>
  <div fill-height fluid class="canvas" >
      

      <div v-if="!path" class="mt-10">
        <v-card>
          <v-card-title>
            Click on a PDF file to get started!
          </v-card-title>
          <div class='text-center'>
            <v-icon class="mb-2 display-3">
              {{'mdi-file-pdf'}}
            </v-icon>
          </div>
        </v-card>
      </div>

      <v-col v-if="path && page && pages" class="pa-0 d-flex justify-space-between">
            <v-col>
            <div class='d-flex align-center'>
              <h3>{{docName}}</h3>
            </div>
            </v-col>
            <v-col md="auto" class="pa-0 mt-2">
            <div class='d-flex align-center'>
              <v-btn @click="resetData" fab small text>
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
            </v-col>
      </v-col>
      
      
      
      <div v-if="path && page && pages">
            <div class="d-flex mb-3 justify-center">
              <v-btn v-if="page==1 || !page" class="mx-2" fab small color="disabled">
                <v-icon dark>mdi-chevron-left</v-icon>
              </v-btn>

              <v-btn v-else @click="decrementPage" class="mx-2" fab dark small color="primary">
                <v-icon dark>mdi-chevron-left</v-icon>
              </v-btn>
              <div class='my-1'>
                <h3>
                  Page {{page}} of {{pages}}
                </h3>
              </div>
              
              <v-btn v-if="page >= pages || !page" class="mx-2" fab small color="disabled">
                <v-icon dark>mdi-chevron-right</v-icon>
              </v-btn>
              <v-btn v-else @click="incrementPage" class="mx-2" fab dark small color="primary">
                <v-icon dark>mdi-chevron-right</v-icon>
              </v-btn>
            </div>
          <div class="d-flex mb-3 justify-center">
              <canvas class="boxShadow" id="the-canvas"></canvas>
          </div>
        </div>
  </div>
</template>

<script>
import FileService from '@/services/FileService'
import pdf from 'pdfjs-dist'

  export default {
    name: 'Canvas',
    props: ['path','docName'],
    watch: {
      path: async function() {
        if(this.path){
          var url = await this.getUrl(this.path)
          this.pdfData = await this.getPdf(url)
          this.pages = this.pdfData.numPages
          this.page = 1;
          this.downloadPdf(url)
          this.renderPage(this.page)
        }
      }
    },
    data () {
      return {
          name: null,
          page: null,
          pages: null,
          pdfData: null
      }
    },
    methods: {
      resetData(){ //clear canvas data when user hits close
        this.$parent.setCanvas(null,null)
        this.name = null;
        this.page = null;
        this.pages = null;
        this.pdfData = null
      },

      incrementPage(){ //increment page state by 1
        this.page++
        this.renderPage(this.page)
      },

      decrementPage(){ //decrement page state by 1
        this.page--
        this.renderPage(this.page)
      },

      async getUrl(path){ //return the url string of a pdf blob
        const response = (await FileService.getFile(path)).data
        const file = new Blob(
            [response],
            {type: 'application/pdf'}
        )
        
        const fileURL = URL.createObjectURL(file);
        return fileURL
      },

      async getPdf(fileURL) { //return the document data given
        var doc = await pdf.getDocument(fileURL)
        return doc
      },

      downloadPdf(fileUrl){ //download pdf given a url
        var link = document.createElement("a");
        link.href = fileUrl;
        link.download = this.docName;
        link.click();
        console.log(fileUrl)
      },
      

      async renderPage(pageNum) { 
        var page = await this.pdfData.getPage(pageNum)

        var scale = .9;
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
        });
      }
    }
  }
</script>
<style>
.maxWidth{
  max-width: 25%;
}
.boxShadow {
  box-shadow: 10px 10px 25px -2px rgba(0,0,0,0.34);
}
.canvas {
  position:fixed;
}
</style>
