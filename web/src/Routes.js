// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'
import MembersLayout from 'src/layouts/MembersLayout'
import TreasuresLayout from 'src/layouts/TreasuresLayout'
import DefaultLayout from 'src/layouts/DefaultLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={DefaultLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Set wrap={MembersLayout}>
          <Route path="/members/{id:Int}/edit" page={MemberEditMemberPage} name="editMember" />
          <Route path="/members/{id:Int}" page={MemberMemberPage} name="member" />
          <Route path="/members" page={MemberMembersPage} name="members" />
        </Set>
        <Set wrap={TreasuresLayout}>
          <Route path="/treasures/new" page={TreasureNewTreasurePage} name="newTreasure" />
          <Route path="/treasures/{id:Int}/edit" page={TreasureEditTreasurePage} name="editTreasure" />
          <Route path="/treasures/{id:Int}" page={TreasureTreasurePage} name="treasure" />
          <Route path="/treasures" page={TreasureTreasuresPage} name="treasures" />
        </Set>
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
