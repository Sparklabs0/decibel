import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { BiHomeCircle, BiUserCircle, BiMessageSquareDetail } from 'react-icons/bi';
import styles from '../styles/NavItems.module.css';

const NavItems = () => {
  const [hoverIndex, setHoverIndex] = useState(-1);
  const router = useRouter();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <BiHomeCircle /> },
    { name: 'Profile', path: '/profile', icon: <BiUserCircle /> },
    { name: 'Messages', path: '/messages', icon: <BiMessageSquareDetail /> },
  ];

  return (
    <div className={styles.navList}>
      {navItems.map((item, index) => (
        <a
          key={item.name}
          href={item.path}
          className={`${styles.navItem} ${router.pathname === item.path ? styles.active : ''} ${hoverIndex === index ? styles.hovered : ''}`}
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(-1)}
        >
          <div className={styles.icon}>{item.icon}</div>
          <span>{item.name}</span>
        </a>
      ))}
    </div>
  );
};

export default NavItems;
