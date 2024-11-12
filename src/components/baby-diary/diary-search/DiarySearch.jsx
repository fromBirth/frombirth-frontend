/* src/components/baby-diary/diary-search/DiarySearch.jsx */

import {useContext, useState} from 'react';
import './DiarySearch.css';
import { FaSearch } from 'react-icons/fa';
import AppContext from "../../../contexts/AppProvider.jsx";

const DiarySearch = () => {
    const {query, setQuery} = useContext(AppContext);

    return (
        <div className="search-header">
            <div className="search-input-container">
                <FaSearch className="search-icon" on/>
                <input
                    type="text"
                    placeholder="일기 검색하기"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
        </div>
    );
};

export default DiarySearch;
