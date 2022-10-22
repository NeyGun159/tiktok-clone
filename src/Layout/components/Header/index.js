import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faEllipsisVertical,
   faPlus,
   faEarthAsia,
   faCircleQuestion,
   faKeyboard,
   faBitcoinSign,
   faGear,
   faArrowRightFromBracket,
   faVideo,
} from '@fortawesome/free-solid-svg-icons';
// import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';

import config from '~/config';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import Image from '~/components/Image';
import Search from '../Search';

import { faUser } from '@fortawesome/free-regular-svg-icons';
import { InboxIcon, MessageIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
   {
      icon: <FontAwesomeIcon icon={faEarthAsia} />,
      title: 'English',
      children: {
         title: 'Languages',
         data: [
            {
               type: 'language',
               code: 'EN',
               title: 'English',
            },
            {
               type: 'language',
               code: 'VI',
               title: 'Tiếng Việt',
            },
         ],
      },
   },
   {
      icon: <FontAwesomeIcon icon={faCircleQuestion} />,
      title: 'Feedback and help',
      to: '/feedback',
   },
   {
      icon: <FontAwesomeIcon icon={faKeyboard} />,
      title: 'Keyboard shortcuts',
   },
];
const userMenu = [
   {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: 'View profile',
      to: '/@nguyen',
   },
   {
      icon: <FontAwesomeIcon icon={faBitcoinSign} />,
      title: 'Get coins',
      to: '/coin',
   },
   {
      icon: <FontAwesomeIcon icon={faVideo} />,
      title: 'LIVE Sutdio',
      to: '/studio',
   },
   {
      icon: <FontAwesomeIcon icon={faGear} />,
      title: 'Settings',
      to: '/setting',
   },
   ...MENU_ITEMS,
   {
      icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
      title: 'Log out',
      to: '/logout',
      separate: true,
   },
];
const currentUser = true;
function Header() {
   const handleMenuChange = (menuItem) => {
      switch (menuItem.type) {
         case 'language':
            break;
         default:
      }
   };

   return (
      <header className={cx('wrapper')}>
         <div className={cx('inner')}>
            <Link to={config.routes.home} className={cx('logo-link')}>
               <img src={images.logo} alt="Tiktok" />
            </Link>
            <Search />
            <div className={cx('actions')}>
               {currentUser ? (
                  <>
                     {/* <Tippy delay={500} content="Upload video" placement="bottom">
                        <button className={cx('action-btn')}>
                           <FontAwesomeIcon icon={faCloudUpload} />
                        </button>
                     </Tippy> */}
                     <Button blackoutline leftIcon={<FontAwesomeIcon icon={faPlus} />} to="/upload">
                        Upload
                     </Button>
                     <button className={cx('action-btn')}>
                        <MessageIcon />
                     </button>
                     <button className={cx('action-btn')}>
                        <InboxIcon />
                     </button>
                  </>
               ) : (
                  <>
                     <Button blackoutline leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                        Upload
                     </Button>
                     <Button primary>Log in</Button>
                  </>
               )}
               <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                  {currentUser ? (
                     <Image
                        className={cx('user-avatar')}
                        src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/653a7d382a609690704fc5518e6131e5.jpeg?x-expires=1665205200&x-signature=amrWnK3m1FxJna%2B1gvJRJ9L3yDc%3D"
                        alt="Nguyen"
                     />
                  ) : (
                     <button className={cx('more-btn')}>
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                     </button>
                  )}
               </Menu>
            </div>
         </div>
      </header>
   );
}

export default Header;
