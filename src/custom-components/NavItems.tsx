import { useTheme, View } from '@aws-amplify/ui-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { BiSolidDashboard } from 'react-icons/bi';
import { BsPencilSquare } from 'react-icons/bs';
import { FaNoteSticky } from 'react-icons/fa6';
import { SiAudiomack } from 'react-icons/si';
import styles from '../styles/NavItems.module.css';

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
    <View className={styles.navList}>
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
          <View className={styles.icon}>{item.icon}</View>
          <span>{item.name}</span>
        </Link>
      ))}
    </View>
  );
};

export default NavItems;
