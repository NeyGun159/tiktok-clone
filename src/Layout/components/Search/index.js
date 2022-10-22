import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
// import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import styles from './Search.module.scss';
import { GlassIcon } from '~/components/Icons';
import useDebounce from '~/hooks/useDebounce';
import * as searchServices from '~/services/searchService';

const cx = classNames.bind(styles);
function Search() {
   const [searchValue, setSearchValue] = useState('');
   const [searchResult, setSearchResult] = useState([]);
   const [showResults, setShowResults] = useState(true);
   const [loading, setLoading] = useState(false);

   const debounced = useDebounce(searchValue, 500);

   useEffect(() => {
      if (!debounced.trim()) {
         setSearchResult([]);
         return;
      }

      const fetchApi = async () => {
         setLoading(true);

         const result = await searchServices.search(debounced);
         setSearchResult(result);

         setLoading(false);
      };
      fetchApi();
   }, [debounced]);

   const inputRef = useRef();
   const handleClear = () => {
      setSearchValue('');
      setSearchResult([]);
      inputRef.current.focus();
   };
   const handleHideResults = () => {
      setShowResults(false);
   };
   const handleChange = (e) => {
      const searchValue = e.target.value;
      if (!searchValue.startsWith(' ')) {
         setSearchValue(searchValue);
      }
   };
   return (
      // Using a wrapper <div> or <span> tag around the reference element solves this by creating a new parentNode context.
      <div>
         <HeadlessTippy
            interactive
            visible={showResults && searchResult.length > 0}
            render={(attrs) => (
               <div className={cx('search-results')} tabIndex="-1" {...attrs}>
                  <PopperWrapper>
                     <h4 className={cx('search-title')}>Accounts</h4>
                     {searchResult.map((result) => (
                        <AccountItem key={result.id} data={result} />
                     ))}
                  </PopperWrapper>
               </div>
            )}
            onClickOutside={handleHideResults}
         >
            <div className={cx('search')}>
               <input
                  ref={inputRef}
                  value={searchValue}
                  placeholder="Search accounts and videos"
                  spellCheck={false}
                  onChange={handleChange}
                  onFocus={() => setShowResults(true)}
               />
               {loading && <FontAwesomeIcon className={cx('loading')} icon={faCircleNotch} />}
               {!!searchValue && !loading && (
                  <button className={cx('clear')} onClick={handleClear}>
                     <FontAwesomeIcon icon={faCircleXmark} />
                  </button>
               )}
               <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                  <GlassIcon />
               </button>
            </div>
         </HeadlessTippy>
      </div>
   );
}

export default Search;
