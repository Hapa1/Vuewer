<template>
    <v-row>
        <v-col md="4">
            <div v-if="!items" class="text-center">
                Waiting for files...
            </div>
            <div v-else>   
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
                        <a v-if="item.type=='file'" @click="setCanvas(item.path,item.name)">{{item.name}}</a>
                        <a v-else>{{item.name}}</a>
                    </template>
                </v-treeview>
            </div>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col>
            <Canvas 
                v-bind:path="path"
                v-bind:docName="docName"
            />
        </v-col>
    </v-row>
</template>
<script>
import FileService from '@/services/FileService'
import Canvas from './Canvas.vue'

export default {
    name: 'FileContainer',
    components: {
        Canvas
    },
    data () {
            return {
                path: null,
                docName: null,
                items: null,
                page: 1
            }
        },
    async mounted() {
        this.items = (await FileService.index())
        console.log(this.items)
    },

    
    methods: {
        setCanvas(path,docName) {
            this.path = path;
            this.docName = docName;
        }
        
            
        }
    }
    
</script>