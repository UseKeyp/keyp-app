import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const TermsPage = () => {
  return (
    <div style={{ maxWidth: '85%', margin: 'auto' }}>
      <MetaTags
        title="Terms of Service"
        description="Terms of service page for Treasure Chess app."
      />

      <MetaTags
        title="Terms of Service"
        description="Treasure Chess Privacy Policy"
      />
      <iframe
        title="Treasure Chess Privacy Policy"
        style={{
          width: '100%',
          height: '75vh',
          border: 'none',
        }}
        src="https://docs.google.com/document/d/e/2PACX-1vTaNocDgRIq7unWr3b6G6rmMs9vzt0_k1NG9n0AcJRYvNTlkXvwOPGwpwk31n-O4FuTsxiLIXDPbXSm/pub?embedded=true"
      ></iframe>
    </div>
  )
}

export default TermsPage
