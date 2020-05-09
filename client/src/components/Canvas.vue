<template>
  <div fill-height fluid class="canvas" >
      
      <v-row
        
      >
      <div v-if="!path">
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
      
      
      
      <div v-if="path && page && pages">
          <div class="d-flex justify-space-between">

            <div class='d-flex align-center'>
              <v-icon>
                {{'mdi-file-pdf'}}
              </v-icon>
              <h3>{{docName}}</h3>
            </div>

            <div class="d-flex my-5 justify-center">
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
            <div class='d-flex align-center'>
              <v-btn @click="resetData" fab small text>
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
            
          </div>
        
          <v-list-item one-line>
            <v-card :elevation="10" class="pa-1">
              <canvas id="the-canvas"></canvas>
            </v-card>
          </v-list-item>
        </div>

      </v-row>
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
          this.pdfData = await this.getPDFData(this.path)
          this.pages = this.pdfData.numPages
          this.page = 1;
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
      resetData(){
        this.$parent.setCanvas(null,null)
        this.name = null;
        this.page = null;
        this.pages = null;
        this.pdfData = null
      },
      incrementPage(){
        this.page++
        this.renderPage(this.page)
      },
      decrementPage(){
        this.page--
        this.renderPage(this.page)
      },
      async getPDFData(path) {
        const response = (await FileService.getFile(path)).data
        const file = new Blob(
            [response],
            {type: 'application/pdf'}
        )
        
        const fileURL = URL.createObjectURL(file);

        var link = document.createElement("a"); // Or maybe get it from the current document
        link.href = fileURL;
        link.download = this.docName
        link.click();

        var doc = await pdf.getDocument(fileURL)
        return doc
      },

      async renderPage(pageNum) {
        var page = await this.pdfData.getPage(pageNum)
        console.log('Page loaded');

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
            console.log('Page rendered');
        });
      }
    }
  }
</script>
<style>
.canvas {
  position:fixed;
  left: 50%;
}
</style>
