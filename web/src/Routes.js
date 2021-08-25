import { Set, Router, Route } from '@redwoodjs/router'
import TreasuresLayout from 'src/layouts/TreasuresLayout'
import MembersLayout from 'src/layouts/MembersLayout'
import DefaultLayout from 'src/layouts/DefaultLayout'

const Routes = () => {
  return (
    <Router>
      <Route path="/profile" page={ProfilePage} name="profile" />
      <Set wrap={DefaultLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route path="/faq" page={FaqPage} name="faq" />
        <Set wrap={MembersLayout}>
          <Route path="/members/{id}" page={MemberMemberPage} name="member" />
          <Route path="/members" page={MemberMembersPage} name="members" />
        </Set>
        <Set wrap={TreasuresLayout}>
          <Route path="/treasures/new" page={TreasureNewTreasurePage} name="newTreasure" />
          <Route path="/treasures/{id}" page={TreasureTreasurePage} name="treasure" />
          <Route path="/treasures" page={TreasureTreasuresPage} name="treasures" />
        </Set>
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
