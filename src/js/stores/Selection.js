var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');
var _ = require('lodash');
var MetadataStore = require('./Metadata');

var _selection = {};

function add(data) {
	_selection[data.cid] = data;
}

function addAll(data) {
	_.forEach(data, function(obj) {
		add(obj);
	}.bind(this));
}

function remove(cid) {
	delete _selection[cid];
}

function removeAll(data) {
	_.forEach(data, function(obj) {
		remove(obj.cid);
	}.bind(this));
}

var SelectionStore = merge(EventEmitter.prototype, {
	getSelection: function() {
		return _selection;
	}
});

SelectionStore.name = 'SelectionStore';

AppDispatcher.register(function(payload) {
	var action = payload.action;
	switch(action.actionType) {
		case 'SELECTION_ADD':
			add(action.data);
		break;
		case 'SELECTION_REMOVE':
			remove(action.cid);
		break;
		case 'SELECTION_ADD_ALL':
			addAll(action.data);
		break;
		case 'SELECTION_REMOVE_ALL':
			removeAll(action.data);
		break;
		default:
			return true;
		break;
	}
	SelectionStore.emit('change');
});

module.exports = SelectionStore;