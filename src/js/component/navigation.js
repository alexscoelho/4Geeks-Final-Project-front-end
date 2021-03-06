import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

// react-bootstrap
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export const Navigation = () => {
	const { store, actions } = useContext(Context);
	let { username, userType, loggedIn, token } = store.user;

	return (
		<Navbar expand="lg" className="navigation-bar">
			<Navbar.Brand href="/">JammFree</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="ml-auto">
					{!loggedIn ? (
						<Nav.Link as={Link} to="/signup">
							Sign up
						</Nav.Link>
					) : null}
					{!loggedIn ? (
						<Nav.Link as={Link} to="/login">
							Login
						</Nav.Link>
					) : null}
					{loggedIn ? (
						<Nav.Link as={Link} to="/main">
							Profile <i className="far fa-user" />
						</Nav.Link>
					) : null}
					{loggedIn ? (
						<Nav.Link as={Link} to="/" onClick={e => actions.setLogout()}>
							Logout
						</Nav.Link>
					) : null}
					<Nav.Link as={Link} to="/donations">
						Donate
					</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};
