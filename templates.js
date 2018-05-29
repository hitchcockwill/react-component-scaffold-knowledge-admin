const componentTemplate = (
  componentName,
  kebabName,
  scssSelectorName
) => `import React from 'react';
import styles from './${kebabName}.module.scss';

interface IProps {}

export default class ${componentName} extends React.Component<IProps, any> {
  render() {
    return <div styleName="${scssSelectorName}">${componentName} Component</div>;
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
import ${componentName} from './${kebabName}';

const shallow${componentName} = makeShallowRender(${componentName});

describe('<${componentName} />', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {};
  });

  it('renders <${componentName} />', () => {

    const wrapper = shallow${componentName}(mockProps);

    expect(wrapper).toMatchSnapshot();
  });
});

`;

const containerTemplate = componentName => `import React from 'react';

import {connect} from 'react-redux';
// import ${componentName} from 'components/${componentName}';
type Props = {};

const mapStateToProps = (state) => ({
  fillMeIn: {fillMeIn: state}
});

const mapDispatchToProps = {
  fillMeInFunc: () => ({fillMeIn: true})
};

export class ${componentName}Container extends React.PureComponent<Props> {

  render = () => {
    // const {fillMeIn} = this.props;

    return (
      <div>${componentName}Container</div>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(${componentName}Container);

`;

const containerTestTemplate = componentName => `
import {makeShallowRender} from 'test/helpers/testHelper';
import {${componentName}Container} from './${componentName}Container';
// import ${componentName} from 'components/${componentName}';

const shallow${componentName}Container = makeShallowRender(${componentName}Container);

describe('<${componentName}Container />', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {};
  });


  it('renders <${componentName}Container />', () => {

    const wrapper = shallow${componentName}Container(mockProps);

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
