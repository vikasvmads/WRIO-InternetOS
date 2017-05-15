import React from 'react';
import classNames from 'classnames';
import normURL from './utils/normURL';
import {CrossStorageFactory} from '../../core/store/CrossStorageFactory.js';
import GenericListItem from './GenericListItem';

var storage = CrossStorageFactory.getCrossStorage();

class Item extends GenericListItem {
    constructor(props) {
        super(props);
    }

    render() {
        var className = classNames({
                active: this.props.data ? this.props.data.active : false,
                panel: !this.props.child
            }),
            data = this.props.data,
            name = data.name || 'Untitled';
        return (
            <li tabIndex="1" className={className}>
                <a onClick={this.props.del} className="pull-right">
                    <span className="glyphicon glyphicon-remove" />
                </a>
                <a href={this.props.data.fullUrl || this.props.data.url} ref="tab" onClick={this.gotoUrl.bind(this)}>{name}</a>
            </li>
        );
    }
}

Item.propTypes = {
    del: React.PropTypes.func.isRequired,
    child: React.PropTypes.bool
};

module.exports = Item;
