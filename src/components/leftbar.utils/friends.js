import React, { useState } from "react";
import "./friends.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import makeReaquest from "../home/makerequest";
import { Spa } from "@mui/icons-material";

const Friends = () => {
	const [sels, setSels] = useState({
		sel1: "false",
		sel2: "false",
	});
	const {
		isLoading: follwersLoading,
		data: followersData,
		error: followersError,
	} = useQuery(["followerslist"], async () => {
		const res = await makeReaquest.get("/relationships?list=followers");
		return res.data;
	});
	const {
		isLoading: followingLoading,
		data: followingData,
		error: followingError,
	} = useQuery(["followinglist"], async () => {
		const res = await makeReaquest.get("/relationships?list=following");
		// console.log("----->>>>".res.data);
		return res.data;
	});
	const [toShow, setToShow] = useState({
		err: "",
		loading: false,
		Data: [],
	});
	const handlesels = (s) => {
		if (s === "followerskey") {
			setSels({
				sel1: "true",
				sel2: "false",
			});
			if (followersError) {
				setToShow({ ...toShow, err: followersError.response.data });
			} else if (follwersLoading) {
				setToShow({ ...toShow, loading: true });
			} else {
				setToShow({ ...toShow, loading: false, Data: followersData });
			}
		} else {
			setSels({
				sel1: "false",
				sel2: "true",
			});
			if (followingError) {
				setToShow({ ...toShow, err: followingError.response.data });
			} else if (followingLoading) {
				setToShow({ ...toShow, loading: true });
			} else {
				setToShow({ ...toShow, loading: false, Data: followingData });
			}
		}
	};
	// console.log(toShow);
	const queryClient = useQueryClient();
	const unfollow = useMutation(
		(id) => {
			return makeReaquest.delete("/relationships?followeduserid=" + id);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["relationship"]);
				queryClient.invalidateQueries(["followinglist"]);
				queryClient.invalidateQueries(["suggestions"]);
				setToShow({ ...toShow, loading: false, Data: followingData });
			},
		}
	);
	const handleUnfollow = (id) => {
		unfollow.mutate(id);
	};
	return (
		<div className="friends">
			<div className="friendscontainer">
				<div className="friendsheader">
					<h3
						sel={sels.sel1}
						onClick={() => handlesels("followerskey")}
					>
						Followers
					</h3>
					<h3
						sel={sels.sel2}
						onClick={() => handlesels("followingkey")}
					>
						Following
					</h3>
				</div>
				<div className="relationlist">
					{toShow.err ? (
						<span>{toShow.err}</span>
					) : toShow.loading ? (
						<span>{toShow.loading}</span>
					) : (
						toShow.Data.map((d) => {
							return (
								<div className="showuser" key={d.id}>
									<img src={d.profilepic} alt="" />
									<div className="suDetails">
										<h4>{d.name}</h4>
										<span>@{d.username}</span>
									</div>
									{sels.sel2 === "true" && (
										<button
											onClick={() => handleUnfollow(d.id)}
										>
											Unfollow
										</button>
									)}
								</div>
							);
						})
					)}
				</div>
			</div>
		</div>
	);
};

export default Friends;
