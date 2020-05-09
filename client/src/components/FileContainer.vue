<template>
    <div>   
        FileContainer
        <v-treeview
            :items="items"
        >
            <template v-slot:prepend="{item}">
                <v-icon v-if="item.type=='folder'">
                    {{ 'mdi-folder' }}
                </v-icon>
                <v-icon v-else>
                    {{ 'mdi-file-pdf' }}
                </v-icon>
            </template>
            <template v-slot:label="{item}">
                <a v-if="item.type=='file'" @click="getPDF(item.path,page)">{{item.name}}</a>
                <a v-else>{{item.name}}</a>
            </template>
        </v-treeview>
        <button
            @click="incrementPage"
        >
            Test
        </button>

    </div>
</template>
<script>
//incrementPage
import FileService from '@/services/FileService'
import pdf from 'pdfjs-dist'

export default {
    name: 'FileContainer',
    data () {
            return {
                items: [],
                page: 1
            }
        },
    async mounted() {
        this.items = (await FileService.index())
    },
    
    methods: {
        incrementPage() {
            this.page++
            console.log(this.page)
        },
        async getPDF(path,page) {
            const response = (await FileService.getFile(path)).data
            const file = new Blob(
                [response],
                {type: 'application/pdf'}
            )
            
            const fileURL = URL.createObjectURL(file);
            
            var loadingTask = pdf.getDocument(fileURL)
            loadingTask.promise.then(function(pdf) {
            console.log('PDF loaded');
            
            // Fetch the first page
            console.log(page);
            var pageNumber = page
            pdf.getPage(pageNumber).then(function(page) {
                console.log('Page loaded');
                
                var scale = 1;
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
    }
    
}
</script>