import { pageFixture } from "../../hooks/pageFixture"
class HomePage {


    elements = {

    }

    async clickOnProfileLink() {
        await pageFixture.page.getByRole('button').filter({ hasText: 'Profile' }).click()
    }

} export default HomePage