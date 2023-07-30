import Layout from '@/custom-components/Layout';
import { Flex, Heading, Text, View } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import React, { ReactElement, useEffect, useState } from 'react';
function FavoriteNotes() {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setEmail(user.attributes.email);
        setName(user.attributes.name || ''); // Replace 'name' with the actual attribute name for the user's name.
      } catch (error) {
        console.log('Error fetching user info:', error);
      }
    };
    getUserInfo();
    return () => {};
  }, []);

  return (
    <View>
      <Heading marginTop={24} marginBottom={24} level={4}>
        {`Your Profile`}
      </Heading>
      <Flex fontSize={18} gap={24} direction="column">
        <Text>
          <strong>Name:</strong> {name}
        </Text>
        <Text>
          <strong>Email:</strong> {email}
        </Text>
      </Flex>
    </View>
  );
}

FavoriteNotes.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default FavoriteNotes;
