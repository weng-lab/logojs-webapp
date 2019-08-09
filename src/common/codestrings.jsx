import { indentCode } from './utils';

export const jsCodestring = js => `
<!doctype html>
<html>
  <body>
    <script src="https://package.logosj.wenglab.org/bundle.js" type="text/javascript"></script>
    <div id="logo" style="width:500px"></div>
    <script type="text/javascript">
${indentCode(js, "      ")}
    </script>
  </body>
</html>
`.substring(1); // trail leading linebreak

export const formatPWM = pwm => (
    "[\n" + indentCode(
        pwm.map(
            x => JSON.stringify(x.map(xx => +xx.toFixed(2)))
        ).join('\n'), "  "
    ) + "\n]"
);

const removeKey = (a, k) => {
    let c = { ...a };
    delete c[k];
    return c;
};

export const formatGlyphmap = glyphmap => (
    "[\n" + indentCode(
        glyphmap.map(x => JSON.stringify(removeKey(x, "component"))).join('\n'), "  "
    ) + "\n]"
);
