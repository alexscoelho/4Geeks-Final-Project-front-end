//import react into the bundle
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "bootstrap/dist/css/bootstrap.css";
import "../../styles/musicRoomStudent.scss";
import profileImage from "../../img/profile.jpg";
import { TypeAvatar } from "./typeAvatar";
import { Link, useRouteMatch, Route, Switch } from "react-router-dom";

import { MusicRoomTeacherUpFile } from "./musicRoomTeacherUpFile";

// react boostatrap
import { Button, ListGroup, Dropdown, Form, Nav, Row, Col } from "react-bootstrap";

export const FilesListFavorites = () => {
	const { store, actions } = useContext(Context);
	let { path, url } = useRouteMatch();
	let { account_type } = store.profile;
	let role = account_type.toLowerCase();
	const [check, setCheck] = useState(true);
	const [fileAction, setFileAction] = useState("");
	const [filterType, setFilterType] = useState("");
	const [option, setOption] = useState("");

	const handleClickSelect = e => {
		setOption(e.target.value);
		console.log(e.target.value);
	};

	const handleFilterChange = value => {
		setFilterType(value);
		setOption("");
	};

	return (
		<div className="container">
			<div className="row">
				{check ? (
					<div className="col">
						{/* <h1>Music Room</h1> */}
						<br />

						<div className="container d-flex justify-content-center flex-column flex">
							{/* <h2>Files</h2> */}
							{/* <h6>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua.{" "}
							</h6> */}
							<div className="video-container overflow-auto">
								<Form className="">
									{store.favorites.length != 0 ? (
										<>
											<Dropdown>
												<Dropdown.Toggle id="dropdown-basic">Filter by</Dropdown.Toggle>
												<Dropdown.Menu>
													<Dropdown.Item
														id="level"
														onClick={e => {
															handleFilterChange("Level");
														}}>
														Level
													</Dropdown.Item>
													<Dropdown.Item
														id="Language"
														onClick={e => {
															handleFilterChange("Language");
														}}>
														Language
													</Dropdown.Item>
													<Dropdown.Item
														id="Instrument"
														onClick={e => {
															handleFilterChange("Instrument");
														}}>
														Instrument
													</Dropdown.Item>
												</Dropdown.Menu>
											</Dropdown>
											<div className="form-group mt-2">
												{filterType !== "" ? (
													<>
														<label htmlFor="exampleFormControlSelect1">{filterType}</label>

														{filterType === "Level" ? (
															<select
																value={filterType}
																onChange={handleClickSelect}
																className="form-control"
																id="exampleFormControlSelect1">
																<option value="" selected>
																	Select a value
																</option>
																<option value="Intermediate">Intermediate</option>
																<option value="Advanced">Advanced</option>
															</select>
														) : filterType === "Language" ? (
															<select
																value={filterType}
																onChange={handleClickSelect}
																className="form-control"
																id="exampleFormControlSelect1">
																<option value="" selected>
																	Select a value
																</option>
																<option value="English">English</option>
																<option value="Spanish">Spanish</option>
															</select>
														) : (
															<select
																value={filterType}
																onChange={handleClickSelect}
																className="form-control"
																id="exampleFormControlSelect1">
																<option value="" selected>
																	Select a value
																</option>
																<option value="Guitar">Guitar</option>
																<option value="Drums">Drums</option>
																<option value="Piano">Piano</option>
																<option value="Violin">Violin</option>
																<option value="Bass">Bass</option>
															</select>
														)}
													</>
												) : null}
											</div>
										</>
									) : (
										<p>No Favorite Lessons, you can add lesson to favorite in music room</p>
									)}
									<div>
										{//studentFiles != undefined &&
										store.favorites
											.filter(file => file[filterType.toLowerCase()] === option || option === "")
											.map((e, index) => {
												return (
													<ListGroup key={index}>
														<ListGroup.Item action variant="light" as="a">
															<div className="row w-100 ml-0">
																<div className="col-12 col-sm-6 col-md-3 px-0">
																	<TypeAvatar type={e.instrument} />
																</div>

																<div className="col-12 col-sm-6 col-md-9 text-center pr-0 text-sm-left">
																	<div className=" float-right">
																		{role == "teacher" ? (
																			<Row className="align-items-center">
																				<Col xs={6}>
																					<Button
																						onClick={e => {
																							e.preventDefault();
																							setCheck(false);
																							setFileAction("edit");
																							setTargetFile(index);
																						}}>
																						<i className="fas fa-pencil-alt" />
																					</Button>
																				</Col>
																				<Col xs={6}>
																					<Button
																						onClick={() => {
																							handleClick(e.id);
																						}}>
																						<i className="fas fa-trash-alt" />
																					</Button>
																				</Col>
																			</Row>
																		) : null}
																		{/* <Row className="view-file-button">
																		<Col>
																			<Button
																				as="a"
																				href={e.url}
																				target="_blank"
																				className="view-file">
																				View
																			</Button>
																		</Col>
																	</Row> */}
																	</div>
																	<div className="list-info-wrapper">
																		<label className="name lead d-flex">
																			{e.title}
																		</label>{" "}
																		{/* <span
																			onClick={() => {
																				handleClick(e.id);
																			}}
																			className="float-right">
																			<i className="far fa-heart" />
																		</span> */}
																		<br />
																		<label>{"Teacher:"}</label>
																		<br />
																		<label className="name lead">
																			{e.instrument}
																		</label>{" "}
																		{/*name, how is labeled at API*/}
																		<br />
																		<span className="text-muted">{e.level}</span>
																		<br />
																		<span className="text-muted">
																			{e.language}
																		</span>{" "}
																		{/*type, how is labeled at API*/}
																		<br />
																		<div className="view-file-button">
																			<Button
																				as="a"
																				href={e.url}
																				target="_blank"
																				className="view-file">
																				View
																			</Button>
																		</div>
																		<span
																			className="text-muted mr-3"
																			data-toggle="tooltip"
																			title=""
																			// data-original-title="(870) 288-4149"
																		/>
																		{/* <a
																		className="text-dark"
																		href={e.url}
																		target="_blank"
																		rel="noopener noreferrer">
																		<i className="far fa-eye" />
																	</a> */}
																		{/*phone, how is labeled at API*/}
																	</div>
																	<br />
																</div>
															</div>
														</ListGroup.Item>
													</ListGroup>
												);
											})}
									</div>
									{role == "teacher" ? (
										<div className="file-field-video  d-flex justify-content-center">
											<div className="btn btn-primary btn-sm float-left">
												{/* <Button>Post a File</Button> */}

												<Button
													onClick={() => {
														setCheck(false);
														setFileAction("create");
													}}>
													Post File
												</Button>
												{/* <span>Post a File </span> */}
												{/* <input type="file" /> */}
											</div>
											{/* <div className="file-path-wrapper">
								<input className="file-path validate" type="text" placeholder="Upload your file" />
							</div> */}
										</div>
									) : null}
								</Form>
							</div>
						</div>
					</div>
				) : (
					<div className="col">
						<MusicRoomTeacherUpFile
							check={check}
							setCheck={setCheck}
							teacherFiles={teacherFiles}
							fileAction={fileAction}
						/>
					</div>
				)}
			</div>
		</div>
	);
};
