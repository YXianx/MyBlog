import VueMarkdownEditor, { xss } from '@kangc/v-md-editor';
export function markdownParser(text){
    return xss.process(VueMarkdownEditor.vMdParser.themeConfig.markdownParser.render(text));
}