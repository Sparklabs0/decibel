import {
  GetNoteQueryVariables,
  ListNotesQuery,
  ListNotesQueryVariables,
  Note,
  OnCreateNoteSubscription,
  OnDeleteNoteSubscription,
} from '@/API';
import AudioForNoteCard from '@/custom-components/AudioForNoteCard';
import Layout from '@/custom-components/Layout';
import NoteCardActions from '@/custom-components/NoteCardActions';
import { getNote } from '@/graphql/queries';
import { NoteCard } from '@/ui-components';
import {
  API,
  graphqlOperation,
  GraphQLQuery,
  GraphQLSubscription,
  GRAPHQL_AUTH_MODE,
} from '@aws-amplify/api';
import {
  Button,
  Collection,
  Flex,
  Heading,
  Loader,
  SearchField,
  useTheme,
  View,
  ViewProps,
} from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';
import { off } from 'process';
import React, {
  ChangeEvent,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ClipLoader } from 'react-spinners';

import * as queries from '../graphql/queries';
import * as subscriptions from '../graphql/subscriptions';
function FavoriteNotes() {
  const [notes, setNotes] = useState<ListNotesQuery>();
  // const nextTokenRef = useRef<string | undefined>(undefined);
  const ViewRef = useRef<HTMLDivElement | null>(null);
  const { tokens } = useTheme();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const scrollToTop = () => {
    if (ViewRef.current) {
      ViewRef.current.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  };

  const getFavoriteNotes = useCallback(async () => {
    scrollToTop();
    setLoading(true); // Set loading to true when starting search
    const variables: ListNotesQueryVariables = {
      // limit: 10,
    };

    variables.filter = {
      title: { contains: search.trim() },
      favorited: { eq: true },
    };
    // variables.nextToken = nextTokenRef.current;

    try {
      const allNotes = await API.graphql<GraphQLQuery<ListNotesQuery>>({
        query: queries.listNotes,
        variables: variables,
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      });

      allNotes?.data?.listNotes?.items.sort((a: any, b: any) =>
        a.createdAt > b.createdAt ? -1 : 1
      );

      setNotes(allNotes.data);
      // if (nextTokenRef.current !== allNotes?.data?.listNotes?.nextToken) {
      //   nextTokenRef.current = allNotes?.data?.listNotes?.nextToken as string;
      // }
      setLoading(false); // Set loading to false when search is complete
    } catch (error) {
      console.error('Error fetching notes:', error);
      setLoading(false); // Set loading to false in case of an error
    }
  }, [search]); // Add search as a dependency to the useCallback hook

  useEffect(() => {
    getFavoriteNotes();
  }, [search, getFavoriteNotes]);

  //subscribe to delete note event
  useEffect(() => {
    const sub = API.graphql<GraphQLSubscription<OnDeleteNoteSubscription>>({
      query: subscriptions.onDeleteNote,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }).subscribe({
      next: ({ provider, value }) => {
        if (value?.data?.onDeleteNote?.id) {
          const deletedNoteId = value.data.onDeleteNote.id;
          setNotes((prevNotes: any) => {
            if (!prevNotes?.listNotes?.items) return prevNotes;
            const updatedNotes = {
              ...prevNotes,
              listNotes: {
                ...prevNotes.listNotes,
                items: prevNotes.listNotes.items.filter(
                  (note: Note) => note.id !== deletedNoteId
                ),
              },
            };
            return updatedNotes;
          });
        }
      },
      error: (error) => console.warn(error),
    });
    return () => {
      sub.unsubscribe();
    };
  }, []);

  const onClear = () => {
    setSearch('');
  };

  return (
    <View ref={ViewRef}>
      {/* <NoteCardCollection /> */}
      <SearchField
        paddingBottom={0}
        paddingTop={24}
        label="Search"
        value={search}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const term = e.target.value;
          // nextTokenRef.current = undefined;
          setSearch(term);
        }}
        onClear={onClear}
        placeholder="Search notes with title ( case sensitive )"
      />
      <Heading marginBottom={24} marginTop={48} level={4}>
        {`Favorite Notes (${notes?.listNotes?.items.length || 0})`}
      </Heading>
      {loading && <ClipLoader size={20} color="#007bff" />}
      <Collection
        type="grid"
        templateColumns={{
          xxl: 'repeat(3, minmax(200px, 1fr))',
          xl: 'repeat(2, minmax(200px, 1fr))',
          large: '1fr',
        }}
        gap={20}
        items={notes?.listNotes?.items as any}
      >
        {(item, index) => (
          <NoteCard
            key={index}
            padding={24}
            note={item as any}
            overrides={{
              note_title: { flex: '0 0 auto' },
              audioElem: {
                height: 'fit-content',
                width: 'fit-content',
              },
              note_text: {
                /* Show ellipsis after 4 lines */
                overflow: 'hidden',
                height: '100px',
                position: 'relative',
              },
              actionElem: {
                marginTop: '24px',
                width: '100%',
                height: 'fit-content',
              },
              NoteCard: {
                width: '100%',
                height: 'fit-content',
                boxShadow:
                  '0 4px 6px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.1)',
              },
            }}
            //@ts-ignore
            audioElem={<AudioForNoteCard fileKey={item?.audio[0] as string} />}
            actionElem={<NoteCardActions note={item as any} />}
          ></NoteCard>
        )}
      </Collection>
      <Flex marginTop={48}>
        {
          <Button
            borderRadius="8px"
            variation="primary"
            onClick={getFavoriteNotes}
          >
            Reload
          </Button>
        }
      </Flex>
    </View>
  );
}

FavoriteNotes.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default FavoriteNotes;
