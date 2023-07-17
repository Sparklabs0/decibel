import { useTheme } from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { BiSolidDashboard } from 'react-icons/bi';
import { BsPencilSquare } from 'react-icons/bs';
import { FaNoteSticky } from 'react-icons/fa6';
import { SiAudiomack } from 'react-icons/si';
import styles from '../styles/NavItems.module.css';
import Link from 'next/link';

const NavItems = () => {
  const [hoverIndex, setHoverIndex] = useState(-1);
  const router = useRouter();
  const { tokens } = useTheme();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <BiSolidDashboard /> },
    { name: 'Net Notes', path: '/new_notes', icon: <BsPencilSquare /> },
    { name: 'Notes', path: '/notes', icon: <FaNoteSticky /> },
    { name: 'Audio Files', path: '/audio_files', icon: <SiAudiomack /> },
  ];

  return (
    <div className={styles.navList}>
      {navItems.map((item, index) => (
        <Link
          key={item.name}
          href={item.path}
          className={`${styles.navItem} ${
            router.pathname === item.path ? styles.active : ''
          } ${hoverIndex === index ? styles.hovered : ''}`}
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(-1)}
        >
          <div className={styles.icon}>{item.icon}</div>
          <span>{item.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default NavItems;
