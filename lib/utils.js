'use babel';

import path from 'path';

export default {
  replaceProjectVariable(givenExecPath, projDir) {
    const projectName = path.basename(projDir);
    return givenExecPath.replace(
      /\$PROJECT_NAME/ig, projectName,
    ).replace(/\$PROJECT/ig, projDir);
  },
};
