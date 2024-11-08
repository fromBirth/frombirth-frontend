/* src/components/baby-diary/diary-search/DiarySearch.jsx */

import  { useState } from 'react';
import './DiarySearch.css';
import { FaSearch } from 'react-icons/fa';

const DiarySearch = () => {
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
        // 검색 결과를 얻기 위한 로직을 추가하거나 API를 호출할 수 있습니다.
        // 여기서는 간단하게 빈 배열을 사용하여 "검색결과가 없습니다." 메시지를 표시합니다.
        setSearchResults([]);
    };

    return (
        <div className="search-header">
            <div className="search-input-container">
                <FaSearch className="search-icon" />
                <input
                    type="text"
                    placeholder="일기 검색하기"
                    value={query}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );
};

export default DiarySearch;
