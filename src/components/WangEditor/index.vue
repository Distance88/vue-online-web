<template>
  <div>
    <div :id="editorMenu" class="editorMenu"></div>
    <div :id="editor" class="editor"></div>
  </div>
</template>

<script>
import E from "wangeditor";
let editord = Object
export default {
  props: ["editor", "editorMenu"],
  name: "editor",
  data(){
      return {
          index:0
      }
  },
  watch:{
    editor(){
      console.log(this.$store.getters.questionIndex)
      if(this.editor == ('fillQuestion'+this.$store.getters.questionIndex) && (this.$store.getters.questionIndex != 6)){
        console.log(1123)
        editord.txt.clear()
      }
    }
  },
  mounted() {
    editord = new E("#" + this.editorMenu, "#" + this.editor);
    
    // 默认情况下，显示所有菜单
    editord.config.menus = [
      "head",
      "bold",
      "fontSize",
      "fontName",
      "italic",
      "underline",
      "strikeThrough",
      "indent",
      "lineHeight",
      "foreColor",
      "backColor",
      "link",
      "list",
      "todo",
      "justify",
      "quote",
      "emoticon",
      "image",
      "video",
      "table",
      "code",
      "splitLine",
      "undo",
      "redo"
    ];
    editord.create();
    editord.txt.text('123')
  },
  created(){
    console.log(this.editor)
  }
};
</script>
<style scoped>
.editorMenu {
  border: 1px solid #ccc;
}
.editor {
  margin-top: -1px;
  border: 1px solid #ccc;
  min-height: 400px;
  height: auto;
}
</style>
<style>
.w-e-text-container {
  height: 100vh !important;
}
.w-e-text-container .placeholder {
  top: 0px !important;
}
</style>