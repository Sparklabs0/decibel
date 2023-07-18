import { useTheme, View } from '@aws-amplify/ui-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { BiSolidDashboard } from 'react-icons/bi';
import { BsPencilSquare } from 'react-icons/bs';
import { FaNoteSticky } from 'react-icons/fa6';
import { SiAudiomack } from 'react-icons/si';
import styles from '../styles/NavItems.module.css';

const NavItems = () => {
  const router = useRouter();
  const { tokens } = useTheme();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <BiSolidDashboard /> },
    { name: 'New Notes', path: '/new_notes', icon: <BsPencilSquare /> },
    { name: 'Notes', path: '/notes', icon: <FaNoteSticky /> },
    { name: 'Audio Files', path: '/audio_files', icon: <SiAudiomack /> },
  ];

  return (
    <View className={styles.navList}>
      {navItems.map((item) => {
        const isActive = router.pathname === item.path;
        return (
          <Link
            key={item.name}
            href={item.path}
            className={`${styles.navItem} ${isActive ? styles.active : ''}`}
          >
            <View className={styles.icon}>{item.icon}</View>
            <span>{item.name}</span>
          </Link>
        );
      })}
    </View>
  );
};

export default NavItems;
