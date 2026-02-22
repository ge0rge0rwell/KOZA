'use client';
import React, { createContext, useContext } from 'react';
import { useMachine } from '@xstate/react';
import { appMachine } from '../machines/appMachine';

const GlobalStateMachineContext = createContext(null);

export const GlobalStateMachineProvider = ({ children }) => {
    const [state, send, actor] = useMachine(appMachine);

    // We expose the main actor. Components can subscribe to specific child actors using
    // actor.getSnapshot().children.get('auth') etc., or we can provide helper hooks.

    return (
        <GlobalStateMachineContext.Provider value={{ actor }}>
            {children}
        </GlobalStateMachineContext.Provider>
    );
};

export const useGlobalMachine = () => {
    const context = useContext(GlobalStateMachineContext);
    if (!context) {
        throw new Error('useGlobalMachine must be used within GlobalStateMachineProvider');
    }
    return context;
};

// Helper hooks for specific machines
export const useAuthActor = () => {
    const { actor } = useGlobalMachine();
    return actor.getSnapshot().children.auth;
};

export const useUserActor = () => {
    const { actor } = useGlobalMachine();
    return actor.getSnapshot().children.user; // Note: 'user' is the invoke ID
};

export const useStoryActor = () => {
    const { actor } = useGlobalMachine();
    return actor.getSnapshot().children.story;
};
