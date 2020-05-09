<template>
  <v-container>
    <div class="d-flex">
      <v-btn @click="decrementPage" class="mx-2" fab dark small color="primary">
        <v-icon dark>mdi-minus</v-icon>
      </v-btn>
      <h3>
        {{page}}
      </h3>
      <v-btn @click="incrementPage" class="mx-2" fab dark small color="primary">
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
      <v-btn @click="getPDFData('C:/Users/Steve/Desktop/Code/Vuewer/server/static/Test.pdf')" class="mx-2" fab dark small color="primary">
        Get
      </v-btn>
      <v-btn @click="setPDFData" class="mx-2" fab dark small color="primary">
        Set
      </v-btn>
      <v-btn @click="accessPDFData" class="mx-2" fab dark small color="primary">
        Access
      </v-btn>
      {{pdfData}}
    </div>
    
    <canvas id="the-canvas">s</canvas>
    
  </v-container>
</template>

<script>
import FileService from '@/services/FileService'
import pdf from 'pdfjs-dist'

  export default {
    name: 'HelloWorld',

    data () {
      return {
          page: 1,
          pdfData: null
      }
    },
    methods: {
      incrementPage(){
        this.page++
        this.getPDF("C:/Users/Steve/Desktop/Code/Vuewer/server/static/Test.pdf",this.page)
      },
      decrementPage(){
        this.page--
        this.getPDF("C:/Users/Steve/Desktop/Code/Vuewer/server/static/Test.pdf",this.page)
      },
      async setPDFData(){
        var pdf = await this.getPDFData("C:/Users/Steve/Desktop/Code/Vuewer/server/static/Test.pdf")
        this.pfdData = pdf
        console.log("This.pdf data",this.pfdData)
      },
      async getPDFData(path) {
        const response = (await FileService.getFile(path)).data
        const file = new Blob(
            [response],
            {type: 'application/pdf'}
        )
        
        const fileURL = URL.createObjectURL(file);
        var doc = await pdf.getDocument(fileURL)
        return doc
      },
      accessPDFData() {
        console.log(this.pdfData)
      },

      async getPDFPages(pdfData) {
        //const numPages = pdfData.numPages;
        console.log("test",pdfData)
      }
    }
  }
</script>
