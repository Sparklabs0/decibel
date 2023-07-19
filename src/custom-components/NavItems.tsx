import { Flex, Text, useTheme, View } from '@aws-amplify/ui-react';
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
    {
      name: 'Dashboard',
      desc: '',
      path: '/dashboard',
      icon: <BiSolidDashboard size="20px" />,
    },
    {
      name: 'Create',
      desc: 'create a note',
      path: '/create_note',
      icon: <BsPencilSquare size="20px" />,
    },
    {
      name: 'Notes',
      desc: 'your notes',
      path: '/my_notes',
      icon: <FaNoteSticky size="20px" />,
    },
    {
      name: 'Audio Files',
      desc: 'your audio',
      path: '/audio_files',
      icon: <SiAudiomack size="20px" />,
    },
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
            <Flex direction="column" gap="0">
              <span>{item.name}</span>
              <Text className={styles.desc}>{item.desc}</Text>
            </Flex>
          </Link>
        );
      })}
    </View>
  );
};

export default NavItems;
