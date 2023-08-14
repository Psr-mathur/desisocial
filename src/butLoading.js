import React from "react";

const ButLoading = ({ width = "8px", height = "8px", padding = "4px" }) => {
	return (
		<>
			<style type="text/css">
				{`
                   * {
                    margin: 0;
                    padding: 0;
               }
               
               .loading-area {
                    display: grid;
                    place-items: center;
                    height: 100%;

               }
               .loader{
                    display:flex;
                    flex-direction:row;
                    gap:8px;
                    justify-content:center;
                    align-items:center;
                    padding:${padding};
               }
               .loader div {
                    height: ${height};
                    width: ${width};
                    border-radius: 50%;
                    transform: scale(0);
                    animation: animate 1.5s ease-in-out infinite;
               }
               .loader div:nth-child(0) {
                    animation-delay: 0s;
               }
               .loader div:nth-child(1) {
                    animation-delay: 0.2s;
               }
               .loader div:nth-child(2) {
                    animation-delay: 0.4s;
               }
               
               @keyframes animate {
                    0%, 100% {
                         transform: scale(0.2);
                         background-color: #777;
                    }
                    40% {
                         transform: scale(1);
                         background-color: #FFF;
                    }
                    50% {
                         transform: scale(1);
                         background-color: #555;
                    }
               }
                    `}
			</style>
			<div className="loading-area">
				<div className="loader">
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		</>
	);
};

export default ButLoading;
