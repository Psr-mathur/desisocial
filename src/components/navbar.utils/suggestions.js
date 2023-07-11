import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import makeReaquest from "../home/makerequest";
import { Link } from "react-router-dom";
import "./suggestions.scss";

const Suggestions = () => {
	const { currentUser } = useContext(AuthContext);
	const { isLoading, data, error } = useQuery(["suggestions"], () => {
		return makeReaquest
			.get("/suggestions?userid=" + currentUser.id)
			.then((res) => res.data);
	});
	// if (!isLoading) console.log("data", data);
	const queryClient = useQueryClient();
	const follow = useMutation(
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
		follow.mutate(followeduserid);
	};
	return (
		<div className="suggestions">
			<div className="suggestionscontainer">
				<div className="suggestionlist">
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
				</div>
			</div>
		</div>
	);
};

export default Suggestions;
