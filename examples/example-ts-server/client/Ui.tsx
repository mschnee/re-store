import * as React from 'react';
import { connect } from 'react-redux';

export class Ui extends React.PureComponent {
    public render() {
        return <div />;
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(Ui);
