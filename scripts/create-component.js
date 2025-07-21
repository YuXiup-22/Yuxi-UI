import fs from 'fs-extra';
import path from 'path';
import handlebars from 'handlebars';
import inquirer from 'inquirer';
import prettier from 'prettier';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// 注册handlebars辅助函数
handlebars.registerHelper('pascalCase', (str) => {
  if (typeof str !== 'string' || !str) {
    return ''; // Or throw new Error(`pascalCase helper expected a string, got ${str}`);
  }
  return str
    .replace(/(?:^|\s|-)\w/g, (match) => match.toUpperCase())
    .replace(/[-_\s]/g, '');
});
handlebars.registerHelper('kebabCase', (str) => {
  if (typeof str !== 'string' || !str) {
    return ''; // Or throw new Error(`pascalCase helper expected a string, got ${str}`);
  }
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
});
handlebars.registerHelper('camelCase', function (str) {
  if (typeof str !== 'string' || !str) {
    return ''; // Or throw new Error(`pascalCase helper expected a string, got ${str}`);
  }
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
});
const packagesDir = path.resolve(__dirname, '../packages');
const templateDir = path.resolve(
  __dirname,
  '../generators/components/template',
);
const createComponent = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'componentName',
      message: '请输入组件名称（例如：Button,IconButton）：',
      validate: (val) => {
        if (!val || val.trim() === '') {
          return '组件名称不能为空';
        }
        if (!/^[a-zA-Z0-9]+$/.test(val)) {
          return '组件名称只能是字母和数字';
        }
        const targetDir = path.join(
          packagesDir,
          handlebars.helpers.kebabCase(val),
        );
        if (fs.existsSync(targetDir)) {
          return `组件${val}已经存在于：${targetDir}`;
        }
        return true;
      },
    },
  ]);
  const rawComponentName = answers.componentName;
  const kebabCaseName = handlebars.helpers.kebabCase(rawComponentName);
  const pascalCaseName = handlebars.helpers.pascalCase(rawComponentName);
  const camelCaseName = handlebars.helpers.camelCase(rawComponentName);
  const targetComponentDir = path.join(packagesDir, kebabCaseName);
  console.log(
    `\n✨ 正在创建新组件: ${pascalCaseName} in ${targetComponentDir}...`,
  );
  try {
    // 创建组件目录
    await fs.mkdir(targetComponentDir);
    // 遍历模板目录，生成文件
    const files = await fs.readdir(templateDir, { recursive: true });
    for (const file of files) {
      const templateFileDir = path.join(templateDir, file);
      const stats = await fs.stat(templateFileDir);
      // 如果是文件夹，直接创建
      if (!stats.isFile()) {
        // If it's a directory, ensure the corresponding target directory exists and continue to the next item
        const targetDirectoryPath = path.join(targetComponentDir, file);
        // 不存在该文件夹，则创建
        await fs.ensureDir(targetDirectoryPath);
        console.log(
          `  - Created directory: ${path.relative(process.cwd(), targetDirectoryPath)}`,
        );
        continue; // Skip to the next file/directory in the loop
      }
      const relativePath = path.relative(templateDir, templateFileDir);
      let targetFileName = relativePath
        .replace('{{pascalCase name}}.tsx.hbs', `${pascalCaseName}.tsx`)
        .replace('.hbs', '');
      const targetFilePath = path.join(targetComponentDir, targetFileName);
      // 确保文件的父目录存在
      await fs.ensureDir(path.dirname(targetFilePath));
      const templateContent = await fs.readFile(templateFileDir, 'utf8');
      const compileTemplate = handlebars.compile(templateContent);
      const renderedContent = compileTemplate({
        componentName: rawComponentName,
        pascalCaseName,
        kebabCaseName,
        camelCaseName,
      });
      // 格式化生成的文件
      let formatedContent = renderedContent;
      const fileExt = path.extname(targetFileName);
      if (
        fileExt === '.json' ||
        fileExt === '.ts' ||
        fileExt === '.tsx' ||
        fileExt === '.md'
      ) {
        try {
          const prettierConfig = await prettier.resolveConfig(targetFilePath);
          formatedContent = await prettier.format(renderedContent, {
            ...prettierConfig,
            filepath: targetFilePath,
          });
        } catch (error) {
          console.warn(
            `⚠️ Warning: Could not format ${targetFileName} with Prettier:`,
            error.message,
          );
        }
        await fs.writeFile(targetFilePath, formatedContent);
        console.log(
          `  - Created: ${path.relative(process.cwd(), targetFilePath)}`,
        );
      }
    }
    // 更新ui-library包的packages.json
    console.log(`\n✨ Updating ui-library dependencies...`);
    const uiLibraryPackageJsonPath = path.resolve(
      packagesDir,
      'ui-library/package.json',
    );
    const uiLibraryPackageJson = await fs.readJson(uiLibraryPackageJsonPath);
    uiLibraryPackageJson.dependencies = uiLibraryPackageJson.dependencies || {};
    uiLibraryPackageJson.dependencies[`@yuxi-ui/${kebabCaseName}`] =
      'workspace:*';
    await fs.writeJson(uiLibraryPackageJsonPath, uiLibraryPackageJson, {
      spaces: 2,
    });
    console.log(
      `  - Added @yuxi-ui/${kebabCaseName} to ui-library/package.json`,
    );
    // 更新ui-library的src
    console.log(`\n✨ Updating ui-library entry point...`);
    const uiLibraryIndexTsPath = path.resolve(
      packagesDir,
      'ui-library/src/index.ts',
    );
    let uiLibraryIndexContent = await fs.readFile(
      uiLibraryIndexTsPath,
      'utf-8',
    );
    const exportStatement = `export * from '@yuxi-ui/${kebabCaseName}'`;
    if (!uiLibraryIndexContent.includes(exportStatement)) {
      uiLibraryIndexContent += `\n ${exportStatement}`;
      uiLibraryIndexContent = await prettier.format(uiLibraryIndexContent, {
        filepath: uiLibraryIndexTsPath,
        ...(await prettier.resolveConfig(uiLibraryIndexTsPath)),
      });
      await fs.writeFile(uiLibraryIndexTsPath, uiLibraryIndexContent);
      console.log(
        `- Added export for ${pascalCaseName} in ui-library/src/index.ts`,
      );
    } else {
      console.log(
        `  - Export for ${pascalCaseName} already exists in ui-library/src/index.ts`,
      );
    }
    // 添加src/*.ts
    // todo:先去看如何做按需导入，再决定是否要自动化处理组件包

    console.log(`\n⛷️ Component ${pascalCaseName} created successfully!`);
    console.log(
      `   Don't forget to run 'pnpm install'  to link the new package.`,
    );
    console.log(
      `   You can now develop your component at: ${path.relative(process.cwd(), targetComponentDir)}`,
    );
  } catch (error) {
    console.error(`\n❌ Error creating component:`, error);
    // 失败时清理已创建的目录
    if (fs.existsSync(targetComponentDir)) {
      await fs.remove(targetComponentDir);
      console.log(
        ` \n🧹 Cleaned up partially created directory: ${targetComponentDir}`,
      );
    }
    process.exit(1);
  }
};
createComponent();
