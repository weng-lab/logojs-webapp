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
