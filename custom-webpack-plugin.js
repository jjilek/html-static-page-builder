const fs = require('fs')
const path = require('path')

class ScriptsHtmlPlugin {
    apply(compiler) {
        const pluginName = ScriptsHtmlPlugin.name;
        const { webpack } = compiler;
        const { Compilation } = webpack;
        const { RawSource } = webpack.sources;
        compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
            compilation.hooks.processAssets.tap(
                {
                    name: pluginName,
                    stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
                },
                (assets) => {
                    const content =
                        Object.keys(assets)
                            .filter((filename) => path.parse(filename).ext == ".js")
                            .map((filename) => `<script defer="defer" src="/js/${filename}"></script>`)
                            .join('\n');
                    try {
                        const data = fs.writeFileSync(__dirname + '/src/include/scripts.html', content)
                    } catch (err) {
                        console.error(err)
                    }
                }
            );
        });
    }
}

module.exports = { ScriptsHtmlPlugin };
