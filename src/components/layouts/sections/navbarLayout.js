import DarkModeLayout from './darkModeLayout'
import DropDownLayout from './dropDownLayout'
import HamburgerLayout from './hamburgerLayout'
import NotificationLayout from './notificationLayout'

const NavbarLayout = () => (
    <nav className="z-20 shadow-sm fixed fixed-top top-0 right-0 left-0 p-2 bg-gray-100 dark:bg-gray-700 flex justify-between items-center h-[60px]">
        <HamburgerLayout />

        <div className="flex items-center space-x-reverse space-x-3">
            <NotificationLayout />
            <DarkModeLayout />
            <DropDownLayout />
        </div>
    </nav>
)

export default NavbarLayout