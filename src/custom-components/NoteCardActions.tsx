import { DeleteNoteMutation } from '@/API';
import { Note } from '@/models';
import { API, GraphQLQuery, GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import {
  Button,
  Flex,
  Heading,
  Text,
  useTheme,
  View,
} from '@aws-amplify/ui-react';
import { DataStore } from 'aws-amplify';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import Link from 'next/link';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineEdit } from 'react-icons/ai';
import { BiEdit, BiLink } from 'react-icons/bi';
import { BsPencilSquare } from 'react-icons/bs';
import { ImBin2 } from 'react-icons/im';
import Modal from 'react-modal';
import * as mutations from '../graphql/mutations';
const NoteCardActions: React.FC<{ note: Note }> = ({ note }) => {
  const { tokens } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const createdAtDate = dayjs(note.createdAt).toDate();

  const formattedDate = dayjs(createdAtDate).format('MMM D, YYYY h:mm A');

  const deleteHandler = async (id: string) => {
    try {
      console.log(note);
      const res = await API.graphql<GraphQLQuery<DeleteNoteMutation>>({
        query: mutations.deleteNote,
        //@ts-ignore
        variables: { input: { id } },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      });
      toast.success('Note deleted successfully');
    } catch (error) {
      console.error(error);
    } finally {
      setIsModalOpen(false);
    }
  };

  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      padding: '60px',
      border: 'none',
      transform: 'translate(-50%, -50%)',
      borderRadius: '8px',
    },
  };

  const modalButtonStyles = {
    marginRight: '0.5rem',
  };

  const tooltipStyles = {
    position: 'absolute',
    bottom: '-30px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: '#fff',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '14px',
    opacity: 0, // Hidden by default
    transition: 'opacity 0.3s ease',
  };

  return (
    <>
      <Flex
        padding={8}
        marginTop={12}
        justifyContent="space-between"
        width="100%"
        style={{ whiteSpace: 'nowrap' }}
      >
        <Text fontSize="16px">{formattedDate}</Text>
        <Flex padding={8} gap={12} justifyContent="flex-end" width="100%">
          <Link href={`/note/${note.id}`}>
            <Button>
              <BsPencilSquare size={20} color="#666" />
            </Button>
          </Link>
          <Button>
            <ImBin2
              onClick={() => {
                setIsModalOpen(true);
              }}
              cursor="pointer"
              size={20}
              color="#666"
            />
          </Button>
        </Flex>
      </Flex>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        // style={modalStyles}
        ariaHideApp={false}
        style={modalStyles}
        overlayClassName="modal-overlay"
      >
        <Heading fontSize={25} level={3}>
          Confirm Deletion
        </Heading>
        <Text marginBottom={24}>
          Are you sure you want to delete this note?
        </Text>
        <View>
          <Button
            style={modalButtonStyles}
            variation="destructive"
            onClick={() => deleteHandler(note.id)}
          >
            Delete
          </Button>

          <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
        </View>
      </Modal>
    </>
  );
};

export default NoteCardActions;
