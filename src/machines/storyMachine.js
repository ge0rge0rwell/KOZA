import { setup, assign } from 'xstate';

export const storyMachine = setup({
    types: {
        context: {},
        events: {}
    },
    actions: {
        setStories: assign({
            stories: ({ event }) => event.stories
        }),
        addStory: assign({
            stories: ({ context, event }) => [event.story, ...context.stories]
        }),
        removeStory: assign({
            stories: ({ context, event }) => context.stories.filter(s => s.id !== event.id)
        }),
        updateStory: assign({
            stories: ({ context, event }) => context.stories.map(s => s.id === event.story.id ? event.story : s)
        })
    }
}).createMachine({
    id: 'story',
    initial: 'idle',
    context: {
        stories: [],
        activeStoryId: null,
        error: null
    },
    states: {
        idle: {
            on: {
                'STORY.FETCH_START': 'fetching',
                'STORY.CREATE_START': 'creating',
                'STORY.DELETE': {
                    actions: 'removeStory' // Optimistic update
                    // We could add a 'deleting' state if we want to block UI, but usually optimistic is better
                },
                'STORY.SET_ACTIVE': {
                    actions: assign({ activeStoryId: ({ event }) => event.id })
                },
                'STORY.REFINE_START': 'refining'
            }
        },
        fetching: {
            on: {
                'STORY.FETCH_SUCCESS': {
                    target: 'idle',
                    actions: 'setStories'
                },
                'STORY.FETCH_FAILURE': {
                    target: 'idle',
                    actions: assign({ error: ({ event }) => event.error })
                }
            }
        },
        creating: {
            on: {
                'STORY.CREATE_SUCCESS': {
                    target: 'idle',
                    actions: 'addStory'
                },
                'STORY.CREATE_FAILURE': {
                    target: 'idle',
                    actions: assign({ error: ({ event }) => event.error })
                }
            }
        },
        refining: {
            on: {
                'STORY.REFINE_SUCCESS': {
                    target: 'idle',
                    actions: 'updateStory'
                },
                'STORY.REFINE_FAILURE': {
                    target: 'idle',
                    actions: assign({ error: ({ event }) => event.error })
                }
            }
        }
    }
});
