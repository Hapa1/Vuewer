<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      
    <div class="d-flex align-center">
      <v-icon class="display-1 mr-2">{{'mdi-folder-open'}}</v-icon>
      <span><h1>Vuewer</h1></span>
    </div>
    </v-app-bar>

    <v-content >
      <v-card height="100%" class="d-flex">
        <FileContainer/>
      </v-card>
    </v-content>
  </v-app>
</template>

<script>
import FileContainer from './components/FileContainer';

export default {
  name: 'App',
  components: {
    FileContainer
  }
};
</script>
