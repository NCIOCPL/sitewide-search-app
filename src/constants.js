// Default global results size returned from api set to an exceedingly
// high number that exceeds existing definitions of over 8,000 as results
// paging are not going to be implemented for now ( 10,000 )
export const DEFAULT_RESULT_SIZE = 10000;

export const ISO_CODE_LANG_MAP = {
	en: 'English',
	es: 'Spanish'
};

// Test Ids
export const testIds = {
	NO_MATCHING_RESULTS: 'tid-no-matching-results',
	TERM_DEF_PRONUNCIATION: 'tid-term-def-pronunciation',
	TERM_ITEM_PRONUNCIATION: 'tid-term-item-pronunciation',
	SEARCH_PAGE_UNIT: 'tid-search-page-unit',
};
