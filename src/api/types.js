/**
 * @module types
 */

/**
    @typedef {Object} AuthData
    @property {string} userId,
    @property {string} companyId,
    @property {string} companyMemberId,
    @property {string} roles,
    @property {string} isManager,
 */

/**
    @typedef {Object} ProjectAccess
    @property {boolean} isWritable
    @property {string} companyProject
*/

/**
    @typedef {Object} AreaAccess
    @property {boolean} isWritable
    @property {string} companyProject
    @property {string} projectArea
*/

/**
    @typedef {Object} TagAccess
    @property {ProjectAccess[]} projects
    @property {AreaAccess[]} areas
    @property {string[]=} involvedProjects
    @property {boolean} fullWrite
    @property {boolean} fullRead
    @property {boolean} ongoingRead
    @property {boolean} ongoingWrite
*/

/** 
    @typedef {Object} Company
    @property {string} name
    @property {string} totalTags
    @property {Object} reportSetting
    @property {string} status
*/

/**
    @typedef {Object} User
    @property {string} email
    @property {string} password
    @property {array} roles
    @property {boolean} isEmailVerified
    @property {number} failedSignInCount
    @property {string} language
    @property {string} phone
    @property {string} name
    @property {string} lastName
*/

/** 
    @typedef {Object} ReportSetting
    @property {string} projectId
    @property {string} areaId
*/

/**
 * CompanyMember type definition
 * @typedef {Object} CompanyMember
 * @property {User} user
 * @property {Company} company
 * @property {boolean} isManager
 * @property {boolean} isBlocked
 * @property {any} reportAccess
 * @property {boolean} fullReadAccess
 * @property {boolean} fullWriteAccess
 * @property {ProjectAccess[]} projectAccess
 * @property {AreaAccess[]} areaAccess
 * @property {boolean} ongoingReadAccess
 * @property {boolean} ongoingWriteAccess
 * @property {ReportSetting[]} generalReportSettings
 * @property {ReportSetting[]} notificationReportSettings
 * @property {string} department
 * @property {string} jobPosition
 * @property {boolean} isBlocked
 */

/**
    @typedef {CompanyMember & {tagAccess: TagAccess}} UserData
*/

exports.unused = {};
