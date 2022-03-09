# Plaid

Currently using version `2020-09-14`

## Wyre integration

https://plaid.com/docs/auth/partnerships/wyre/

## Config

```js
export const PlaidEnvironments: PlaidEnvironment = {
  production: 'https://production.plaid.com',
  sandbox: 'https://sandbox.plaid.com',
  development: 'https://development.plaid.com',
}
```

## Resources

Account types by product: https://plaid.com/docs/api/accounts/#account-type--product-support-matrix

## Libraries

- https://github.com/plaid/react-plaid-link
- https://github.com/plaid/plaid-node
