# Animation Notes

## Spinning Light Using Conic Gradient (Cool for push and hold?)

// .box-button:active .edge-light {
// 	opacity: 1;
// 	border-radius: var(--standardBorderRadius);
// 	position: absolute;
//     --border-size: 3px;
//     --border-angle: 0turn;
// 	width: 100%;
// 	height: 100%;
//     background-image: conic-gradient(from var(--border-angle), transparent 20%, var(--primaryVariant), var(--secondaryVariant));
//     background-size: calc(100% - (var(--border-size) * 2))
//         calc(100% - (var(--border-size) * 2)),
//       cover;
//     background-position: center center;
//     background-repeat: no-repeat;  
//     animation: bg-spin 3s linear infinite;
// 	clip-path: polygon(0% 0%, 0% 100%, 4% 100%, 4% 4%, 96% 4%, 96% 96%, 4% 96%, 4% 100%, 100% 100%, 100% 0%);
// }

// @keyframes bg-spin {
//     to {
//       --border-angle: 1turn;
//     }
//   }

// @property --border-angle {
//     syntax: "<angle>";
//     inherits: true;
//     initial-value: 0turn;
// }
  