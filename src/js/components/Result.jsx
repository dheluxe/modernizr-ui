/**
 * @jsx React.DOM
 */

var React = require('react');
var FetchingMixin = require('../mixins/fetching');

var Result = React.createClass({
	// mixins: [FetchingMixin],
	// modelState: ['detect'],
	getInitialState: function() {
		return {
			detect: null,
			isMouseOver: false
		};
	},
	fetchData: function() {
		// noop — data is set from parent component
		// but fetchData function is required by FetchingMixin
	},
	handleClick: function(event) {
		// Already current, so add it
		if(this.props.detect && this.props.currentDetect && this.props.detect.cid === this.props.currentDetect.cid) {
			this.addDetect();
		}
		// Make it current
		else {
			this.props.onClick(this.props.detect);
		}
	},
	handleAddClick: function(event) {
		event.stopPropagation();
		this.addDetect();
	},
	addDetect: function() {
		this.props.detect.set('added', !this.props.detect.get('added'));
		// Force a render of this component...
		// TODO — we need to find a better way of doing this, in case the model appears elsewhere
		this.setState({
			detect: this.props.detect
		});
	},
	render: function() {
		var classes = 'result';
		var isCurrent = this.props.detect && this.props.currentDetect && this.props.detect.cid === this.props.currentDetect.cid;
		if(isCurrent) classes += ' is-focused';
		if(this.state.isOver) classes += ' is-over';
		if(this.props.detect && this.props.detect.get('added')) classes += ' is-added';

		// Name
		// console.log(this.state.isNameOver, isCurrent);
		var resultNameClasses = 'result__name';
		if(this.state.isNameOver && !isCurrent) resultNameClasses += ' is-over';

		// Add action
		var resultAddClasses = 'result__add-action c_action add-action t_action';
		if(this.state.isAddOver) resultAddClasses += ' is-over';

		return (
		<div className={classes} onClick={this.handleClick}>
			<span className={resultNameClasses}>{this.props.detect && this.props.detect.get('name')}</span>
			<div className={resultAddClasses} onClick={this.handleAddClick}>
				{this.props.detect.get('added') ? 'Remove' : 'Add'}
			</div>
		</div>
		);
	}

});

module.exports = Result;