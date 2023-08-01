import { Button, Card, Flex, Image, Text } from '@aws-amplify/ui-react';
import { MdClose } from 'react-icons/md';

export default function Notification({ header, body, onClose }: any) {
  return (
    <Card
      variation="elevated"
      maxWidth="300px"
      padding={8}
      paddingLeft={16}
      paddingRight={16}
      position="fixed"
      right={40}
      top={100}
      style={{
        zIndex: '999999',
        boxShadow:
          '0 4px 6px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.1)',
      }}
      fontSize="16px"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontWeight="bold">{header.content}</Text>
        <Button
          marginLeft={16}
          marginBottom={16}
          onClick={onClose}
          variation="link" // Use link variant for a more subtle close button
        >
          <MdClose />
        </Button>
      </Flex>
      <Text>{body.content}</Text>
      <Image marginTop={8} alt="arrow" height={64} src="/arrow.png"></Image>
    </Card>
  );
}
