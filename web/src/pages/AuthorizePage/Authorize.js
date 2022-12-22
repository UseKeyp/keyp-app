import React, {useEffect, useState} from 'react';
import {Button} from '@usekeyp/components-soft-ui';

function Authorize({consent, abort}) {
  const [client, setClient] = useState({});
  const [scopes, setScopes] = useState([]);

  useEffect(() => {
    // const searchParams = new URLSearchParams(window.location.search);
    const searchParams = new URLSearchParams("https://example.com/authorize?client_name=My%20App&client_logo_uri=https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/48px-Google_%22G%22_Logo.svg.png?20221203181234&scopes=name%2Cemail");
    setClient({
      name: searchParams.get('client_name'), logoUri: searchParams.get('client_logo_uri'),
    });
    setScopes(searchParams.get('scopes').split(','));
  }, []);

  return (<div className="flex flex-col justify-center items-center h-screen align-middle">
      <div
        className="flex flex-col items-center bg-gray-300 border border-black border-gray-400 max-w-2xl p-4 rounded-md">
        <h1 className="text-3xl text-black font-bold mb-2 font-sans">Authorize {client.name}</h1>
        {client.logoUri && (<div className="flex bg-white m-4 p-4 w-24 h-24 rounded-md">
            <img
              src={client.logoUri}
              alt={client.name}
              className="flex h-16 mx-auto rounded-full"
            />
          </div>)}
        <div className="flex flex-col text-lg text-black mb-4">
          Scopes:
          <ul className="font-sans">
            {scopes.map((scope) => (<li key={scope} className="ml-4">
                - {scope}
              </li>))}
          </ul>
        </div>
        <div className="flex justify-end">
          <Button
            onClick={consent}
            variant="green"
          >
            <div className="text-white">Continue</div>
          </Button>
          <Button
            onClick={abort}
          >
            <div className="text-white">Cancel</div>
          </Button>
        </div>
      </div>
    </div>);
}

export default Authorize;
