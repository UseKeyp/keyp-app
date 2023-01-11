import React, { useEffect, useState } from 'react'

import { Button, Icon } from '@usekeyp/components-soft-ui-testing'

import { useAuth } from '@redwoodjs/auth'

import { useOAuthAuthority } from 'src/providers/oAuthAuthority'

function Authorize() {
  const [client, setClient] = useState({})
  const [scopes, setScopes] = useState([])
  const { currentUser } = useAuth()

  const { continueInteraction } = useOAuthAuthority()

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    setClient({
      name: searchParams.get('clientName'),
      logoUri: searchParams.get('clientLogoUri'),
      policyUri: searchParams.get('clientPolicyUri'),
      tosUri: searchParams.get('clientTosUri'),
    })
    searchParams.get('scope') && setScopes(searchParams.get('scope').split(','))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col justify-center items-center h-screen align-middle">
      <div className="flex flex-col items-center border border-gray-200 max-w-2xl p-4 rounded-lg">
        <div className="flex flex-row w-full justify-between items-center">
          <div className="flex">
            <Icon height="66px" width="66px" name="keypnameandlogo" />
          </div>
          <div className="text-gray-400">{currentUser?.username}</div>
        </div>
        <div className="flex flex-row">
          <div className="flex text-2xl md:text-3xl text-gray-2400 items-center">
            This app wants the following permissions
          </div>
          <div className="flex flex-row text-2xl md:text-3xl">
            {client.logoUri && (
              <div className="flex bg-white m-4 p-4 w-24 h-24 rounded-md">
                <img
                  src={client.logoUri}
                  alt={client.name}
                  className="flex h-16 mx-auto"
                />
              </div>
            )}
            <div className="flex flex-col items-center justify-center">
              {client.name && (
                <div className="flex font-bold">{client.name}</div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col text-2xl text-black mb-8 mt-8">
          Scopes:
          <ul className="font-sans">
            {scopes.map((scope) => (
              <li key={scope} className="flex flex-row text-2xl">
                - {scope}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex w-full justify-center md:justify-between gap-x-4 mt-8">
          <Button
            onClick={() => continueInteraction({ type: 'abort' })}
            classNameVariant="bg-red-100"
          >
            <div className="text-red-1200 font-light">Cancel</div>
          </Button>
          <Button
            onClick={() => continueInteraction({ type: 'confirm' })}
            variant="green"
          >
            <div className="text-black font-light">Confirm</div>
          </Button>
        </div>
        <div className="text-gray-800 text-sm mt-8">
          By clicking Confirm, you allow this app and Keyp to use your
          information in accordance with their respective{' '}
          {client.tosUri ? (
            <a className="inline text-blue-1200" href={client.tosUri}>
              terms
            </a>
          ) : (
            <div className="inline" href={client.tosUri}>
              terms
            </div>
          )}{' '}
          and{' '}
          {client.policyUri ? (
            <a className="inline text-blue-1200" href={client.policyUri}>
              privacy policies.
            </a>
          ) : (
            <div className="inline">privacy policies.</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Authorize
