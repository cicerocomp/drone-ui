import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { branch } from "baobab-react/higher-order";

const binding = (props, context) => {
	return { feed: ["feed"], user: ["user", "data"] };
};

@branch(binding)
export default class RedirectRoot extends Component {
	componentWillReceiveProps(nextProps) {
		const { user } = nextProps;
		if (!user && window) {
			window.location.href = "/login";
		}
	}

	render() {
		const { user } = this.props;
		const { latest, loaded } = this.props.feed;

		return !loaded ? (
			undefined
		) : !user ? (
			undefined
		) : !latest ? (
			<Redirect to="/account/repos" />
		) : !latest.number ? (
			<Redirect to={`/${latest.full_name}`} />
		) : (
			<Redirect to={`/${latest.full_name}/${latest.number}`} />
		);
	}
}
