/* eslint react/no-array-index-key: 'off',
    jsx-a11y/no-static-element-interactions: 'off',
    max-len: 'off',
    react/no-danger: 'off' */

    import React from 'react';
    import { Link } from 'gatsby';
    import PropTypes from 'prop-types';
    import { navigate } from 'gatsby';
    import { performSearch } from '../../services/search';
    import { addGlobalEventListener, removeGlobalEventListener } from '../../utils/misc';
    
    import './_search.less';
    
    const debounceTime = 150;
    let debounceId = null;
    const debounce = (x, t) => {
        if (debounceId) {
            window.clearTimeout(debounceId);
        }
        debounceId = window.setTimeout(x, t);
    };
    
    const spinner = (
        <div className='sk-circle'>
            <div className='sk-circle1 sk-child' />
            <div className='sk-circle2 sk-child' />
            <div className='sk-circle3 sk-child' />
            <div className='sk-circle4 sk-child' />
            <div className='sk-circle5 sk-child' />
            <div className='sk-circle6 sk-child' />
            <div className='sk-circle7 sk-child' />
            <div className='sk-circle8 sk-child' />
            <div className='sk-circle9 sk-child' />
            <div className='sk-circle10 sk-child' />
            <div className='sk-circle11 sk-child' />
            <div className='sk-circle12 sk-child' />
        </div>
    );

    const placeholderText = '        Search...';
    class Search extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                canOpen: false,
                results: null,
                searchPending: false,
                collapsed: props.collapsed,
                inputVal: ''
            };
    
            this.handleSearchText = this.handleSearchText.bind(this);
            this.handleOutsideClick = this.handleOutsideClick.bind(this);
            this.escHandler = this.escHandler.bind(this);
            this.debounceSearch = () => {
                this.forceUpdate();
                debounce(this.handleSearchText, debounceTime);
            };
            this.clearResults = this.clearResults.bind(this);
            this.close = this.close.bind(this);
            this.focus = this.focus.bind(this);
            this.clearText = this.clearText.bind(this);
            this.showInput = this.showInput.bind(this);
            this.logSuccessfulSearch = this.logSuccessfulSearch.bind(this);
            this.inputRefCallback = (el) => { this.inputRef = el; };
            this.lastResponseTime = 0;
        }
    
        componentDidMount() {
            addGlobalEventListener('onclick', this.handleOutsideClick);
            document.addEventListener('keydown', this.escHandler, false);
        }
    
        componentWillUnmount() {
            removeGlobalEventListener('onclick', this.handleOutsideClick);
            document.removeEventListener('keydown', this.escHandler, false);
        }

        async escHandler(event) {
            if (event.keyCode === 27) {
                await this.clearText();
                document.getElementById('header-search').blur()
            } else if (event.keyCode === 40) {
                const resultsList = Array.from(await document.body.getElementsByClassName('result'));
                const currentIndex = resultsList.findIndex(item => item.classList.contains('active'));
                if (
                    resultsList.length > 1
                    && currentIndex < resultsList.length - 1
                    && currentIndex >= 0
                ) {
                    resultsList[currentIndex + 1].classList.add('active');
                    resultsList[currentIndex].classList.remove('active');
                } else if (resultsList.length > 1 && currentIndex === -1) {
                    resultsList[0].classList.add('active');
                }
                event.stopImmediatePropagation();
            } else if (event.keyCode === 38) {
                const resultsList = Array.from(await document.body.getElementsByClassName('result'));
                const currentIndex = resultsList.findIndex(item => item.classList.contains('active'));
                if (
                    resultsList.length > 1
                    && currentIndex > 0
                ) {
                    resultsList[currentIndex - 1].classList.add('active');
                    resultsList[currentIndex].classList.remove('active');
                } else if (resultsList.length > 1 && currentIndex === -1) {
                    resultsList[0].classList.add('active');
                }
                event.stopImmediatePropagation();
            } else if (event.keyCode === 13) {
                const active = Array.from(await document.body.getElementsByClassName('result active'));
                if (active.length) {
                    navigate(active[0].pathname);
                }
            }
        }
    
        handleOutsideClick(event) {
            const el = event.target;
            if (!el.matches('.preview, .ignore-click, .pending, .page') && this.state.inputVal) {
                this.logFailedSearch();
            }

            if (!el.matches('.search-root .ignore-click')) {
                this.close(true);
                if (typeof this.props.openSearch === 'function') {
                    this.props.openSearch(false);
                }
            }
        }
    
        handleSearchText() {
            const lastSearchText = this.inputRef.value;
            this.setState({
                searchPending: true
            });
            performSearch(lastSearchText, 3)
                .then((r) => {
                    if (r && r.time > this.lastResponseTime) {
                        this.lastResponseTime = r.time;
                        if (Array.isArray(r.results)) {
                            r.results = r.results.reduce((all, item) => {
                                const section = Array.isArray(item.fields.title)
                                    ? item.fields.title[0].split(' | ')[0]
                                    : '';
                                if (all.hasOwnProperty(section)) {
                                    all[section].push(item);
                                } else {
                                    all[section] = [item];
                                }
                                return all;
                            }, {});
                        }
                        this.setState({
                            results: r.results || [],
                            searchPending: false,
                            inputVal: lastSearchText
                        });
                    }
                })
                .catch(() => {
                    this.setState({
                        results: [],
                        searchPending: false,
                        inputVal: lastSearchText
                    });
                });
        }
    
        focus(item) {
            if (!this.props.collapsed) {
                item.target.placeholder = '';
            }
            this.setState({
                canOpen: true,
                collapsed: false
            });
        }
    
        close(persistState) {
            this.setState({
                canOpen: false,
                collapsed: this.props.collapsed,
                results: persistState ? this.state.results : null,
                inputVal: persistState ? this.state.inputVal : ''
            });
        }
    
        clearResults() {
            this.setState({
                results: null
            });
        }
    
        clearText() {
            if (this.state.inputVal) {
                this.logFailedSearch();
            }
            if (this.inputRef) {
                this.inputRef.value = '';
            }
            this.close(false);
            if (typeof this.props.openSearch === 'function') {
                this.props.openSearch(false);
            };
        }
    
        showInput() {
            this.setState({
                collapsed: false,
                canOpen: true
            });
            this.props.openSearch(true);
        }

        logSuccessfulSearch(item) {
            if (window.mParticle) {
                const title = Array.isArray(item.fields.title) ? item.fields.title.join(',') : item.fields.title;
                const url = Array.isArray(item.fields.url) ? item.fields.url.join(',') : item.fields.url;
                return mParticle.logEvent(
                    'Search - Successful',
                    mParticle.EventType.Other,
                    {
                        search: this.state.inputVal,
                        title,
                        url,
                    }
                );
            }
        }

        logFailedSearch() {
            if (window.mParticle) {
                return mParticle.logEvent(
                    'Search - Abandoned',
                    mParticle.EventType.Other,
                    {
                        search: this.state.inputVal,
                    }
                );
            }
        }

        resultMouseEnter(i) {
            const activeList = document.body.getElementsByClassName('active result');
            for (let i = 0; i < activeList.length; i++) {
                activeList[i].classList.remove('active');
            }
            i.target.classList.add('active');
        }
    
        render() {
            let maxSectionWidth;
            if (this.state.results && Object.keys(this.state.results).length) {
                maxSectionWidth = Object.keys(this.state.results).reduce((all, item) => {
                    const currentMax = Math.max(...item.split(' ').map(item => item.length * 7.2));
                    if (currentMax > all) {
                        all = currentMax;
                    }
                    return all;
                }, 0);
            }
            const searchClass = `search-root opened`;
            return (
                <div className={searchClass}>
                    <div className="input-container">
                        { this.state.collapsed
                            ? null
                            : (<input
                                id='header-search'
                                spellCheck={false}
                                className={"ignore-click " + (this.state.inputVal.length ? "pending " : '') + (!this.props.collapsed ? 'headerSearch ' : '') + this.props.className}
                                autoFocus={false}
                                defaultValue={this.state.inputVal}
                                type='text'
                                ref={this.inputRefCallback}
                                placeholder={(!this.props.collapsed ? placeholderText : 'Search...')} 
                                onFocus={this.focus}
                                onBlur={(e) => {(!this.props.collapsed ? e.target.placeholder = placeholderText : e.target.placeholder = 'Search...')}} 
                                onChange={this.debounceSearch} />)
                        }
                        {
                            this.state.searchPending
                                ? spinner
                                : null
                        }
                        {
                            !this.state.collapsed && ((this.inputRef && this.inputRef.value) || this.state.canOpen) && !this.state.searchPending
                                ? <span className='close-icon ignore-click' onClick={this.clearText} />
                                : !this.state.searchPending
                                ? <span className='search-icon ignore-click' onClick={this.showInput} />
                                : null
                        }
                    </div>
                    {
                        this.state.canOpen && this.state.results
                            ? (
                                <div className='results-container'>
                                    <div
                                        className='results'>
                                        {
                                            Object.keys(this.state.results).length > 0
                                                ? Object.keys(this.state.results).map((section, sectionIndex) => {
                                                    return (
                                                        <div key={section} className="section">
                                                            <div
                                                                className="results-section"
                                                                style={maxSectionWidth ? {minWidth: maxSectionWidth} : ''}>
                                                                <p>{section}</p>
                                                            </div>
                                                            <div className="results-items">
                                                                {this.state.results[section].map((result, i) => (
                                                                    <Link
                                                                        className='result'
                                                                        key={result.id + i}
                                                                        to={`/${result.fields.url[0]}`}
                                                                        onClick={() => { this.logSuccessfulSearch(result)}}
                                                                        onMouseEnter={this.resultMouseEnter}>
                                                                        <div className='page'>{result.fields.title[0].split(' | ')[1]}</div>
                                                                        <div
                                                                            className='preview'
                                                                            dangerouslySetInnerHTML={{ __html: result.highlights.content }} />
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                                : (<div className='no-results'>
                                                    Search yielded no results. Please try again.
                                                </div>)
                                        }
                                    </div>
                                    { /* <a className='see-all' href='#search'>See All Results</a> */}
                                </div>)
                            : null
                    }
                </div>
            );
        }
    }
    
    Search.propTypes = {
        openSearch: PropTypes.func,
        alwaysShowClose: PropTypes.bool.isRequired,
        collapsed: PropTypes.bool.isRequired
    };
    
    export default Search;
    