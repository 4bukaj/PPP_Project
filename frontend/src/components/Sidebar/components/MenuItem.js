import React from 'react'

export default function MenuItem() {
  return (
    <li>
        <span>Menu title</span>
    </li>
  )
}

// {SidebarData.map((item, index) => {
//   return (
//     <li
//       key={index}
//       className={sidebar ? "nav-text" : "nav-text-expanded"}
//     >
//       <Link
//         to={item.path}
//         className={toggleActiveStyles(index)}
//         onClick={() => {
//           toggleActive(index);
//         }}
//       >
//         {item.icon}
//         <span
//           className={sidebar ? "item-title" : "item-title expanded"}
//         >
//           {item.title}
//         </span>
//       </Link>
//     </li>
//   );
// })}