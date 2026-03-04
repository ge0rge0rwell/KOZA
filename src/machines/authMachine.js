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
        }),
        markSessionChecked: assign({
            sessionChecked: true
        }),
        markRedirectChecked: assign({
            redirectChecked: true
        })
    }
}).createMachine({
    id: 'auth',
    initial: 'checking',
    context: {
        user: null,
        error: null,
        sessionChecked: false,
        redirectChecked: false
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
                        actions: 'markSessionChecked'
                    }
                ],
                'AUTH.LOGIN_SUCCESS': {
                    target: 'authenticated',
                    actions: 'assignUser'
                },
                'AUTH.LOGIN_FAILURE': {
                    actions: ['assignError', 'markRedirectChecked']
                },
                'AUTH.REDIRECT_CHECK_DONE': {
                    actions: 'markRedirectChecked'
                }
            },
            always: [
                {
                    guard: ({ context }) => context.sessionChecked && context.redirectChecked && !context.user,
                    target: 'unauthenticated'
                }
            ]
        },
        unauthenticated: {
            on: {
                'AUTH.LOGIN_START': {
                    target: 'authenticating',
                    actions: 'clearUser'
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
                    target: 'unauthenticated',
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
