import React from 'react';
import { LogoMenu, LogoSVGDownloadButton, EmbedButton,
	 LogoSVGCopyButton, PermalinkButton } from '../menu/index';

const ITEMSTYLE = {
    logosize: "16pt",
    labelsize: "10pt",
};

const reactCode = logoinfo => `
import { Logo, loadGlyphComponents } from 'logosj-react';
const myLogoProps = {
    startpos: ${logoinfo.firstbase},
    pwm: [
${logoinfo.pwm.map(x => "        " + JSON.stringify(x)).join(",\n")}
    ],
    glyphmap: loadGlyphComponents([
${logoinfo.glyphmap.raw.map(x => "        " + JSON.stringify({ regex: x.regex, color: x.color })).join(",\n")}
    ])
};

export const MyLogo = props => (
    <Logo {...myLogoProps} {...props} />;
);
`.substring(1); // trim leading line break

const jsCode = logoinfo => `
<!doctype html>
<html>
  <body>
    <script src="https://package.logosj.wenglab.org/bundle.js" type="text/javascript"></script>
    <div id="logo" style="width:500px"></div>
    <script type="text/javascript">
      window.onload = function() {
        var logoProps = {
          startpos: ${logoinfo.firstbase},
          pwm: [
${logoinfo.pwm.map(x => "            " + JSON.stringify(x)).join(",\n")}
          ],
          glyphmap: logosj.loadGlyphComponents([
${logoinfo.glyphmap.raw.map(x => "            " + JSON.stringify({ regex: x.regex, color: x.color })).join(",\n")}
          ])
        };
        logosj.embedLogo(document.getElementById("logo"), logoProps);
      }
    </script>
  </body>
</html>
`.substring(1);

const FastaLogoMenu = ({ svgref, apiurl, logoinfo }) => (
    <LogoMenu width="100%" background="#d0d0d0">
      <LogoSVGDownloadButton {...ITEMSTYLE}
			     labeltext="save" svgref={svgref}
			     filename="logo.svg" />
      <LogoSVGCopyButton {...ITEMSTYLE}
			 labeltext="copy SVG code" svgref={svgref} />
      <PermalinkButton {...ITEMSTYLE} labeltext="permalink"
		       url={apiurl} logoinfo={logoinfo} />
      <EmbedButton {...ITEMSTYLE} labeltext="embed" js={jsCode(logoinfo)}
                   url={apiurl} react={reactCode(logoinfo)} logoinfo={logoinfo} />
    </LogoMenu>
);
export default FastaLogoMenu;
