/** @namespace utils.access */

// const { projects, areas, fullWrite, fullRead, ongoingRead, ongoingWrite } = tagAccess;

/**
 * gets user and returns all access
 * @memberof utils.access
 * @param {any} value
 * */
exports.prepareMemberAccess = (value) => {
  const {
    areaAccess,
    projectAccess,
    ongoingReadAccess,
    ongoingWriteAccess,
    fullReadAccess,
    fullWriteAccess,
    ...rest
  } = value;

  let areaAccess_, involvedProjects, projectsAccess_;

  if (!fullWriteAccess) {
    // areas = [...new Set(userData.areaAccess.map((a) => `${a.projectArea}`))];
    involvedProjects = [
      ...new Set(value.areaAccess.map((a) => `${a.companyProject}`)),
    ];

    areaAccess_ = areaAccess.map((a) => ({
      companyProject: `${a.companyProject}`,
      projectArea: `${a.projectArea}`,
      isWritable: a.isWritable,
    }));

    projectsAccess_ = projectAccess.map((p) => ({
      isWritable: p.isWritable,
      companyProject: `${p.companyProject}`,
    }));
  }
  /**
      @type {import("../types").TagAccess}
   */
  let tagAccess = {
    projects: projectsAccess_,
    areas: areaAccess_,
    involvedProjects,
    fullWrite: fullWriteAccess,
    fullRead: fullWriteAccess || fullReadAccess,
    ongoingRead: ongoingReadAccess || ongoingWriteAccess,
    ongoingWrite: ongoingWriteAccess,
  };

  return {
    ...rest,
    tagAccess,
  };
};

/**
 * gets user Access with project and area, (area is optional). if user has access returns true else false
 * @memberof utils.access
 * @param {import("../types").TagAccess} tagAccess
 * @param {import("../types").ProjectAccess} companyProject
 * @param {import("../types").AreaAccess} projectArea
 * */
exports.isWritableInProject = (tagAccess, companyProject, projectArea) => {
  let ok;
  if (tagAccess.fullWrite) return true;

  ok = tagAccess.projects.find(
    (p) => p.companyProject === `${companyProject}` && p.isWritable
  );

  if (projectArea && !ok) {
    ok = this.isWritableInArea(tagAccess.areas, projectArea);
  }

  return Boolean(ok);
};

/**
 * if projectArea=_id is in areas='list of areas-access' returns true else false
 * @memberof utils.access
 * @param {import("../types").AreaAccess[]} areas
 * @param {any} projectArea
 * */
exports.isWritableInArea = (areas, projectArea) => {
  let ok = areas.find(
    (a) => a.isWritable && a.projectArea === `${projectArea}`
  );
  return Boolean(ok);
};

/**
 * if user has write access returns true else false
 * @memberof utils.access
 * @param {import("../types").TagAccess} tagAccess
 * */
exports.isWritableInIsOnGoingTag = (tagAccess) => {
  return Boolean(tagAccess.ongoingWrite);
};
