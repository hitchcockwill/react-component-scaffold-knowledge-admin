const componentTemplate = (
  componentName,
  kebabName,
  scssSelectorName
) => `import React from 'react';
import styles from './${kebabName}.module.scss';

export interface IProps {}

export default class ${componentName} extends React.Component<IProps> {
  render() {
    return <div className={styles.${scssSelectorName}}>${componentName} Component</div>;
  }
}

`;

const scssTemplate = scssSelectorName => `@import '~assets/styles/shared';

.${scssSelectorName} {
  border: solid blue 1px;
}


`;

const indexTemplate = (
  componentName,
  kebabName
) => `import ${componentName} from './${kebabName}';

export default ${componentName};

`;

const componentTestTemplate = (
  componentName,
  kebabName
) => `import { makeShallowRender } from 'test/helpers/test-helpers';
import ${componentName}, { IProps } from './${kebabName}';

const shallow = makeShallowRender<IProps>(${componentName});

describe('<${componentName} />', () => {
  let mockProps: IProps;

  beforeEach(() => {
    mockProps = {};
  });

  it('renders <${componentName} />', () => {
    const wrapper = shallow(mockProps);
    expect(wrapper).toMatchSnapshot();
  });
});

`;

const containerTemplate = (
  componentName,
  componentFolderName
) => `import React from 'react';
import { connect } from 'react-redux';
// import ${componentName} from 'app/components/${componentFolderName}';

export interface IProps {}

const mapStateToProps = (state) => ({
  fillMeIn: {fillMeIn: state}
});

const mapDispatchToProps = {
  fillMeInFunc: () => ({fillMeIn: true})
};

export class ${componentName}Container extends React.PureComponent<IProps>  {

  render () {
    // const {fillMeIn} = this.props;

    return (
      <div>${componentName}Container</div>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(${componentName}Container);

`;

const containerTestTemplate = (componentName, folderName) => `
import { makeShallowRender } from 'test/helpers/test-helpers';
import { ${componentName}Container, IProps } from './${folderName}';
// import ${componentName} from 'app/components/${folderName}';

const shallow= makeShallowRender<IProps>(${componentName}Container);

describe('<${componentName}Container />', () => {
  let mockProps: IProps;

  beforeEach(() => {
    mockProps = {};
  });

  it('renders <${componentName}Container />', () => {
    const wrapper = shallow(mockProps);
    expect(wrapper).toMatchSnapshot();
  });
});

`;

module.exports = {
  componentTemplate,
  scssTemplate,
  indexTemplate,
  containerTemplate,
  componentTestTemplate,
  containerTestTemplate
};
