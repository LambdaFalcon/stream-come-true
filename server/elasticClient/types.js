/**
 * Type definition for an Item (e.g. Tweet, Reddit comment).
 * These are the items stored on the indices on ElasticSearch.
 *
 * @typedef Item
 * @type {Object}
 * @property {string} created_at as datetime string, e.g. "2019-05-04T13:04:18.000Z"
 * @property {string} screen_name user who created the item
 * @property {string} text
 * @property {string} domain domain selected for the ingestion
 */

/**
 * Type definition for an ItemsOverTimeElement, usually part of an array to be displayed
 * on a line chart.
 *
 * @typedef ItemsOverTimeElement
 * @type {Object}
 * @property {number} time as Unix time, can be used in `new Date(1556355600000)`
 * @property {number} count
 */

/**
 * Type definition for an UsersOverTimeElement. It is the same as ItemsOverTimeElement,
 * but represents user as opposed to items.
 *
 * @typedef UsersOverTimeElement
 * @type {ItemsOverTimeElement}
 */

/**
 * Type definition for a PopularKeyword element, usually part of an array to be displayed
 * on a bar chart.
 *
 * @typedef PopularKeyword
 * @type {Object}
 * @property {string} keyword
 * @property {number} count
 */

/**
 * Type definition for a PopularUser element, usually part of an array to be displayed
 * on a bar chart.
 *
 * @typedef PopularUser
 * @type {Object}
 * @property {string} user
 * @property {number} count
 */

/**
 * @typedef Filters
 * @type {Object}
 * @property {string} textfilter text filter for fulltext search
 * @property {('5m'|'5h'|'5d')} timeframe time frame to consider,
 *                                        5 minutes, hours or days, respcetively
 */
