import React, { useEffect, useState } from 'react'
import { Button, Icon } from '@usekeyp/components-soft-ui'
import { useAuth } from '@redwoodjs/auth'

function Authorize({ consent, abort }) {
  const [client, setClient] = useState({})
  const [scopes, setScopes] = useState([])
  const { currentUser } = useAuth()

  useEffect(() => {
    // const searchParams = new URLSearchParams(window.location.search);
    // const searchParams = new URLSearchParams("https://example.com/authorize?clientName=My%20App&client_logo_uri=https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/48px-Google_%22G%22_Logo.svg.png?20221203181234&scopes=name%2Cemail");
    let url =
      'https://example.com/authorize?client_name=Gmail&client_logo_uri=https://e7.pngegg.com/pngimages/63/1016/png-clipart-google-logo-google-logo-g-suite-chrome-text-logo.png&scopes=email%2CtransferToken'
    const queryString = url.split('?')[1]
    const searchParams = new URLSearchParams(queryString)
    setClient({
      name: searchParams.get('client_name'),
      logoUri: searchParams.get('client_logo_uri'),
    })
    setScopes(searchParams.get('scopes').split(','))
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
        <div className="flex flex-row w-full justify-between">
          <div className="flex text-2xl text-gray-2400 w-72 break-words items-center">
            This app wants the following permissions
          </div>
          <div className="flex flex-row text-4xl">
            {client.logoUri && (
              <div className="flex bg-white m-4 p-4 w-24 h-24 rounded-md">
                <img
                  src={client.logoUri}
                  alt={client.name}
                  className="flex h-16 mx-auto rounded-full"
                />
              </div>
            )}
            <div className="flex flex-col items-center justify-center">
              <div className="flex font-bold">{client.name}</div>
              <div className="flex">url</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col text-lg text-black mb-4">
          Scopes:
          <ul className="font-sans">
            {scopes.map((scope) => (
              <li key={scope} className="flex flex-row">
                - {scope}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex w-full justify-between mt-8">
          <Button onClick={abort} classNameVariant="bg-red-100">
            <div className="text-red-1200 font-light">Cancel</div>
          </Button>
          <Button onClick={consent} variant="green">
            <div className="text-black font-light">Confirm</div>
          </Button>
        </div>
        <div className="flex text-gray-800 text-sm mt-8">
          By clicking Confirm, you allow this app and Keyp to use your
          information in accordance with their respective terms and privacy
          policies.
        </div>
      </div>
    </div>
  )
}

export default Authorize
