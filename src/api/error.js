'use strict';

import note from 'note-log';

export default function(error, req, res, next) {
    note('api', error);

    res.status(error.httpStatus || 500).send(error.message);

    next();
};
