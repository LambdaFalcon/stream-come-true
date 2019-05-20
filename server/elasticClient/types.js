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
 * @property {string} user_image url to user image
 * @property {number} [sentiment] probability of containing positive text, in [0,1]
 */

/**
 * Type definition for an ItemsOverTimeElement, usually part of an array to be displayed
 * on a line chart.
 *
 * @typedef ItemsOverTimeElement
 * @type {Object}
 * @property {number} time as Unix time, can be used in `new Date(1556355600000)`
 * @property {number} count amount of items at this time
 * @property {number} positive_count amount of items at this time with p_positive >= 0.5
 * @property {number} negative_count amount of items at this time with p_positive < 0.5
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
 * Type definition for a Vertex element, usually part of the array "vertices" returned
 * by a call to the explore API, paired with an array of Connection (see below).
 *
 * @typedef Vertex
 * @type {Object}
 * @property {string} field
 * @property {string} term
 * @property {number} weight significance score
 * @property {number} depth how many hops from the start of exploration
 */

/**
 * Type definition for a Connection element, usually part of the array "connections"
 * returned by a call to the explore API, paired with an array of Vertex (see above).
 *
 * @typedef Connection
 * @type {Object}
 * @property {number} source index in the vertices array
 * @property {number} target index in the vertices array
 * @property {number} weight weight of the connection
 * @property {number} doc_count number of documents that contain the pair of terms connected
 */

/**
 * Type definition for the response of the explore API.
 *
 * @typedef Graph
 * @type {Object}
 * @property {Array<Vertex>} vertices vertices of the graph
 * @property {Array<Connections>} connections connections between the vertices
 */

/**
 * @typedef Filters
 * @type {Object}
 * @property {string} textfilter text filter for fulltext search
 * @property {('5m'|'5h'|'5d')} timeframe DEPRECATED: time frame to consider,
 *                                        5 minutes, hours or days, respcetively
 * @property {string} fromdatetime datetime string (ISO 8601), gte date filter
 * @property {string} todatetime datetime string (ISO 8601), lte date filter
 */
