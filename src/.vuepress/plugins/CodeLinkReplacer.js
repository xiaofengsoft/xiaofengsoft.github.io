export const CodeLinkReplacer = (md, options) => {
  md.core.ruler.push('replace_code_with_link', (state) => {
    const tokens = state.tokens;
    tokens.forEach((token) => {
      if (token.type === 'inline' && token.children) {
        for (let i = 0; i < token.children.length; i++) {
          const child = token.children[i];
          if (child.type === 'link_open') {
            const hrefAttr = child.attrs.find(attr => attr[0] === 'href' && attr[1].startsWith('code://'));
            if (hrefAttr) {
              const codePath = hrefAttr[1].replace('code://', '').replace('.ipynb', '');
              const iframeToken = new state.Token('html_inline', '', 0);
              iframeToken.content = `
              <t-card style="background-color:white">
              <iframe src="https://nbviewer.org/github/xiaofengsoft/xiaofengsoft.github.io/blob/main/src/code/${codePath}.ipynb" frameborder="0" scrolling="0" width="100%" height="700px" loading="lazy"></iframe>
              </t-card>`;
              token.children.splice(i, 3, iframeToken); // Replace link_open, text, and link_close with iframe
            }
          }
        }
      }
    });
  });
};
