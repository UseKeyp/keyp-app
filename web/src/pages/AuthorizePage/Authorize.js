import React, { useEffect, useState } from 'react'

import {
  Button,
  Icon,
  getStyledUsernameFromCurrentUser,
  getProviderIconFromCurrentUser,
} from '@usekeyp/components-soft-ui'

import { useAuth } from '@redwoodjs/auth'

import { useOAuthAuthority } from 'src/providers/oAuthAuthority'
import { isMobile } from 'src/utils/helpers'

function Authorize() {
  const [client, setClient] = useState({})
  const [scopes, setScopes] = useState(['wallet'])
  const [loading, setLoading] = useState(false)
  const { currentUser } = useAuth()
  const { continueInteraction } = useOAuthAuthority()

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    let url
    try {
      url = new URL(
        searchParams.get('clientRedirectUri').replace(/[\[\]‘’']/g, '')
      )
    } catch (error) {
      const tempUrl = searchParams.get('clientRedirectUri')
      url = tempUrl
        ?.substring(2, tempUrl.indexOf(','))
        .replace(/[\[\]‘’']/g, '')
    }
    // Normal, correctly parsed URLs will have a hostname
    if (url?.hostname) {
      url = url.hostname
    } else if (typeof url === 'string') {
      // If clientRedirectUri cannot be parsed into a URL, we should treat it as a string to avoid errors
    } else if (typeof url === 'object' && url?.href.includes('localhost')) {
      // localhost URLs will be parsed as a URL but will have an href rather than a hostname
      const tempUrl = url.href
      url = tempUrl.substring(0, tempUrl.indexOf(',')).replace(/[\[\]‘’']/g, '')
    } else {
      // If all else fails then no url will be shown
      url = ''
    }

    setClient({
      name: searchParams.get('clientName'),
      logoUri: encodeURI(searchParams.get('clientLogoUri')),
      policyUri: searchParams.get('clientPolicyUri'),
      tosUri: searchParams.get('clientTosUri'),
      redirectUrl: url ? url : '',
    })
    searchParams.get('scope') && setScopes(searchParams.get('scope').split(','))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function getIconFromScope(scope) {
    if (!scope) {
      return ''
    }
    switch (scope) {
      case 'email':
        return <Icon height="12" width="16" name="email_icon" />
      case 'wallet':
        return <Icon height="12" width="16" name="silhouette_head_and_body" />
      default:
        return ''
    }
  }
  function getStyledNameFromScope(scope) {
    if (!scope) {
      return ''
    }
    switch (scope) {
      case 'openid':
        return 'OpenID'
      case 'profile':
        return 'Profile'
      case 'email':
        return 'Your Email Address'
      case 'wallet':
        return 'Your Wallet Address'
      default:
        return scope
    }
  }

  return (
    <div className="flex flex-col justify-center sm:items-center h-screen align-middle w-full">
      <div className="flex flex-col items-start border border-gray-800 max-w-2xl p-4 rounded-lg">
        <div className="flex flex-row w-full justify-between items-center">
          <div className="flex items-center gap-x-1">
            <div className="flex">
              {getProviderIconFromCurrentUser(currentUser)}
            </div>
            <div className="flex font-light">
              {getStyledUsernameFromCurrentUser(currentUser)}
            </div>
          </div>
          <div className="flex items-center gap-x-1">
            <div className="text-gray-800 text-[9px]">Powered by</div>
            <div className="mt-1">
              <Icon
                height="16"
                width="48"
                color="fill-gray-800"
                name="keypnameandlogogray"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-8">
          <div className="flex text-2xl items-center gap-x-2">
            {client.logoUri ? (
              <div className="flex">
                <img
                  src={client.logoUri}
                  alt="client logo"
                  className="flex w-12 h-12"
                />
              </div>
            ) : (
              <></>
            )}
            <div className="flex flex-col">
              <div className="text-[24px] font-bold text-gray-2400">
                {client.name}
              </div>
              <div className="text-[12px] text-gray-2400">
                {client.redirectUrl}
              </div>
            </div>
          </div>
          <div className="flex font-light text-[16px] text-gray-1600 items-start mt-2">
            {client.redirectUrl} wants access to the following:
          </div>
        </div>
        <div className="flex flex-col w-full text-lg font-light text-gray-1600 mb-4 mt-4">
          <ul className="border-t border-b">
            {scopes.map((scope) => (
              <li
                key={scope}
                className={`${
                  scopes[scopes.length - 1] === scope
                    ? 'flex flex-row text-[16px] py-2 items-center gap-x-4'
                    : 'flex flex-row border-b text-[16px] py-2 items-center gap-x-4'
                }`}
              >
                {getIconFromScope(scope)}
                {getStyledNameFromScope(scope)}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-y-4 sm:flex-row w-full items-center justify-center sm:justify-between gap-x-4 mt-8">
          <Button
            onClick={() => {
              setLoading(true)
              continueInteraction({ type: 'abort' })
            }}
            borderColor="border-red-1200 hover:bg-red-1200"
            fluid={isMobile}
            classNameVariant="group sm:order-1 order-2"
          >
            <div className="text-red-1200 group-hover:text-white font-bold">
              Cancel
            </div>
          </Button>
          <Button
            type="button"
            onClick={() => {
              setLoading(true)
              continueInteraction({ type: 'confirm' })
            }}
            variant={`${loading ? 'white' : 'green'}`}
            textColor={!loading ? 'text-white' : 'text-gray-800'}
            disabled={loading}
            fluid={isMobile}
            classNameVariant={
              !loading
                ? 'order-1 sm:order-2'
                : 'order-1 sm:order-2 text-gray-800 bg-white hover:bg-white border border-gray-400'
            }
          >
            <div className="font-bold">Confirm</div>
          </Button>
        </div>
        <div className="text-gray-800 text-[9px] mt-8">
          By confirming you allow this app and Keyp to use your information in
          accordance with {client.redirectUrl}'s{' '}
          {client.tosUri ? (
            <a
              className="inline text-blue-800"
              target="_blank"
              href={client.tosUri}
              rel="noreferrer"
            >
              Terms of Service
            </a>
          ) : (
            <div className="inline">Terms of Service</div>
          )}{' '}
          &{' '}
          {client.policyUri ? (
            <a
              className="inline text-blue-800"
              target="_blank"
              href={client.policyUri}
              rel="noreferrer"
            >
              Privacy Policy
            </a>
          ) : (
            <div className="inline">Privacy Policy</div>
          )}
          &nbsp;and Keyp's{' '}
          <a
            className="inline text-blue-800"
            target="_blank"
            href="https://www.usekeyp.com/terms-of-use-privacy-policy#Terms-of-Use"
            rel="noreferrer"
          >
            Terms of Service
          </a>
          &nbsp;&{' '}
          <a
            className="inline text-blue-800"
            target="_blank"
            href="https://www.usekeyp.com/terms-of-use-privacy-policy#Privacy-Policy"
            rel="noreferrer"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  )
}

export default Authorize
