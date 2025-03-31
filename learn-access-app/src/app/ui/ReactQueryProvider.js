'use client'

import React from 'react'
import {QueryClientProvider, QueryClient} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'

//used to provide state for the TanStack Query library
export function ReactQueryProvider({children}) {
    const [client] = React.useState(new QueryClient())

    return (
        <QueryClientProvider client={client}>
            {children}
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    )
}
