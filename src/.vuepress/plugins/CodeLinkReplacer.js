export const CodeLinkReplacer = (md, options) => {
  md.core.ruler.push('replace_code_with_link', (state) => {
    const tokens = state.tokens;
    tokens.forEach((token) => {
      if (token.type === 'inline' && token.children) {
        token.children.forEach((child) => {
          if (child.type === 'link_open') {
            child.attrs.forEach((attr) => {
              if (attr[0] === 'href' && attr[1].includes('code')) {
                attr[1] = attr[1].replace(options.regex, options.replacement);
              }
            });
          }
        });
      }
    });
  });
};
