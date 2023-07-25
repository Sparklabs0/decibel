import {
  GetNoteQueryVariables,
  ListNotesQuery,
  ListNotesQueryVariables,
  // ModelSortDirection,
  // NotesByDateQuery,
  // NotesByDateQueryVariables,
  OnCreateNoteSubscription,
  OnDeleteNoteSubscription,
} from '@/API';
import AudioForNoteCard from '@/custom-components/AudioForNoteCard';
import Layout from '@/custom-components/Layout';
import NoteCardActions from '@/custom-components/NoteCardActions';
import { getNote } from '@/graphql/queries';
import { Note } from '@/models';
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
  SearchField,
  useTheme,
  View,
} from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';
import React, {
  ChangeEvent,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import * as queries from '../graphql/queries';
import * as subscriptions from '../graphql/subscriptions';
function Notes() {
  const [notes, setNotes] = useState<ListNotesQuery>();
  const nextTokenRef = useRef<string | undefined>(undefined);
  const { tokens } = useTheme();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const getNotes = useCallback(async () => {
    setLoading(true); // Set loading to true when starting search
    const variables: ListNotesQueryVariables = {
      limit: 8,
    };
    if (nextTokenRef.current) {
      variables.nextToken = nextTokenRef.current;
    }
    if (search) {
      variables.filter = { title: { contains: search } };
    }
    try {
      const allNotes = await API.graphql<GraphQLQuery<ListNotesQuery>>({
        query: queries.listNotes,
        variables: variables,
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      });
      console.log(allNotes);
      setNotes(allNotes.data);
      // if (allNotes?.data?.listNotes?.nextToken !== nextTokenRef.current) {
      nextTokenRef.current = allNotes?.data?.listNotes?.nextToken as string;
      setLoading(false); // Set loading to false when search is complete
      // }
    } catch (error) {
      console.error('Error fetching notes:', error);
      setLoading(false); // Set loading to false in case of an error
    }
  }, [search]); // Add search as a dependency to the useCallback hook

  useEffect(() => {
    getNotes();
  }, [search, getNotes]);

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

  return (
    <View>
      {/* <NoteCardCollection /> */}
      <SearchField
        marginBottom={24}
        label="Search"
        value={search}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setSearch(e.target.value);
        }}
        placeholder="Search with title"
      />
      {loading && <p>Loading...</p>}
      <Collection
        type="grid"
        templateColumns="1fr"
        // templateColumns="repeat(auto-fit, minmax(400px, 1fr))"
        gap={20}
        items={notes?.listNotes?.items as any}
      >
        {(item, index) => (
          <NoteCard
            key={index}
            padding="2rem"
            note={item as any}
            overrides={{
              note_title: { flex: '0 0 auto' },
              audioElem: {
                flex: '0 0 auto',
                height: 'fit-content',
                width: 'fit-content',
              },
              note_text: {
                flex: '1 1 auto',
                // /* Show ellipsis after 4 lines */
                // // overflow: 'hidden',
                // // display: '-webkit-box',
                // // '-webkit-line-clamp': 4,
                // // '-webkit-box-orient': 'vertical',
                // // position: 'relative',
              },
              actionElem: { height: 'fit-content', flex: '0 0 auto' },
              NoteCard: {
                width: '100%',
                // boxShadow:
                //   '0 4px 6px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.1)',
              },
            }}
            //@ts-ignore
            audioElem={<AudioForNoteCard fileKey={item?.audio[0] as string} />}
            actionElem={<NoteCardActions note={item as any} />}
          ></NoteCard>
        )}
      </Collection>
      <Flex marginTop={24}>
        <Button borderRadius="8px" variation="primary" onClick={getNotes}>
          Next Page
        </Button>
      </Flex>
    </View>
  );
}

Notes.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Notes;
