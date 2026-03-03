import { setup, assign } from 'xstate';

export const authMachine = setup({
    types: {
        context: {},
        events: {}
    },
    actions: {
        assignUser: assign({
            user: ({ event }) => event.user
        }),
        clearUser: assign({
            user: null
        }),
        assignError: assign({
            error: ({ event }) => event.error
        })
    }
}).createMachine({
    id: 'auth',
    initial: 'checking',
    context: {
        user: null,
        error: null
    },
    states: {
        checking: {
            on: {
                'AUTH.CHECK_COMPLETE': [
                    {
                        guard: ({ event }) => !!event.user,
                        target: 'authenticated',
                        actions: 'assignUser'
                    },
                    {
                        target: 'unauthenticated'
                    }
                ],
                'AUTH.LOGIN_SUCCESS': {
                    target: 'authenticated',
                    actions: 'assignUser'
                }
            }
        },
        unauthenticated: {
            on: {
                'AUTH.LOGIN_START': {
                    target: 'authenticating',
                    actions: 'clearUser' // Clear specific error if needed
                },
                'AUTH.LOGIN_SUCCESS': {
                    target: 'authenticated',
                    actions: 'assignUser'
                }
            }
        },
        authenticating: {
            on: {
                'AUTH.LOGIN_SUCCESS': {
                    target: 'authenticated',
                    actions: 'assignUser'
                },
                'AUTH.LOGIN_FAILURE': {
                    target: 'unauthenticated', // or 'error' state if we want to show a sticky error
                    actions: 'assignError'
                }
            }
        },
        authenticated: {
            on: {
                'AUTH.LOGOUT_START': {
                    target: 'unauthenticated',
                    actions: 'clearUser'
                },
                'AUTH.UPDATE_USER': {
                    actions: 'assignUser'
                }
            }
        }
    }
});
