const fs = require("fs");
const { exec } = require("child_process");

const path = require("path");

const pathName = process.cwd();

const basePath = pathName.match(/.+?(?=\/knowledge-admin)/);

const {
  scssTemplate,
  indexTemplate,
  componentTemplate,
  containerTemplate,
  componentTestTemplate,
  containerTestTemplate
} = require("./templates.js");

function component(componentName) {
  const folderName = componentName
    .split(/(?=[A-Z])/)
    .join("-")
    .toLowerCase();

  exec(
    `mkdir ${basePath}/knowledge-admin/src/app/components/${folderName}`,
    () => {
      makeComponentFiles(componentName);
    }
  );
}

function makeComponentFiles(componentName) {
  const folderName = componentName
    .split(/(?=[A-Z])/)
    .join("-")
    .toLowerCase();
  const kebabName = componentName
    .split(/(?=[A-Z])/)
    .join("-")
    .toLowerCase();
  const scssSelectorName =
    componentName[0].toLowerCase() + componentName.slice(1);

  fs.writeFileSync(
    `${basePath}/knowledge-admin/src/app/components/${folderName}/${kebabName}.tsx`,
    componentTemplate(componentName, kebabName, scssSelectorName),
    "utf8"
  );
  fs.writeFileSync(
    `${basePath}/knowledge-admin/src/app/components/${folderName}/${kebabName}.spec.tsx`,
    componentTestTemplate(componentName, kebabName),
    "utf8"
  );
  fs.writeFileSync(
    `${basePath}/knowledge-admin/src/app/components/${folderName}/${kebabName}.module.scss`,
    scssTemplate(scssSelectorName),
    "utf8"
  );
  fs.writeFileSync(
    `${basePath}/knowledge-admin/src/app/components/${folderName}/index.ts`,
    indexTemplate(componentName, kebabName),
    "utf8"
  );
}

function container(componentName) {
  const folderName = componentName
    .split(/(?=[A-Z])/)
    .join("-")
    .toLowerCase();

  exec(
    `mkdir ${basePath}/knowledge-admin/src/app/containers/${folderName}-container`,
    () => {
      makeContainerFiles(componentName, `${folderName}-container`);
    }
  );
}

function makeContainerFiles(componentName, folderName) {
  const componentFolderName = folderName.replace(/-container/, "");

  fs.writeFileSync(
    `${basePath}/knowledge-admin/src/app/containers/${folderName}/${folderName}.tsx`,
    containerTemplate(componentName, componentFolderName),
    "utf8"
  );
  fs.writeFileSync(
    `${basePath}/knowledge-admin/src/app/containers/${folderName}/${folderName}.spec.tsx`,
    containerTestTemplate(componentName, folderName),
    "utf8"
  );
  fs.writeFileSync(
    `${basePath}/knowledge-admin/src/app/containers/${folderName}/index.ts`,
    indexTemplate(componentName, folderName),
    "utf8"
  );
}

module.exports = {
  component,
  container
};
