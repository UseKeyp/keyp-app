import { MetaTags } from '@redwoodjs/web'
import Authorize from "src/pages/AuthorizePage/Authorize";

const AuthorizePage = () => {
  const handleConsent = () => {
  };

  const handleAbort = () => {
  };

  return (
    <>
      <MetaTags title="Authorize" />
      <Authorize consent={handleConsent} abort={handleAbort} />
    </>
  )
}

export default AuthorizePage
