import React, { useContext } from "react";
import "./index.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";
import makeReaquest from "../../components/home/makerequest";
import { Link } from "react-router-dom";

const Rightbar = () => {
	const { currentUser } = useContext(AuthContext);
	const { isLoading, data, error } = useQuery(["suggestions"], () => {
		return makeReaquest
			.get("/suggestions?userid=" + currentUser.id)
			.then((res) => res.data);
	});
	// if (!isLoading) console.log("data", data);
	const queryClient = useQueryClient();
	const mutation = useMutation(
		(fid) => {
			return makeReaquest.post("/relationships", {
				userid: fid,
			});
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["relationship"]);
				queryClient.invalidateQueries(["suggestions"]);
				queryClient.invalidateQueries(["followinglist"]);
			},
		}
	);
	const handleFollow = (followeduserid) => {
		mutation.mutate(followeduserid);
	};

	return (
		<div className="rightbar">
			<div className="container">
				<div className="item">
					<span>Suggestions for You</span>
					{error
						? "Some Error , Try again later."
						: isLoading
						? "Loading..."
						: data.map((ff) => {
								return (
									<div className="user" key={ff.id}>
										<Link
											to={`profile/${ff.id}`}
											style={{
												textDecoration: "none",
												color: "inherit",
											}}
										>
											<div className="userinfo">
												<img
													src={ff.profilepic}
													alt="userimg"
												/>
												<span>{ff.name}</span>
											</div>
										</Link>
										<div className="buttons">
											<button
												onClick={() =>
													handleFollow(ff.id)
												}
											>
												Follow
											</button>
											<button>Dismiss</button>
										</div>
									</div>
								);
						  })}
					{/* <div className="user">
                        <div className="userinfo">
                            <img
                                src="https://picsum.photos/200"
                                alt="userimg"
                            />
                            <span>Himanshu</span>
                        </div>
                        <div className="buttons">
                            <button>Follow</button>
                            <button>Dismiss</button>
                        </div>
                    </div>
                    <div className="user">
                        <div className="userinfo">
                            <img
                                src="https://picsum.photos/200"
                                alt="userimg"
                            />
                            <span>Vivek</span>
                        </div>
                        <div className="buttons">
                            <button>Follow</button>
                            <button>Dismiss</button>
                        </div>
                    </div> */}
				</div>
				<div className="item">
					<span>Recent Activities</span>
					<div className="user">
						<div className="userinfo">
							<img
								src="https://picsum.photos/200"
								alt="userimg"
							/>
							<p>
								<span>Himanshu</span> changed their cover
								picture
							</p>
						</div>
						<span>1 min ago</span>
					</div>
					<div className="user">
						<div className="userinfo">
							<img
								src="https://picsum.photos/200"
								alt="userimg"
							/>
							<p>
								<span>Himanshu</span> changed their cover
								picture
							</p>
						</div>
						<span>1 min ago</span>
					</div>
					<div className="user">
						<div className="userinfo">
							<img
								src="https://picsum.photos/200"
								alt="userimg"
							/>
							<p>
								<span>Himanshu</span> changed their cover
								picture
							</p>
						</div>
						<span>1 min ago</span>
					</div>
					<div className="user">
						<div className="userinfo">
							<img
								src="https://picsum.photos/200"
								alt="userimg"
							/>
							<p>
								<span>Himanshu</span> changed their cover
								picture
							</p>
						</div>
						<span>1 min ago</span>
					</div>
				</div>
				<div className="item">
					<span>Online Friends</span>
					<div className="user">
						<div className="userinfo">
							<img
								src="https://picsum.photos/200"
								alt="userimg"
							/>
							<div className="online" />
							<span>Friend 1</span>
						</div>
					</div>
					<div className="user">
						<div className="userinfo">
							<img
								src="https://picsum.photos/200"
								alt="userimg"
							/>
							<div className="online" />
							<span>Friend 2</span>
						</div>
					</div>
					<div className="user">
						<div className="userinfo">
							<img
								src="https://picsum.photos/200"
								alt="userimg"
							/>
							<div className="online" />
							<span>Friend 3</span>
						</div>
					</div>
					<div className="user">
						<div className="userinfo">
							<img
								src="https://picsum.photos/200"
								alt="userimg"
							/>
							<div className="online" />
							<span>Friend 4</span>
						</div>
					</div>
					<div className="user">
						<div className="userinfo">
							<img
								src="https://picsum.photos/200"
								alt="userimg"
							/>
							<div className="online" />
							<span>Friend 5</span>
						</div>
					</div>
					<div className="user">
						<div className="userinfo">
							<img
								src="https://picsum.photos/200"
								alt="userimg"
							/>
							<div className="online" />
							<span>Friend 6</span>
						</div>
					</div>
					<div className="user">
						<div className="userinfo">
							<img
								src="https://picsum.photos/200"
								alt="userimg"
							/>
							<div className="online" />
							<span>Friend 7</span>
						</div>
					</div>
					<div className="user">
						<div className="userinfo">
							<img
								src="https://picsum.photos/200"
								alt="userimg"
							/>
							<div className="online" />
							<span>Friend 8</span>
						</div>
					</div>
					<div className="user">
						<div className="userinfo">
							<img
								src="https://picsum.photos/200"
								alt="userimg"
							/>
							<div className="online" />
							<span>Friend 9</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Rightbar;
