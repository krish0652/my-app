import fs from 'fs';
import glob from 'glob';
import path from 'path';

export class TemplateProcess {
    public processTemplates(): void {
        try {
            const files = glob.sync(`${process.cwd()}/src/templates/*.html`);
            files.forEach((file: string) => {
                const fileContent = fs.readFileSync(file);
                const htmlFileName = path.basename(file);
                const cssFileName = htmlFileName.replace('.html', '.css');
                const cssContent = fs.readFileSync(file.replace(htmlFileName, `/styles/${cssFileName}`));
                let htmlFileContent = fileContent.toString();
                htmlFileContent = htmlFileContent.replace('{{styles}}', cssContent.toString());
                fs.writeFileSync(`./src/templates/complied/${htmlFileName}`, htmlFileContent);
            });
        } catch (ex) {

        }
    }
}
